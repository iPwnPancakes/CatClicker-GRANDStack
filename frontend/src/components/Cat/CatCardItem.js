import React, { useState } from 'react';
import { Box, Button, Heading } from 'grommet';
import { Favorite, Trash } from 'grommet-icons';
import useDebouncedMutation from "../../utils/useDebouncedMutation";
import { useMutation } from "@apollo/react-hooks";
import { ALL_CATS_QUERY, DELETE_CAT, UPDATE_CAT_CLICK } from "../../queries/Cat/CatQueries";

const CatCardItem = ({ Cat }) => {
    const [debounceMutate] = useDebouncedMutation(UPDATE_CAT_CLICK, 5000);
    const [deleteCat] = useMutation(DELETE_CAT);
    const [localClicks, setLocalClicks] = useState(Cat.clickCount || 0);

    return (
        <Box
            className='hoverable'
            direction='column'
            elevation='small'
            pad='medium'
            border={ { color: 'brand', size: 'small' } }
            basis='small'
            margin='small'
            flex='grow'
        >
            <Box direction='row' justify='between' pad='none'>
                <Heading level='3'>{ Cat.name }</Heading>
                <Button icon={ <Trash pad='none'/> } onClick={ () => deleteCat({
                    variables: { id: Cat.id },
                    update: (store, { data: { DeleteCat } }) => {
                        try {
                            const AllCatsQuery = store.readQuery({ query: ALL_CATS_QUERY });

                            const Cats = AllCatsQuery.Cat;

                            store.writeQuery({
                                query: ALL_CATS_QUERY,
                                data: { Cat: Cats.filter(cat => cat.id !== DeleteCat.id) }
                            })
                        } catch (e) {
                            console.log('AllCatsQuery has not been run yet!');
                        }
                    }
                }) }/>
            </Box>
            <p>{ Cat.breed }</p>
            <p>{ localClicks }</p>
            <Button
                icon={ <Favorite color='red'/> }
                label='Pet Cat'
                onClick={ () => {
                    debounceMutate({ variables: { id: Cat.id, clickCount: localClicks + 1 } });
                    setLocalClicks(localClicks + 1);
                } }
            />
        </Box>
    );
};

export default CatCardItem;
