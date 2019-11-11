import React from 'react';
import { Box } from "grommet/es6";

const CenteredBox = (props) => {
    const { children, ...otherProps } = props;
    return (
        <Box
            direction='column'
            flex='grow'
            align='center'
            justify='center'
            { ...otherProps }
        >
            { children }
        </Box>
    )
};

export default CenteredBox;