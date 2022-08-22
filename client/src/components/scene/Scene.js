import React, { useContext, useRef, useState, useEffect } from "react"
import useSceneStore from "./sceneStore"
import { useSelect } from "@react-three/drei"
import { useParams } from 'react-router-dom'
import Canvaz from './Canvaz'
import Box from "@mui/material/Box"
import SceneIcons from './SceneIcons'
import '../style.css'
import ImgEditor from './ImageEditor'
import { Panel } from './Leva'
import _ from 'lodash'
import FPS from '../utils/FPScounter'
import axios from "axios"
import { useSnackbar } from 'notistack'
import WebSockets from '../websockets/Websockets'
import WebSocketsPOV from '../websockets/WebsocketsPOV'
const url = process.env.NODE_ENV === 'production' ? '/backend' : 'http://localhost:5000' //'https://no-imagination-required.io/'



const Scene = (props) => {
  const objectsInScene = useSceneStore((state) => state.objects)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const setWs = useSceneStore((state) => state.setWs)
  const setWsPOV = useSceneStore((state) => state.setWsPOV)
  const ws = useSceneStore((state) => state.ws)
  const setLoadedData = useSceneStore((state) => state.setLoadedData)
  const removeObject = useSceneStore((state) => state.removeObject)
  const { enqueueSnackbar } = useSnackbar()
  const { sceneId } = useParams()
  const [cam, setCam] = useState(false)
  const [camUpdate, setCamUpdate] = useState(false)
  const [showProperties, setShowProperties] = useState(false)
  const [editor, setEditor] = useState(false)
  const [mode, setMode] = useState('translate')
  const settings = useSceneStore((state) => state.settings)
  const selected = useSceneStore((state) => state.selected)
  const setSelected = useSceneStore((state) => state.setSelected)
  const [loaded, setLoaded] = useState(false)
  const isSelected = selected.length > 0 ? true : false
  const editTexture = (materialProps, mesh) => {
    console.log(materialProps, mesh)
    setEditor({ orgImg: materialProps.map.image.src, objID: mesh.objID, mesh: mesh })
  }

  const forkScene = () => {
    axios({
      method: 'post',
      url: url + "/api/fork-scene",
      data: { userName: props.userData.displayName, userId: props.userData._id, sceneId: sceneId },
      withCredentials: true,
    }).then(res => {
      if (res.data) {
        console.log(res.data)
        ws.then((res) => {
          let data = JSON.stringify({ change: { status: 'saved', change: {} } })
          res.send(data)
          enqueueSnackbar('Scene forked! You remain on the original scene.', { variant: 'success' })
        })
      }
    }).catch(error => {
      enqueueSnackbar('Something went wrong!', { variant: 'error' })
      throw error
    });
  }

  const saveScene = async () => {
    setCamUpdate(true)
    setTimeout(() => {
      console.log({ objects: objectsInScene, userId: props.userData._id, sceneId: sceneId, settings: settings, camera: cam })
      axios({
        method: 'post',
        url: url + "/api/save-scene",
        data: { objects: objectsInScene, userId: props.userData._id, sceneId: sceneId, settings: settings, camera: cam },
        withCredentials: true,
      }).then(res => {
        if (res.data) {
          console.log(res.data)
          ws.then((res) => {
            let data = JSON.stringify({ change: { status: 'saved', change: {} } })
            res.send(data)
            enqueueSnackbar('Scene saved!', { variant: 'success' })
          })
        }
      }).catch(error => {
        enqueueSnackbar('Something went wrong!', { variant: 'error' })
        throw error
      });
      return
    }, 200)
  }

  const loadScene = () => {
    axios({
      method: 'post',
      url: url + "/api/load-scene",
      data: { userId: props.userData._id, sceneId: sceneId },
      withCredentials: true,
    }).then(res => {
      if (res.data && !loaded) {
        setLoadedData(res.data)
        const websockets = WebSockets()
        setWs(websockets)
        const websocketsPOV = WebSocketsPOV()
        setWsPOV(websocketsPOV)
        setLoaded(true)
        enqueueSnackbar('Scene loaded!', { variant: 'success' })
      }
    })
  }

  const sendWSremoveObj = () => {
    ws.then((res) => {
      const selectedID = selected[0].objID
      let data = JSON.stringify({ change: { status: 'remove', change: selectedID } })
      res.send(data)
      removeObject(selected)
      enqueueSnackbar('Object removed!', { variant: 'success' })
      setSelected([])
    })
  }

  const removeObjects = () => {
    sendWSremoveObj(selected)
  }

  useEffect(() => {
    if (props.userData?._id) {
      if (props.objects == false) {
        loadScene()
      }
    }
  }, [props.userData])

  useEffect(() => { if (!isSelected) setEditor(false) })

  useEffect(() => {
    if (props.userData?._id && !loaded) loadScene()
  }, [loaded, props.userData])
  return (
    <Box sx={{ width: '100vw', height: '100vh', padding: 0, margin: 0, overflow: 'hidden', position: 'absolute', top: 0, left: 0 }}>

      {isSelected && editor && (
        <div style={{ pointerEvents: 'none', position: 'absolute', top: 0, right: '0', display: 'flex', height: '100vh', alignItems: 'center' }}>
          <Box sx={{ zIndex: 800, pointerEvents: 'all' }} >
            <ImgEditor path={editor.orgImg} objID={editor.objID} mesh={editor.mesh} />
          </Box>
        </div>)
      }
      <Box sx={{ position: 'absolute', pointerEvents: 'none', top: 0, left: '0', display: 'flex', height: '100vh', alignItems: 'center' }}>
        <Box hidden={!showProperties} sx={{ zIndex: 800, pointerEvents: 'all' }} >
          <Panel selected={selected} />
        </Box>
      </Box>
      {loaded &&
        <SceneIcons
          //translate mode
          hidden={isSelected}
          setMode={setMode}
          mode={mode}
          remove={removeObjects}
          // scene settings
          // settings={[settings, setSettings]}
          save={saveScene}
          fork={forkScene}
          dayNight={isDarkMode}
          setDayNight={setIsDarkMode}
          hiddenAdd={!isSelected}
          userId={props.userData._id}
          enqueueSnackbar={enqueueSnackbar}
          // object properties
          properties={() => setShowProperties(!showProperties)}
          showProp={showProperties}
        />}
      {loaded && props?.userData !== undefined && (
        <Canvaz userId={props.userData._id}
          transformMode={mode}
          editTexture={editTexture}
          isDarkMode={isDarkMode}
          camera={[setCam, camUpdate, setCamUpdate]}
          {...props.objects}
          {...props.setObjects}
        />
      )}
      {settings?.fps?.visible && (<FPS />)}

    </Box>

  )
}

export default Scene