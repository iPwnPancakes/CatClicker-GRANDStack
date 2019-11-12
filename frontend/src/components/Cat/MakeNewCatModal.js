import React, { useState, useRef } from 'react';
import { Grid, Box, Heading, Drop, Select, Image, Form, FormField, Button } from 'grommet';
import { AddCircle } from "grommet-icons";
import gql from "graphql-tag";
import CenteredBox from "../Layout/CenteredBox";
import { render } from "react-dom";
import { getAllCatFaceUrls, getRandomCatFaceUrl } from "../../utils/CatImageHelper";
import { useMutation } from "@apollo/react-hooks";

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

const MakeNewCatModal = ({ AllCats, onComplete }) => {
    const [parent1, setParent1] = useState(undefined);
    const [parent2, setParent2] = useState(undefined);
    const [childName, setChildName] = useState('');
    const [parent1ModalOpen, setParent1ModalOpen] = useState(false);
    const [parent2ModalOpen, setParent2ModalOpen] = useState(false);

    const parent1Element = useRef(null);
    const parent2Element = useRef(null);

    const [makeNewCat] = useMutation(MAKE_NEW_CAT);

    return (
        <Box pad='medium' align='center' responsive>
            <Heading level='3' margin={ { bottom: 'small' } }>Select 2 Parents</Heading>
            <Grid
                rows={ ['small'] }
                columns={ ['small', 'xxsmall', 'small'] }
                gap='small'
                areas={ [
                    { name: 'parent1', start: [0, 0], end: [0, 0] },
                    { name: 'plusIcon', start: [1, 0], end: [1, 0] },
                    { name: 'parent2', start: [2, 0], end: [2, 0] },
                ] }
            >
                <Box gridArea='parent1'>
                    <CenteredBox
                        className='hoverable'
                        border={ { color: 'brand', size: 'small', style: 'dashed' } }
                        background={ { color: '#dcdcdc' } }
                        elevation='medium'
                        ref={ parent1Element }
                        onClick={ () => setParent1ModalOpen(true) }
                        height='small'
                    >
                        { !parent1 && <Heading level='5'>Select Parent 1</Heading> }
                        { parent1 && <Box align='center'>
                            <Image src={ `/assets/CatFaces/${ parent1.imgUrl }` } fit='contain'/>
                            <Heading level='3'>{ parent1.name }</Heading>
                        </Box> }
                    </CenteredBox>

                    {
                        parent1ModalOpen && <Drop
                            target={ parent1Element.current }
                            align={ { top: 'top', left: 'right' } }
                            onClickOutside={ () => setParent1ModalOpen(false) }
                        >
                            <Select
                                placeholder='Select a cat'
                                options={ AllCats }
                                value={ parent1 }
                                valueLabel={
                                    parent1 ? (
                                        <Box direction='row' pad='xxsmall'>
                                            { parent1.imgUrl && <Image
                                                src={ `/assets/CatFaces/${ parent1.imgUrl }` }
                                                width='30px'
                                                height='30px'
                                            /> }
                                            { parent1.name }
                                        </Box>
                                    ) : undefined
                                }
                                children={ ({ name, imgUrl }) => (
                                    <Box direction='row' pad='xxsmall'>
                                        { imgUrl && <Image
                                            src={ `/assets/CatFaces/${ imgUrl }` }
                                            width='30px'
                                            height='30px'
                                        /> }
                                        { name }
                                    </Box>) }
                                onChange={ ({ option }) => {
                                    setParent1(option);
                                } }
                            />
                        </Drop>
                    }

                </Box>

                <CenteredBox gridArea='plusIcon' height='small'>
                    <p>+</p>
                </CenteredBox>

                <Box gridArea='parent2'>
                    <CenteredBox
                        className='hoverable'
                        border={ { color: 'brand', size: 'small', style: 'dashed' } }
                        background={ { color: '#dcdcdc' } }
                        elevation='medium'
                        ref={ parent2Element }
                        onClick={ () => setParent2ModalOpen(true) }
                        height='small'
                    >
                        { !parent2 && <Heading level='5'>Select Parent 2</Heading> }
                        { parent2 && <Box align='center'>
                            <Image src={ `/assets/CatFaces/${ parent2.imgUrl }` } fit='contain'/>
                            <Heading level='3'>{ parent2.name }</Heading>
                        </Box> }
                    </CenteredBox>

                    {
                        parent2ModalOpen && <Drop
                            target={ parent2Element.current }
                            align={ { top: 'top', left: 'right' } }
                            onClickOutside={ () => setParent2ModalOpen(false) }
                        >
                            <Select
                                placeholder='Select a cat'
                                options={ AllCats }
                                value={ parent2 }
                                valueLabel={
                                    parent2 ? (
                                        <Box direction='row' pad='xxsmall'>
                                            { parent2.imgUrl && <Image
                                                src={ `/assets/CatFaces/${ parent2.imgUrl }` }
                                                width='30px'
                                                height='30px'
                                            /> }
                                            { parent2.name }
                                        </Box>
                                    ) : undefined
                                }
                                children={ ({ name, imgUrl }) => (
                                    <Box direction='row' pad='xxsmall'>
                                        { imgUrl && <Image
                                            src={ `/assets/CatFaces/${ imgUrl }` }
                                            width='30px'
                                            height='30px'
                                        /> }
                                        { name }
                                    </Box>) }
                                onChange={ ({ option }) => {
                                    setParent2(option);
                                } }
                            />
                        </Drop>
                    }

                </Box>
            </Grid>

            { parent1 && parent2 && <Box>
                <Form
                    value={ {
                        parent1: parent1,
                        parent2: parent2,
                        childName: childName
                    } }
                    onSubmit={ (e) => {
                        console.log(parent1, parent2, childName);
                        makeNewCat({
                            variables: {
                                parent1ID: parent1.id,
                                parent2ID: parent2.id,
                                name: childName,
                                imgUrl: getRandomCatFaceUrl()
                            }
                        }).then(result => {
                            onComplete(result);
                        }).catch(err => {
                            console.error(err);
                        })
                    } }
                >
                    <FormField name='childName' label='Child Name' onKeyUp={ (e) => setChildName(e.target.value) }/>
                    <Button label='Create Child' type='submit'/>
                </Form>
            </Box> }
        </Box>
    )
};

export default MakeNewCatModal;