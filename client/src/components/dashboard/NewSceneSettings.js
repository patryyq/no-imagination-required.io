import React, { useState } from 'react';
import { InputAdornment, FormHelperText, FormControl, Input, Collapse, styled, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const NewSceneSettings = (props) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (prop) => (event) => {
        if (prop === 'name') props.settings[1]({ ...props.settings[0], name: event.target.value })
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '80%' }}>
                <Input
                    autoComplete='off'
                    id="standard-adornment-name"
                    type="text"
                    placeholder="New scene name"
                    onChange={handleChange('name')}
                    endAdornment={<InputAdornment position="end"></InputAdornment>}
                    aria-describedby="standard-width-helper-text"
                    inputProps={{
                        'aria-label': 'scene name'
                    }}
                />
                <FormHelperText id="standard-width-helper-text">scene name</FormHelperText>
            </FormControl>
            {/* <div style={{ textAlign: 'left' }}>
                Fence / walls?
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '80%' }}>
                    <Input
                        autoComplete='off'
                        id="standard-adornment-weight"
                        type="number"
                        // value={values.width}
                        // onChange={handleChange('width')}
                        endAdornment={<InputAdornment position="end">meters</InputAdornment>}
                        aria-describedby="standard-width-helper-text"
                        inputProps={{
                            'aria-label': 'width',
                            min: 0.00,
                            max: 1500.00
                        }}
                    />
                    <FormHelperText id="standard-width-helper-text">width</FormHelperText>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '80%' }}>
                    <Input
                        autoComplete='off'
                        id="standard-adornment-height"
                        type="number"
                        // value={values.height}
                        // onChange={handleChange('height')}
                        endAdornment={<InputAdornment position="end">meters</InputAdornment>}
                        aria-describedby="standard-height-helper-text"
                        inputProps={{
                            'aria-label': 'height',
                            min: 0.00,
                            max: 1500.00
                        }}
                    />
                    <FormHelperText id="standard-height-helper-text">height</FormHelperText>

                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '80%' }}>
                    <Input
                        autoComplete='off'
                        id="standard-adornment-length"
                        type="number"
                        // value={values.length}
                        // onChange={handleChange('length')}
                        endAdornment={<InputAdornment position="end">meters</InputAdornment>}
                        aria-describedby="standard-length-helper-text"
                        inputProps={{
                            'aria-label': 'length',
                            min: 0.00,
                            max: 1500.00
                        }}
                    />
                    <FormHelperText id="standard-length-helper-text">length</FormHelperText>
                </FormControl>
            </Collapse> */}
        </>
    )
}
export default NewSceneSettings