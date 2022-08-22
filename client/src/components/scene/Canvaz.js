import React, { useContext, useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { Select, Sky, Environment, Html, useSelect, Stars } from '@react-three/drei'
import useSceneStore from "./sceneStore"
import { Floor } from './Floor'
import { Clouds } from './Clouds'
import TransformControl from './TransformControl'
import { useSnackbar } from 'notistack'
import { GeometricFigure } from './GeometricFigure'
import '../style.css'
import WSADControls from './KeyBoardControls'
import _ from 'lodash'
import InfoBox from './InfoBox'


const Canvaz = (props) => {
  const objectsInScene = useSceneStore((state) => state.objects)
  const { enqueueSnackbar } = useSnackbar()
  const transform = useRef()
  const selected = useSceneStore((state) => state.selected)
  const changeObject = useSceneStore((state) => state.changeObject)
  const setSelected = useSceneStore((state) => state.setSelected)
  const settings = useSceneStore((state) => state.settings)
  const group = useRef()
  const mapControls = useRef()

  const isSelected = selected.length > 0 ? true : false // !!selected.find((sel) => sel === store)

  const applyChange = (change, mesh) => {
    if (mesh?.position === undefined) return
    mesh.position.set(change?.position?.x, change?.position?.y, change?.position?.z)
    mesh.rotation.set(change?.rotation?.x, change?.rotation?.y, change?.rotation?.z, 'XYZ')
    mesh.material.color.set(change?.color)
    mesh.scale.set(change?.scale?.x, change?.scale?.y, change?.scale?.z)
    mesh.material.map.repeat.setX(change?.mapRepeat?.x / 10)
    mesh.material.map.repeat.setY(change?.mapRepeat?.y / 10)
    mesh.material.side = change.side
  }

  const setSel = (e) => {
    setSelected(e)
  }

  useEffect(() => {
    if (transform.current) {

      group.current.updateMatrix()
      const controls = transform.current
      const callback = (event) => {
        mapControls.current.enabled = !event.value
      }
      controls.addEventListener('dragging-changed', callback)
      return () => {
        controls.removeEventListener('dragging-changed', callback)
      }
    }
  }, [isSelected])



  return (
    <Canvas invalidateFrameLoop frameloop="demand" {...props}>
      {/* <gridHelper position={[20, 20, 20]} args={[500, 500]} /> */}
      < TransformControl ref={transform} selected={selected} isSelected={isSelected} mode={props.transformMode} />
      <Select onChange={(e) => setSel(e)} >
        <group ref={group}>
          <instancedMesh >
            {objectsInScene.map((o) => {
              return (
                <GeometricFigure camera={props.camera} enqueueSnackbar={enqueueSnackbar} userID={props.userId} apply={applyChange} objID={o.objID
                } key={o.objID} properties={o} editor={props.editTexture} triggCamera={props.triggCamera} mapControls={mapControls} />
              )
            })}
          </instancedMesh>
        </group>
      </Select>
      <ambientLight intensity={0.2} />
      <hemisphereLight args={[0xffffff, 0xef9481, 0.2]} />
      <directionalLight position={[0, 0, 5]} args={[0xff9933, 1.2]} />
      <mesh visible={settings?.floor?.visible}>
        <Floor size={{ width: settings.floor.width, length: settings.floor.length, ratio: settings.floor.repeat }} color={settings.floor.color} />
      </mesh>

      {settings?.infobox?.visible && (
        <InfoBox inScene={objectsInScene} />)}

      <WSADControls ref={mapControls} />
      <mesh visible={settings?.stars?.visible}>
        <Stars background={false} />
      </mesh>
      <Sky azimuth={0.1} turbidity={10} rayleigh={0.5} inclination={0.6} distance={1000} />
    </Canvas >
  )
}

export default Canvaz