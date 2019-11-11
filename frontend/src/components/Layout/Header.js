import React from 'react';
import {Link} from "react-router-dom";
import {gql} from "apollo-boost";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import {useQuery} from "@apollo/react-hooks";

const ALL_CATS = gql`
    {
        Cat {
            id
            name
        }
    }
`;

const Header = (props) => {
    const AllCatsQuery = useQuery(ALL_CATS);

    if (AllCatsQuery.error) {
        return <Error message={AllCatsQuery.error.message}/>
    } else if (AllCatsQuery.loading) {
        return <Loading/>
    }

    // TODO: Make header pretty

    return (
        <div className='header'>
            <ul>
                {AllCatsQuery.data.Cat.map(cat => <Link key={cat.id} to={`/cat/${cat.id}`}>{cat.name}</Link>)}
            </ul>
        </div>
    );
};

export default Header;
