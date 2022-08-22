import React, { useEffect, useState } from 'react';
import * as THREE from 'three'
import { InputAdornment, FormHelperText, FormControl, Button, Input, Box } from '@mui/material/';
import uuid from 'react-uuid'
import { SketchPicker } from 'react-color'


const AddObjectForm = (props) => {
    const [values, setValues] = useState({
        objID: uuid(),
        name: 'Object',
        position: { x: 4, y: 2, z: 5 },
        rotation: { x: 0, y: 0, z: 0, order: 'XYZ' },
        scale: { x: 4, y: 4, z: 4 },
        width: 4,
        height: 4,
        length: 4,
        color: "#ffffff",
        map: undefined,
        side: THREE.DoubleSide,
        mapRepeat: { x: 10, y: 10 }
    });

    const handleChange = (prop) => (event) => {
        const value = prop === 'color' ? event.hex : event.target.value
        setValues({ ...values, [prop]: value, scale: { x: values.width, y: values.height, z: values.length } });
    };

    // useEffect(() => {
    //     setValues({ ...values, scale: { x: values.width, y: values.height, z: values.length } })
    // })

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
            <Box sx={{ width: '50%', boxSizing: 'border-box', margin: 0, display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '80%' }}>
                    <Input
                        autoComplete='off'
                        id="standard-adornment-name"
                        type="text"
                        value={values.name}
                        onChange={handleChange('name')}
                        endAdornment={<InputAdornment position="end"></InputAdornment>}
                        aria-describedby="standard-width-helper-text"
                        inputProps={{
                            'aria-label': 'name'
                        }}
                    />
                    <FormHelperText id="standard-width-helper-text">name</FormHelperText>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '80%' }}>
                    <Input
                        autoComplete='off'
                        id="standard-adornment-weight"
                        type="number"
                        value={values.width}
                        onChange={handleChange('width')}
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
                        value={values.height}
                        onChange={handleChange('height')}
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
                        value={values.length}
                        onChange={handleChange('length')}
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


            </Box >
            <Box sx={{ width: '50%', boxSizing: 'border-box', margin: 0, display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}>
                <SketchPicker onChange={handleChange('color')} color={values.color} />
            </Box>
            <Button onClick={(e, b, c) => {
                e.target.style.pointerEvents = 'none'
                props.submit(values)
            }} color="primary" variant="contained">Add</Button>
        </Box>
    );
}

export default AddObjectForm