import React from 'react';
import { Box } from "grommet/es6";

const CenteredBox = React.forwardRef((props, ref) => {
    const { children, ...otherProps } = props;
    return (
        <Box
            direction='column'
            flex='grow'
            align='center'
            justify='center'
            ref={ ref }
            { ...otherProps }
        >
            { children }
        </Box>
    )
});

export default CenteredBox;