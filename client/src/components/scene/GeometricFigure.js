import React, { useContext, useState, Suspense, useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useSnackbar } from 'notistack'
import { Edges, useCursor, useTexture, Html, useDetectGPU, useSelect } from '@react-three/drei'
import { useControls } from './Leva'
import { useFrame, useThree } from '@react-three/fiber'
import { checkIfNotUnderground } from '../utils/checkDiff.js'
import { button as btn } from 'leva'
import useSceneStore from "./sceneStore"
import axios from 'axios'
import uuid from 'react-uuid'
import _ from 'lodash'
import { resourceToImg } from '../utils/handleImages'



const isLocalhost = window.location.hostname === 'localhost'
const url2 = 'https://no-imagination-required.s3.eu-west-2.amazonaws.com/' // !isLocalhost ? 'https://no-imagination-required.io/backend/images/' : 'http://localhost:5000/images/'
const url = ''
const defaultTexture = 'default.png'
const missingTexture = 'missing.jpg'

const GeometricFigure = ({ color = "#000000", thickness = 1, roughness = 0.65, envMapIntensity = 1, transmission = 0, metalness = 0, map, ...props }) => {
  const [hovered, setHover] = useState(false)
  const [prev, setPrev] = useState(false)
  const ws = useSceneStore((state) => state.ws)
  const selected = useSelect().map((sel) => sel.userData.store)
  const sel = useSelect()
  const [isSelected, setIsSelected] = useState(false)
  const { scene, gl, camera, invalidate } = useThree()
  const mesh = useRef()
  const changeObject = useSceneStore((state) => state.changeObject)
  const addObject = useSceneStore((state) => state.addObject)
  const removeObjectWS = useSceneStore((state) => state.removeObjectWS)
  const [store, materialProps] = useControls(selected, {
    name: { value: props.properties.name },
    color: {
      value: props.properties.color
    },
    map: {
      label: 'texture',
      image: props.properties.map ?? defaultTexture,
    },
    // 'edit texture': btn(() => props.editor(materialProps, mesh.current), { disabled: GPUTier.isMobile }),
    duplicate: btn(() => duplicateObject()),
    Vector2: { label: 'map repeat', value: { x: props.properties.mapRepeat.x, y: props.properties.mapRepeat.y }, min: 0.01, max: 200, step: 0.2, lock: true },
    scale: { label: 'size', value: { x: props.properties.scale.x, y: props.properties.scale.y, z: props.properties.scale.z }, min: 0.01, max: 300, lock: true, step: 0.5 },
    // roughness: { value: roughness, min: 0.01, max: 1 },
    // thickness: { value: thickness, min: 0.01, max: 1 },
    // envMapIntensity: { value: envMapIntensity, min: 0.01, max: 1 },
    // transmission: { value: transmission, min: 0.01, max: 1 },
    side: { label: 'cover side', value: props.properties.side, options: [THREE.DoubleSide, THREE.FrontSide, THREE.BackSide] },
    // metalness: { value: metalness, min: 0, max: 1 }
  })
  const isBlob = materialProps?.map?.split('blob:').length > 1

  const sendWSnewObj = (properties) => {
    ws.then((res) => {
      let data = { change: { status: 'new', change: properties } }
      res.send(JSON.stringify(data))
    })
  }

  const duplicateObject = () => {
    const duplicate = _.clone(mesh.current?.properties)
    duplicate.objID = uuid()
    addObject(duplicate)
    sendWSnewObj(duplicate)
    props.enqueueSnackbar('Object duplicated!', { variant: 'success' })
  }

  useEffect(() => {
    props.camera[0]({ position: camera.position, rotation: { x: camera.rotation._x, y: camera.rotation._y, z: camera.rotation._z, order: camera.rotation._order }, target: props.mapControls.current.target })
    props.camera[2](false)
  }, [props.camera[1]])

  const path = (isBlob ? '' : url2) + materialProps.map
  const mapz = useTexture(path)
  mapz.repeat.set(materialProps.Vector2.x / 10, materialProps.Vector2.y / 10)
  mapz.wrapS = mapz.wrapT = THREE.RepeatWrapping;
  materialProps.map = mapz
  const setHov = (e, val, c) => {
    e.stopPropagation()
    setHover(val)
  }

  useCursor(hovered)
  useEffect(async () => {
    if (isBlob) {
      const makeImage = await resourceToImg(materialProps.map, false)
      ws.then((res) => {
        let data = { change: { status: 'image', change: { image: makeImage, objID: mesh.current.objID } } }
        console.log(data)
        res.send(JSON.stringify(data))
      })
      materialProps.map = makeImage
      mesh.current.properties.map = makeImage
      mesh.current.material.map.image.src = makeImage
      changeObject('map', makeImage, mesh.current.objID)
      props.enqueueSnackbar('Texture image changed!', { variant: 'success' })
    }
  }, [isBlob, materialProps.map])


  useEffect(() => {
    ws.then((res) => {
      res.onmessage = (webSocketMessage) => {
        const messageBody = JSON.parse(webSocketMessage.data);
        if (messageBody.status === 'change') {
          let objToMove = scene.getObjectByProperty('objID', messageBody.change.objID)
          const changeData = messageBody.change
          materialProps.Vector2.x = messageBody.change.mapRepeat.x
          materialProps.Vector2.y = messageBody.change.mapRepeat.y
          props.apply(changeData, objToMove, materialProps)
        } else if (messageBody.status === 'new') {
          const newData = messageBody.change
          addObject(newData)
          props.enqueueSnackbar('Other user has added or duplicated object!', { variant: 'success' })
        } else if (messageBody.status === 'saved') {
          props.enqueueSnackbar('Owner has saved the scene!', { variant: 'success' })
        }
        else if (messageBody.status === 'remove') {
          const newData = messageBody.change
          removeObjectWS(newData)
          props.enqueueSnackbar('Other user has removed object!', { variant: 'success' })
        } else if (messageBody.status === 'image') {
          const newData = messageBody.change
          console.log(newData)
          mesh.current.properties.map = newData.image
          const clonedObject = _.clone(mesh.current.properties)
          console.log(clonedObject)
          removeObjectWS(newData.objID)
          addObject(clonedObject)
          props.enqueueSnackbar('Other user has changed one of the textures!', { variant: 'success' })
        } else if (messageBody.status === 'duplicate') {
          const newData = messageBody.change
          removeObjectWS(newData)
        }
        invalidate()
      }
    })
  })

  useFrame(() => {
    if (mesh.current) {
      checkIfNotUnderground(mesh.current, materialProps, selected)
    }
    if (!prev) {
      setPrev(JSON.stringify(materialProps) + JSON.stringify(mesh.current.position))
    }
    else if (isSelected) {
      ws.then((res) => {
        if (res.bufferedAmount !== 0) return
        let data = { change: { status: 'change', change: props.properties } }
        res.send(JSON.stringify(data))
      })
    }
  })

  useEffect(() => {
    let isSel = !!sel.find((sel) => sel?.objID === mesh?.current?.objID)
    setIsSelected(isSel)
    scene.updateMatrix()
  }, [selected])

  return (
    <mesh
      castShadow
      receiveShadow
      ref={mesh}
      objID={props.properties.objID}
      dispose={null}
      rotation={[props.properties.rotation.x, props.properties.rotation.y, props.properties.rotation.z]}
      position={[props.properties.position.x, props.properties.position.y, props.properties.position.z]}
      scale={[materialProps.scale.x, materialProps.scale.y, materialProps.scale.z]}
      userData={{ store: store, objID: props.properties.objID }}
      {...props}
      onClick={(e, c, b) => console.log(e, c, mesh.current)}
      onPointerOver={(e, c) => setHov(e, true, c)}
      onPointerOut={() => setHover(false)}>
      <boxBufferGeometry {...materialProps} args={[1, 1, 1]} />
      <meshPhysicalMaterial {...materialProps} dispose={null} color={materialProps.color} side={materialProps.side} />
      <Edges visible={isSelected} scale={1} renderOrder={1000}>
        <meshBasicMaterial transparent color="#333" depthTest={false} />
      </Edges>
      {false && (
        <ObjectInfo data={materialProps} editor={() => props.editor(materialProps, mesh)} duplicate={() => props.duplicate(materialProps, mesh)} mesh={mesh} />
      )}
    </mesh>
  )
}

const ObjectInfo = (props) => {
  return (
    <>
      <Html
        transform
        sprite
        rotation={[Math.PI, 0, -Math.PI]}
        occlude={props.mesh}
        //  distanceFactor={1}
        position={[-props.data.Vector3.width / 2, 0, -props.data.Vector3.length]}
        center

      >
        <div className='obInfo'>
          <h1>{props.data.name}</h1>
          <pre><h4 pointerEvents="none">W: {props.data.Vector3.width}m, H: {props.data.Vector3.height}m, L: {props.data.Vector3.length}m</h4></pre>
          <button onClick={props.editor}>edit texture</button><br />
          <button onClick={props.duplicate}>duplicate object</button></div>
      </Html >

    </>
  )
}

function checkIfFileExist(url) {
  const xhr = new XMLHttpRequest()
  xhr.open('HEAD', url, false)
  xhr.send('ping')
  return xhr.status !== 404
}

export { GeometricFigure }

