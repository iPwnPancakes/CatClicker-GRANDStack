import React from 'react';
import { Box } from 'grommet';
import { useQuery } from "@apollo/react-hooks";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import CatCard from './CatCardItem';
import NewCatCard from "./NewCatCard";
import { ALL_CATS_QUERY } from "../../queries/Cat/CatQueries";

const CatCardList = ({ openModal }) => {
    const AllCatsQuery = useQuery(ALL_CATS_QUERY);

    if (AllCatsQuery.error) {
        return <Error message={ AllCatsQuery.error.message }/>
    } else if (AllCatsQuery.loading) {
        return <Loading/>
    }

    return (
        <Box direction='row' wrap>
            { AllCatsQuery.data.Cat.map(Cat => <CatCard key={ Cat.id } Cat={ Cat }/>) }
            <NewCatCard onClick={ openModal }/>
        </Box>
    );
};

export default CatCardList;
