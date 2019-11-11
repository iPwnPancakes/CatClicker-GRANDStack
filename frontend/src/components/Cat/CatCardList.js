import React from 'react';
import { Box } from 'grommet';
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import CatCard from './CatCardItem';
import NewCatCard from "./NewCatCard";

const GET_ALL_CATS = gql`
    query {
        Cat {
            id
            name
            clickCount
            imgUrl
            breed
        }
    }
`;

const CatCardList = () => {
    const AllCatsQuery = useQuery(GET_ALL_CATS);

    if (AllCatsQuery.error) {
        return <Error message={ AllCatsQuery.error.message }/>
    } else if (AllCatsQuery.loading) {
        return <Loading/>
    }

    return (
        <Box direction='row' wrap>
            { AllCatsQuery.data.Cat.map(Cat => <CatCard key={ Cat.id } Cat={ Cat }/>) }
            <NewCatCard/>
        </Box>
    );
};

export default CatCardList;
