import React from 'react';
import { Box, Heading, Image } from 'grommet';

const Header = (props) => {
    return (
        <Box className='header' direction='row'>
            <Heading color='dark-1' level='1' margin='xsmall'>Cat Clicker</Heading>

            <Image src='/assets/NyanCat.gif' height='100px' width='100px'/>
        </Box>
    );
};

export default Header;
