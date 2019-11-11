import React from 'react';
import { Box } from 'grommet';
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import CatCardList from "../../components/Cat/CatCardList";

const ALL_CATS = gql`
    {
        Cat {
            id
            name
            breed
            clickCount
        }
    }
`;

const Dashboard = (props) => {
    const AllCatsQuery = useQuery(ALL_CATS);

    if (AllCatsQuery.error) {
        return <Error message={ AllCatsQuery.error.message }/>
    } else if (AllCatsQuery.loading) {
        return <Loading/>
    }

    // TODO: Fix up dashboard

    return (
        <Box>
            <CatCardList/>
        </Box>
    )
};

export default Dashboard;