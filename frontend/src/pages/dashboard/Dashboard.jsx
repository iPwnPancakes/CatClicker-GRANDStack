import React, { useState } from 'react';
import { Box, Layer } from 'grommet';
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import Error from "../../components/Error/Error";
import Loading from "../../components/Loading/Loading";
import CatCardList from "../../components/Cat/CatCardList";
import MakeNewCatModal from "../../components/Cat/MakeNewCatModal";

const ALL_CATS = gql`
    {
        Cat {
            id
            name
            breed
            clickCount
            imgUrl
        }
    }
`;

const Dashboard = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const AllCatsQuery = useQuery(ALL_CATS);

    if (AllCatsQuery.error) {
        return <Error message={ AllCatsQuery.error.message }/>
    } else if (AllCatsQuery.loading) {
        return <Loading/>
    }

    // TODO: Fix up dashboard

    return (
        <Box>
            { modalOpen &&
            <Layer
                onClickOutside={ () => setModalOpen(false) }
                modal
            >
                <MakeNewCatModal AllCats={ AllCatsQuery.data.Cat } onComplete={ (newCat) => setModalOpen(false) }/>
            </Layer>
            }
            <CatCardList openModal={ () => setModalOpen(true) }/>
        </Box>
    )
};

export default Dashboard;