import React, { useContext, useState, useEffect } from 'react'
import UserProvider from '../contexts/UserProvider'
import Layout from '../Layout'
import { Box, Slide, Button, Paper, Card, CardActions, CardContent, Typography, DialogContent, DialogTitle, Dialog } from '@mui/material'
import { Link } from "react-router-dom"
import NewSceneSettings from './NewSceneSettings'
import axios from 'axios'
import { FaShareAlt } from 'react-icons/fa'
import { AiOutlineDelete, AiOutlineQuestion } from 'react-icons/ai';
import { GoPlus } from 'react-icons/go'
import { IoArrowBack } from 'react-icons/io5';
import formatDistance from 'date-fns/formatDistance'
import { useSnackbar } from 'notistack'
import SignInButtons from '../utils/SignInButtons'
import './style.css'
import { DialogTit } from '../scene/HelpDialog'
const isLocalhost = window.location.hostname === 'localhost'
const url = !isLocalhost ? '/backend' : 'http://localhost:5000' //'https://no-imagination-required.io/'

const ScenesDashboard = () => {
  const [state, setState] = useState('main')
  const [open, setOpen] = useState(false);
  const [temp, setTemp] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const [newSceneSettings, setNewSceneSettings] = useState({
    name: 'New scene',
    settings: {
      floor: { width: 300, length: 300, repeat: 15, visible: true },
      fps: { visible: false },
      infobox: { visible: false }
    }
  });
  const [scenes, setScenes] = useState(false)
  const userData = useContext(UserProvider.Context)

  const createNewScene = () => {
    axios({
      method: 'post',
      url: url + "/api/create-scene",
      data: { userId: userData._id, settings: newSceneSettings },
      withCredentials: true,
    }).then(res => {
      //  props.preview(res.data, objID)
      if (res.data._id) window.location.href = 'scene/' + res.data._id
    }).catch(error => {
      throw error
    });
    return
  }

  const changeSceneName = (newName, sceneId) => {
    axios({
      method: 'post',
      url: url + "/api/change-scene-name",
      data: { userId: userData._id, sceneId: sceneId, newName: newName },
      withCredentials: true,
    }).then(res => {

      enqueueSnackbar('Scene name changed!', { variant: 'success' })

    }).catch(error => {
      throw error
    });
    return
  }

  const allScenes = () => {
    axios({
      method: 'post',
      url: url + "/api/all-scenes",
      data: { userId: userData._id },
      withCredentials: true,
    }).then(res => {
      if (res.data) {
        setScenes(res.data)
      }
    }).catch(error => {
      throw error
    });
    return
  }

  const removeScene = (sceneId) => {
    axios({
      method: 'post',
      url: url + "/api/remove-scene",
      data: { userId: userData._id, sceneId: sceneId },
      withCredentials: true,
    }).then(res => {
      if (res.data) {
        enqueueSnackbar('Scene removed!', { variant: 'success' })
        setTimeout(() => allScenes(), 50)
      }
    }).catch(error => {
      enqueueSnackbar('Something went wrong!', { variant: 'error' })
      throw error
    });
    return
  }

  const url2 = !isLocalhost ? 'https://no-imagination-required.io' : 'http://localhost:3000' //'https://no-imagination-required.io/'

  const share = (e) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url2 + '/scene/' + e)
      enqueueSnackbar('Share link copied!', { variant: 'success' })
    }
  }

  const setTemporary = (e) => {
    setTemp(e.target.innerText)
  }

  const remove = (e) => {
    removeScene(e)
  }

  const orginalForkedInfo = (orginalInfo) => {
    handleClickOpen()
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (userData?._id) allScenes()
  }, [userData, state])

  return (
    <Layout>
      {userData ? (
        <Box sx={{ maxWidth: '700px', width: '100%', margin: '0 auto 25px auto' }}>
          {state === 'main' && scenes && (
            <Slide in={true} appear={true} direction="left">
              <Box>
                <h1 style={{ textAlign: 'center' }}> Dashboard</h1>
                <Button type="button" onClick={() => setState('new')} color="secondary" variant="contained" size="medium" sx={{ borderRadius: '20px', margin: '20px' }} startIcon={<GoPlus />}>
                  Create a new scene
                </Button>
                <Box>
                  <Paper elevation={3} sx={{ width: '95%', minHeight: '500px', margin: '0 auto' }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
                      <Box sx={{ width: '100%', boxSizing: 'border-box', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                        {scenes && scenes.map((scene) =>
                          <Box key={scene._id} sx={{ padding: { xs: 1, md: 2 } }}>
                            <Card sx={{ minWidth: 275 }}>
                              <CardContent>
                                <Box sx={{ position: 'relative' }}>
                                  <Typography suppressContentEditableWarning={true} onFocus={(e) => setTemporary(e)} contentEditable onBlur={(e) => {
                                    if (temp !== e.target.innerText) changeSceneName(e.target.firstChild.nodeValue, scene._id)
                                  }} variant="h5" component="div" >
                                    {scene.name}
                                  </Typography>


                                  <Typography variant="body2" component="div">
                                    updated:{formatDistance(new Date(scene.updatedAt), Date.now(), { addSuffix: true })}<br />
                                    created:{formatDistance(new Date(scene.createdAt), Date.now(), { addSuffix: true })}
                                  </Typography>
                                  {scene?.forked !== undefined && (<><Box sx={{ position: 'absolute', top: 0, right: 0 }}><Button onClick={() => orginalForkedInfo(scene.forked)} variant="contained" color="secondary" size="small" sx={{ borderRadius: '20px' }} >Forked <AiOutlineQuestion style={{ position: 'relative', top: '-2px', right: '-4px' }} size={22} /></Button></Box>
                                    <Dialog
                                      sx={{ zIndex: '4000' }}
                                      onClose={handleClose}
                                      aria-labelledby="customized-dialog-title"
                                      open={open}
                                    >
                                      <DialogTit id="customized-dialog-title" onClose={handleClose}>
                                        Source (original) scene information:
                                      </DialogTit>
                                      <DialogContent dividers>
                                        <Typography variant='h6' gutterBottom>
                                          Source scene name: <br /><b>{scene.forked.originalName} </b><br />
                                          Source scene owner user name: <br /><b>{scene.forked.userName} </b><br />
                                          Source scene link:<br /><b>
                                            <Link to={"/scene/" + scene.forked.originalId}>{"/scene/" + scene.forked.originalId}</Link> </b> <br /><br />
                                          (please note, the current version of the source scene could have changed since you forked it orginally; or could be deleted by the owner)
                                        </Typography>
                                      </DialogContent>

                                    </Dialog></>)}
                                </Box>
                              </CardContent>
                              <CardActions>
                                <Box sx={{ display: 'flex', width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                  <Link to={'/scene/' + scene._id} className="link">
                                    <Button type="button" color="primary" variant="contained" size="medium" sx={{ borderRadius: '20px' }}>
                                      Load scene
                                    </Button>
                                  </Link>
                                  <Box>
                                    <Button onClick={() => share(scene._id)} color="secondary" variant="outlined" size="medium" sx={{ borderRadius: '20px', width: '30px', height: '30px' }} >
                                      <FaShareAlt />
                                    </Button>
                                    <Button onClick={() => remove(scene._id)} color="danger" variant="circular" sx={{ width: '40px', height: '40px' }}>
                                      <AiOutlineDelete size={25} />
                                    </Button>
                                  </Box>
                                </Box>
                              </CardActions>
                            </Card>
                          </Box>
                        )}
                      </Box >
                      {/* <Box sx={{ width: '50%', boxSizing: 'border-box', margin: 0, display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}>
                        Objects
                      </Box> */}
                    </Box>
                  </Paper>
                </Box>
              </Box>
            </Slide>
          )
          }
          {
            state === 'new' && (
              <Slide in={true} appear={true} direction="left">
                <Box >
                  <Button type="button" onClick={() => setState('main')} color="secondary" variant="outlined" size="medium" sx={{ borderRadius: '20px', margin: '20px' }} startIcon={<IoArrowBack />}>
                    Go back to scenes
                  </Button>
                  <Box>
                    <Paper elevation={3} sx={{ width: '95%', minHeight: '500px', margin: '0 auto' }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}>
                        <Box sx={{ width: '100%', boxSizing: 'border-box', margin: 0, display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}>
                          <NewSceneSettings settings={[newSceneSettings, setNewSceneSettings]} />
                        </Box >
                        {/* <Box sx={{ width: '50%', boxSizing: 'border-box', margin: 0, display: 'flex', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}>
                          <Box sx={{ m: 1, mt: 4 }}>
                            50%
                          </Box>
                        </Box> */}
                        <Button type="button" onClick={createNewScene} color="secondary" variant="contained" size="medium" sx={{ margin: '2rem auto', width: 'fit-content', borderRadius: '20px' }}>
                          Create new scene now
                        </Button>
                      </Box>
                    </Paper>
                  </Box>
                </Box>
              </Slide>
            )
          }
        </Box >) : (
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'column', width: 'fit-content', margin: '4rem auto 0 auto', textAlign: 'center' }}>
          <h2> You need to sign in first.</h2>
          <SignInButtons />
        </div>
      )}
    </Layout >
  );
};

export default ScenesDashboard;
