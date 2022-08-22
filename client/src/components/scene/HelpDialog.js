import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IoMdHelp } from 'react-icons/io';
import { useDetectGPU } from '@react-three/drei';
import { Fab, Box, IconButton, Typography, DialogContent, DialogTitle, Dialog } from '@mui/material';

export const DialogTit = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

export default function HelpDialog() {
    const [open, setOpen] = useState(false);
    const gpuDetails = useDetectGPU()
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Box>
                <Fab
                    onClick={handleClickOpen}
                    color='secondary'
                    size="medium"
                    aria-label='move'
                    sx={{ fontSize: '1.7rem' }} >
                    <IoMdHelp />
                    <Box sx={{ padding: '2px', bottom: '-1.7rem', position: 'absolute' }}> <Typography sx={{ fontSize: '13px', fontWeight: '900', color: '#333' }} variant={'body2'}>info.</Typography></Box>
                </Fab>
            </Box >
            <Dialog
                sx={{ zIndex: '4000' }}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTit id="customized-dialog-title" onClose={handleClose}>
                    Controls
                </DialogTit>
                <DialogContent dividers>
                    <Typography variant='h6' gutterBottom>
                        w/a/s/d - move camera <br />
                        q/e - rotate camera<br />
                        r/f - camera elevation
                    </Typography>
                </DialogContent>
                <DialogContent dividers>
                    <Typography variant='h6' gutterBottom>
                        mouse1 - orbit camera <br />
                        mouse2 - move camera<br />
                        scroll wheel - zoom in/out
                    </Typography>
                </DialogContent>
                {/* <DialogContent dividers>
                    <Typography variant='h6' gutterBottom>
                        Multiselection with LEFT SHIFT key mouse1 CLICK <br />
                        Boxselection with LEFT SHIFT and mouse1 DRAG
                    </Typography>
                </DialogContent> */}
                <DialogContent dividers>
                    <Typography variant='h6' gutterBottom>
                        Hold LEFT SHIFT for speed boost
                    </Typography>
                </DialogContent>
                <DialogContent dividers>
                    <Typography variant='h6' gutterBottom>
                        Your gpu details (might be helpful for debugging):<br />
                        <pre>{JSON.stringify(gpuDetails)}</pre>
                    </Typography>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}