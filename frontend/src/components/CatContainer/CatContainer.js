import React from 'react';
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import {useRouteMatch} from 'react-router-dom';
import Error from "../Error/Error";
import Loading from "../Loading/Loading";

const GET_CAT = gql`
    query GetCat($id: ID!) {
        Cat(id: $id) {
            id
            name
            breed
            imgUrl
            clickCount
        }
    }
`;

function debounceMutationAfter(mutation, seconds, timeoutID) {
    // TODO: Debounce Mutation
}

const CatContainer = (props) => {
    const match = useRouteMatch('/cat/:catID');
    const GetCatQuery = useQuery(GET_CAT, {
        variables: {id: match.params.catID}
    });

    if (GetCatQuery.error) {
        return <Error message={GetCatQuery.error.message}/>
    } else if (GetCatQuery.loading) {
        return <Loading/>
    }

    const Cat = GetCatQuery.data.Cat[0];

    // TODO: Break into separate CatList and CatListItem components
    // TODO: Display parents and cat

    return (
        <div>
            <h2>{Cat.id} - {Cat.name}</h2>
            <p>{Cat.breed}</p>
            <p>{Cat.clickCount}</p>
            <input type='button' value='Increment Count' onClick={() => {
                // TODO: Work on the onClick functionality
                console.log('clicked');
            }}/>
        </div>
    );
};

export default CatContainer;
