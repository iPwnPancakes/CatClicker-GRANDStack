const { GraphQLJSON } = require('graphql-type-json');
const randomUUID = require('uuid/v4');

/**
 * Maps neo4j node-only (NO PATHS ALLOWED) query result properties to object format
 *
 * @param result: Neo4j::Result
 * @returns Array[Objects]
 */
function neo4jRecordLookup(result) {
    const records = result.records[0];
    const positions = records.keys.map(key => records['_fieldLookup'][key]);

    return positions.map(position => records['_fields'][position].properties);
}

function getRandomArrayElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = (session) => ({
    JSON: GraphQLJSON,
    Query: {
        getWeather: (context, args) => {
            return JSON.stringify({
                degrees: 40,
                type: 'c'
            });
        }
    },
    Mutation: {
        breedCats(ctx, { cat1ID, cat2ID, newCat }) {
            return session.run('MATCH (parent1:Cat {id: {cat1ID} }),(parent2:Cat {id: {cat2ID} }) RETURN parent1,parent2', {
                cat1ID,
                cat2ID
            }).then(result => {
                const parents = neo4jRecordLookup(result);

                const randomlyChosenBreed = getRandomArrayElement(parents).breed;

                return session.run(`
                    MATCH (parent1:Cat {id: {cat1ID} }),(parent2:Cat {id: {cat2ID} })
                    CREATE (newCat:Cat {id: {randomUUID}, name: {newCatName}, clickCount: 0, breed: {randomlyChosenBreed}, imgUrl: {imgUrl} })
                    CREATE (parent1)-[:PARENT_TO]->(newCat)
                    CREATE (parent2)-[:PARENT_TO]->(newCat)
                    RETURN newCat
                `, {
                        cat1ID,
                        cat2ID,
                        randomUUID: randomUUID(),
                        newCatName: newCat.name,
                        randomlyChosenBreed: randomlyChosenBreed,
                        imgUrl: newCat.imgUrl
                    })
                    .then(result => {
                        session.close();

                        return neo4jRecordLookup(result)[0];
                    })
            }).catch(err => {
                console.error(err);
            })
        }
    }
});