import * as React from 'react';
import { Box, Fab, Typography } from '@mui/material';
import { FiMove } from 'react-icons/fi';
import { AiOutlineRotateRight, AiOutlineDelete } from 'react-icons/ai';
// import { IoIosResize } from 'react-icons/io';

const ModeFAB = (props) => {
    return (
        <Box
            hidden={!props.hidden}>
            <Fab
                onClick={() => props.setMode('translate')}
                color='primary'
                size="medium"
                aria-label='move'
                sx={{ marginRight: '20px', fontSize: '1.7rem', opacity: props.mode === 'translate' ? 1 : 0.4 }} >
                <FiMove />
                <Box sx={{ padding: '2px', bottom: '-1.7rem', position: 'absolute' }}> <Typography sx={{ fontSize: '13px', fontWeight: '900', color: '#333' }} variant={'body2'}>move</Typography></Box>
            </Fab>
            <Fab
                onClick={() => props.setMode('rotate')}
                color='primary'
                size="medium"
                aria-label='edit'
                sx={{ marginRight: '20px', fontSize: '1.7rem', opacity: props.mode === 'rotate' ? 1 : 0.4 }} >
                <AiOutlineRotateRight />
                <Box sx={{ padding: '2px', bottom: '-1.7rem', position: 'absolute' }}> <Typography sx={{ fontSize: '13px', fontWeight: '900', color: '#333' }} variant={'body2'}>rotate</Typography></Box>
            </Fab>
            {/* <Fab
                onClick={() => props.setMode('scale')}
                color='primary'
                size="medium"
                aria-label='scale'
                sx={{ marginRight: '22px', fontSize: '1.7rem', opacity: props.mode === 'scale' ? 1 : 0.4 }} >
                <IoIosResize />
                <Box sx={{ padding: '2px', bottom: '-1.7rem', position: 'absolute' }}> <Typography sx={{ fontSize: '13px', fontWeight: '900', color: '#333' }} variant={'body2'}>scale</Typography></Box>
            </Fab> */}
            <Fab
                onClick={props.remove}
                color='secondary'
                size="medium"
                aria-label='remove'
                sx={{ fontSize: '1.7rem', opacity: 1 }} >
                <AiOutlineDelete />
                <Box sx={{ padding: '2px', bottom: '-1.7rem', position: 'absolute' }}> <Typography sx={{ fontSize: '13px', fontWeight: '900', color: '#333' }} variant={'body2'}>remove</Typography></Box>
            </Fab>
        </Box >
    );
}

export default ModeFAB 