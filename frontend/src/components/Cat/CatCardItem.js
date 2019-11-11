import React, { useState } from 'react';
import { Box, Button, Heading } from 'grommet';
import { Favorite } from 'grommet-icons';
import { gql } from "apollo-boost";
import useDebouncedMutation from "../../utils/useDebouncedMutation";

const UPDATE_CAT_CLICK = gql`
    mutation UpdateCatClick($id: ID!, $clickCount: Int!) {
        UpdateCat(id: $id, clickCount: $clickCount) {
            id
            name
            breed
            imgUrl
            clickCount
        }
    }
`;

const CatCardItem = ({ Cat }) => {
    const [debounceMutate, status] = useDebouncedMutation(UPDATE_CAT_CLICK, 5000);
    const [localClicks, setLocalClicks] = useState(Cat.clickCount || 0);

    return (
        <Box
            className='catListItem'
            direction='column'
            elevation='small'
            pad='medium'
            border={ { color: 'brand', size: 'small' } }
            basis='small'
            margin='small'
            flex='grow'
        >
            <Heading level='3'>{ Cat.name }</Heading>
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
