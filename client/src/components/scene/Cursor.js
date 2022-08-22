
import React, { useEffect, useState } from 'react'
import useSceneStore from './sceneStore'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { Box, Fab, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'

export default function Cursor() {
    const setSeeOtherPOV = useSceneStore((state) => state.setSeeOtherPOV)
    const seeOtherPOV = useSceneStore((state) => state.seeOtherPOV)
    const { enqueueSnackbar } = useSnackbar()

    const changePOV = () => {
        setSeeOtherPOV();
        (seeOtherPOV) ?
            enqueueSnackbar('You are seeing your POV!', { variant: 'success' }) :
            enqueueSnackbar('You are viewing other person POV! They are controlling what you see.', { variant: 'success' });
    }

    return (<>
        <Box>
            <Fab
                onClick={changePOV}
                color='primary'
                size="medium"
                aria-label='move'
                sx={{ fontSize: '1.7rem' }} >
                {seeOtherPOV ? (<AiFillEye />) : (<AiFillEyeInvisible />)}

                <Box sx={{ padding: '2px', bottom: '-1.7rem', position: 'absolute' }}> <Typography sx={{ fontSize: '13px', fontWeight: '900', color: '#333' }} variant={'body2'}>POV</Typography></Box>
            </Fab>
        </Box >
        <template id="cursor" >
            <svg viewBox="0 0 16.3 24.7" className="cursor" style={{ opacity: (seeOtherPOV ? 1 : 0), width: '30px', transition: 'all ease', position: 'absolute', zIndex: 2000000 }}>
                <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M15.6 15.6L.6.6v20.5l4.6-4.5 3.2 7.5 3.4-1.3-3-7.2z" />
            </svg>
        </template>
    </>
    )
}

