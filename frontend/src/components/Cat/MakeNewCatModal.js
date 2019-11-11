import React, { useState } from 'react';
import { Grid, Box, Heading } from 'grommet';
import { AddCircle } from "grommet-icons";
import gql from "graphql-tag";
import CenteredBox from "../Layout/CenteredBox";

const MAKE_NEW_CAT = gql`
    mutation MakeNewCat($parent1ID: ID!, $parent2ID: ID!, $name: String!, $imgUrl: String!) {
        breedCats(cat1ID: $parent1ID, cat2ID: $parent2ID, newCat: { name: $name, imgUrl: $imgUrl }) {
            id
            name
            breed
            clickCount
            imgUrl
        }
    }
`;

const GET_PARENTS = gql`
    query GetParents($childID: ID!) {
        getParents(childID: $childID) {
            id
            name
            breed
        }
    }
`;

const MakeNewCatModal = ({ AllCats }) => {
    const [parent1, setParent1] = useState(undefined);
    const [parent2, setParent2] = useState(undefined);

    return (
        <Box pad='medium' responsive>
            <Grid
                rows={ ['small', 'medium'] }
                columns={ ['small', 'xxsmall', 'small', 'xxsmall', 'small'] }
                gap='small'
                areas={ [
                    { name: 'parent1', start: [0, 0], end: [0, 0] },
                    { name: 'plusIcon', start: [1, 0], end: [1, 0] },
                    { name: 'parent2', start: [2, 0], end: [2, 0] },
                    { name: 'equalsIcon', start: [3, 0], end: [3, 0] },
                    { name: 'newChild', start: [4, 0], end: [4, 0] },
                    { name: 'form', start: [0, 1], end: [4, 1] }
                ] }
            >
                <Box gridArea='parent1'>
                    <Heading level='2'>Parent 1</Heading>
                    <CenteredBox
                        border={ { color: 'brand', size: 'small', style: 'dashed' } }
                        background={ { color: '#dcdcdc' } }
                        elevation='medium'
                    >
                        <p>+</p>
                    </CenteredBox>
                </Box>

                <CenteredBox gridArea='plusIcon'>
                    <p>+</p>
                </CenteredBox>

                <Box gridArea='parent2'>
                    <Heading level='2' pad='5px'>Parent 2</Heading>
                    <CenteredBox
                        border={ { color: 'brand', size: 'small', style: 'dashed' } }
                        background={ { color: '#dcdcdc' } }
                        elevation='medium'
                    >
                        <p>+</p>
                    </CenteredBox>
                </Box>

                <CenteredBox gridArea='equalsIcon'>
                    <p>=</p>
                </CenteredBox>

                <Box gridArea='newChild'>
                    <Heading level='2' pad='5px'>New Child</Heading>
                    <CenteredBox
                        border={ { color: 'brand', size: 'small', style: 'dashed' } }
                        background={ { color: '#dcdcdc' } }
                        elevation='medium'
                    >
                        <p>+</p>
                    </CenteredBox>
                </Box>

                <Box gridArea='form'>

                </Box>
            </Grid>
        </Box>
    )
};

export default MakeNewCatModal;