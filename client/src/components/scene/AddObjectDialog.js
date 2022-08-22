import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Fab, Dialog, Typography, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { GoPlus } from 'react-icons/go';
import AddObjectForm from './AddObjectForm'
import useSceneStore from "./sceneStore"

const DialogTit = (props) => {
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

// useEffect(() => {
//     props?.ws.then((res) => {
//         res.onmessage = (webSocketMessage) => {
//             const messageBody = JSON.parse(webSocketMessage.data);
//             // const cursor = getOrCreateCursorFor(messageBody);
//             //    if (mesh?.current?.objID !== messageBody?.objID) return

//             let objToMove = scene.getObjectByProperty('objID', messageBody.objID)
//             //     console.log(messageBody, objToMove)
//             props.apply(messageBody, objToMove)

//             invalidate()
//             gl.render(scene, camera)
//         }
//     })
// })

const AddObjectDialog = (props) => {
    const addObject = useSceneStore((state) => state.addObject)
    const ws = useSceneStore((state) => state.ws)
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleAdd = (e) => {
        addObject(e)
        props.enqueueSnackbar('Object added!', { variant: 'success' })
        sendWSnewObj(e)
        setOpen(false);
    };

    const sendWSnewObj = (properties) => {
        ws.then((res) => {
            let data = { change: { status: 'new', change: properties } }
            res.send(JSON.stringify(data))
        })
    }


    return (
        <React.Fragment>
            <Box
                hidden={!props.hiddenAdd}>
                <Fab
                    onClick={handleClickOpen}
                    color='primary'
                    aria-label='add'
                    size="medium"
                    sx={{ fontSize: '1.7rem' }} >
                    <GoPlus />
                    <Box sx={{ padding: '2px', bottom: '-1.7rem', position: 'absolute' }}> <Typography sx={{ fontSize: '13px', fontWeight: '900', color: '#333' }} variant={'body2'}>add</Typography></Box>
                </Fab>
            </Box >
            <Dialog
                sx={{ zIndex: '4000' }}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTit id="customized-dialog-title" onClose={handleClose}>
                    Add object
                </DialogTit>
                <DialogContent dividers>
                    <AddObjectForm submit={handleAdd} />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export default AddObjectDialog