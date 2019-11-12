import React from 'react';
import { Box } from 'grommet';
import { AddCircle } from 'grommet-icons';

const NewCatCard = ({ onClick }) => {
    return (
        <Box
            className='hoverable'
            direction='column'
            border={ { color: 'brand', size: 'small', style: 'dashed' } }
            elevation='medium'
            basis='small'
            margin='small'
            flex='grow'
            align='center'
            justify='center'
            background={ { color: '#dcdcdc' } }
            onClick={ onClick }
        >
            <AddCircle size='large'/>
        </Box>
    );
};

export default NewCatCard;