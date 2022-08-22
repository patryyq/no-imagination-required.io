import React, { useState } from 'react';
import { Fab, Box, Checkbox, IconButton, Typography, DialogContent, Dialog, DialogTitle, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { IoMdSettings } from 'react-icons/io';
import useSceneStore from "./sceneStore"
import _ from 'lodash'

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

export default function SceneSettings(props) {
    const settings = useSceneStore((state) => state.settings)
    const meta = useSceneStore((state) => state.meta)
    const changeSettings = useSceneStore((state) => state.changeSettings)
    const [fork, setFork] = useState(false)
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFork(false)
    };

    const saveAndClose = () => {
        props.save()
        handleClose()
    }


    const forkAndClose = () => {
        if (!fork) {
            setFork(true)
        } else {
            props.fork()
            handleClose()
        }
    }

    const changeSetting = (setting) => {
        const newSettings = _.clone(settings)
        newSettings[setting].visible = !newSettings[setting].visible
        changeSettings(newSettings)
    }

    return (
        <React.Fragment>
            <Box>
                <Fab
                    onClick={handleClickOpen}
                    color='primary'
                    size="medium"
                    aria-label='move'
                    sx={{ fontSize: '1.7rem' }} >
                    <IoMdSettings />
                    <Box sx={{ padding: '2px', bottom: '-1.7rem', position: 'absolute' }}> <Typography sx={{ fontSize: '13px', fontWeight: '900', color: '#333' }} variant={'body2'}>sett.</Typography></Box>
                </Fab>
            </Box >
            {!fork ? (
                <Dialog
                    sx={{ zIndex: '4000' }}
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTit id="customized-dialog-title" onClose={handleClose}>
                        Scene Settings
                    </DialogTit>
                    <Box>
                        {settings !== false ? (
                            <Box>
                                <DialogContent dividers>
                                    <Checkbox
                                        value={settings?.fps?.visible}
                                        checked={settings?.fps?.visible}
                                        onChange={() => changeSetting('fps')}
                                    /> Show FPS
                                </DialogContent>
                                <DialogContent dividers>
                                    <Checkbox
                                        value={settings?.floor?.visible}
                                        checked={settings?.floor?.visible}
                                        onChange={() => changeSetting('floor')}
                                    /> Ground
                                </DialogContent>
                                <DialogContent dividers>
                                    <Checkbox
                                        value={settings?.infobox?.visible}
                                        checked={settings?.infobox?.visible}
                                        onChange={() => changeSetting('infobox')}
                                    /> Infobox
                                </DialogContent>
                            </Box>
                        ) : (<></>)}</Box>
                    <Box sx={{ display: 'flex', width: 'fit-content', margin: '0 auto' }}>
                        <Button disabled={meta.userId === props.userId ? false : true} onClick={saveAndClose} color="primary" variant="contained" sx={{ borderRadius: '20px', margin: '20px' }}>{'Save scene'}</Button>
                        <Button onClick={forkAndClose} color="secondary" variant="contained" sx={{ borderRadius: '20px', margin: '20px' }}>{'Fork scene'}</Button>
                    </Box>
                    <Box sx={{ width: '100%', maxWidth: '400px', padding: '1rem' }}>
                        <Typography>Only scene owners can save original scenes. However, all users can fork all scenes (provided that they have a URL to the scene) - allowing to edit and save as their own on their accounts.<br /><br />Additionally, to duplicate scenes for reuse, consider the fork button as a 'duplicate' button.</Typography>
                    </Box>
                </Dialog>
            ) : (
                <Dialog
                    sx={{ zIndex: '4000' }}
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogTit id="customized-dialog-title" onClose={handleClose}>
                        Fork scene
                    </DialogTit>
                    <Box>

                        <Box>
                            <DialogContent dividers>
                                <b>To fork a scene, means to save someone else's scene to your account with full editing and saving capabilities.</b><br /><br />The fork button, will duplicate the scene and assign it to your account, however you will remain on the original scene.<br /> <b>(you can navigate to the newly forked scene thourgh Scenes section)</b> <br /><br />Only scene owners can save changes to the original scenes.<br /><br />Also please note, the duplicated version is what currently is saved in DB (not necessary what you see on screen). If you are not live collaborating and have just opened this scene - you already have up to date version. Otherwhise, if you are collaborating with the owner and made some changes which you would like to keep, you need to ask the owner to save the scene first (or try to replicate whatever changes were made :))<br /><br />Additionally, to duplicate scenes for reuse, consider the fork button as a 'duplicate' button.
                            </DialogContent>

                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', width: 'fit-content', margin: '0 auto' }}>
                        <Button disabled={meta.userId === props.userId ? false : true} onClick={saveAndClose} color="primary" variant="contained" sx={{ borderRadius: '20px', margin: '20px' }}>{'Save scene'}</Button>
                        <Button onClick={forkAndClose} color="secondary" variant="contained" sx={{ borderRadius: '20px', margin: '20px' }}>{'Fork scene'}</Button>
                    </Box>
                </Dialog>
            )}
        </React.Fragment >
    );
}