require('dotenv').config();
const neo4j = require('neo4j-driver').v1;
const express = require('express');
const cors = require('cors');
const {ApolloServer} = require('apollo-server-express');
const {makeAugmentedSchema} = require('neo4j-graphql-js');
const typeDefs = require('./src/TypeDefs');
const CreateResolvers = require('./src/Resolvers');

const driver = neo4j.driver(process.env.NEO4J_URL, neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD), {disableLosslessIntegers: true});
const session = driver.session();
const apolloServer = new ApolloServer({
    schema: makeAugmentedSchema({
        typeDefs,
        resolvers: CreateResolvers(session)
    }),
    context: {driver}
});

const app = express();
const ENV = process.env.ENVIRONMENT || 'PRODUCTION';
const PORT = process.env.PORT || 8080;

apolloServer.applyMiddleware({app});

if (ENV !== 'PRODUCTION') {
    console.warn('CORS is enabled, make sure this isnt on a production site!');
    app.use(cors());
}

app.get('/', (request, response) => {
    response.end('Hello World');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`GraphQL Endpoint ${apolloServer.graphqlPath}`);
});