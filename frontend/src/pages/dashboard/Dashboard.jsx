import React from 'react';
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import CatContainer from "../../components/CatContainer/CatContainer";

const ALL_CATS = gql`
    {
        Cat {
            id
            name
            breed
        }
    }
`;

const Dashboard = (props) => {
    const AllCatsQuery = useQuery(ALL_CATS);

    if (AllCatsQuery.error) {
        return <Error message={AllCatsQuery.error.message}/>
    } else if (AllCatsQuery.loading) {
        return <Loading/>
    }

    // TODO: Fix up dashboard

    return (<div>
        {AllCatsQuery.data.Cat.map(cat => <CatContainer Cat={cat}/>)}
    </div>)
};

export default Dashboard;