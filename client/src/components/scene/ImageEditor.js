import React, { useRef, useState, Suspense } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Dropzone from 'react-dropzone'
import useSceneStore from "./sceneStore"
import { Box, Slider, Button, Fab } from "@mui/material"
import { Loader } from '@react-three/drei'
import axios from 'axios'
import Draggable from 'react-draggable'
import { BiMove } from 'react-icons/bi'
import { resourceToImg } from '../utils/handleImages.js'
const isLocalhost = window.location.hostname === 'localhost'
const url = !isLocalhost ? '/backend/' : 'http://localhost:5000/' //'https://no-imagination-required.io/'

const ImgEditor = (props) => {
    const [zoom, setZoom] = useState(1)
    const [loading, setLoading] = useState(false)
    const [ratio, setRatio] = useState(1)
    const [image, setImage] = useState(props.path ?? 'textures/default.png')
    const [width, setWidth] = useState(250)
    const [height, setHeight] = useState(250)
    const ref = useRef()
    const changeObject = useSceneStore((state) => state.changeObject)
    const setSelected = useSceneStore((state) => state.setSelected)

    const ammendImage = async (e) => {
        console.log(e)
        e.preventDefault()
        if (ref?.current?.state?.image?.resource === undefined) return
        setLoading(true)
        let resource = ref.current.state.image.resource
        console.log(typeof resource, resource)

        const imageURL = await resourceToImg(resource, ref)

        console.log('map', imageURL, props.objID)
        changeObject('map', imageURL, props.objID)
        setImage(url + imageURL)
        setLoading(false)
    }

    const handleDrop = (dropped) => {
        console.log(dropped, props.objID)
        setImage(dropped[0])
        //saveImg(dropped[0], props.objID)
    }

    const setRa = (ref) => {
        if (ref.current?.state?.image?.resource) {
            let curRatio = ref.current?.state?.image?.resource?.width / ref.current?.state?.image?.resource?.height
            setRatio(curRatio)
        }
    }



    return (
        <Draggable
            handle="#draggable-image-editor"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Box sx={{ pointerEvents: 'all', position: "relative", display: 'flex', flexDirection: 'column', background: '#181c20', padding: '20px' }}>

                <Dropzone
                    onDrop={handleDrop}
                    noClick
                    noKeyboard
                    style={{ width: '1050px', height: '1050px' }}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()}>
                            <AvatarEditor
                                crossOrigin={'anonymous'}
                                ref={ref}
                                onImageReady={() => setRa(ref)}
                                image={image}
                                width={width * ratio}
                                height={height}
                                border={50}
                                scale={zoom}
                                color={[255, 255, 255, 0.6]} // RGBA
                                rotate={0}
                            />
                            <input {...getInputProps()} />
                        </div>)}
                </Dropzone>
                <Box>
                    <Box sx={{
                        color: '#fff', width: 'fit-content', display: 'flex',
                        alignItems: 'center', alignSelf: 'center', margin: '7px 0'
                    }}>Zoom:
                        <Slider
                            sx={{
                                padding: '20px', width: '150px', marginLeft: '15px'
                            }}
                            step={0.01}
                            min={0.01}
                            max={10}
                            orientation="horizontal"
                            valueLabelDisplay="auto"
                            value={zoom}
                            size={'medium'}
                            onChange={(e, c) => setZoom(c)} />
                    </Box>
                    <Box sx={{
                        color: '#fff', width: 'fit-content', display: 'flex',
                        alignItems: 'center', alignSelf: 'center', margin: '7px 0'
                    }}>X ratio:
                        <Slider
                            sx={{
                                padding: '20px', width: '150px', marginLeft: '15px'
                            }}
                            step={0.01}
                            min={10}
                            max={600}
                            orientation="horizontal"
                            valueLabelDisplay="auto"
                            value={width}
                            size={'medium'}
                            onChange={(e, c) => setWidth(c)} />
                    </Box>
                    <Box sx={{
                        color: '#fff', width: 'fit-content', display: 'flex',
                        alignItems: 'center', alignSelf: 'center', margin: '7px 0'
                    }}>Y ratio:
                        <Slider
                            sx={{
                                padding: '20px', width: '150px', marginLeft: '15px'
                            }}
                            step={0.01}
                            min={10}
                            max={600}
                            orientation="horizontal"
                            valueLabelDisplay="auto"
                            value={height}
                            size={'medium'}
                            onChange={(e, c) => setHeight(c)} />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                        {!loading ? (<>
                            <Box>
                                <Button type="button" onClick={(e) => ammendImage(e)} color="secondary" variant="contained" size="medium">
                                    Preview
                                </Button>
                                <Fab
                                    color='info'
                                    id="draggable-image-editor"
                                    size="small"
                                    aria-label='remove'
                                    sx={{ position: 'absolute', bottom: '0', right: '0', margin: '4px', fontSize: '1.7rem', opacity: 1 }} >
                                    <BiMove />
                                </Fab>
                                <Button type="button" onClick={(e) => ammendImage(e)} color="secondary" variant="contained" size="medium">
                                    Save
                                </Button>
                                <Fab
                                    color='info'
                                    id="draggable-image-editor"
                                    size="small"
                                    aria-label='remove'
                                    sx={{ position: 'absolute', bottom: '0', right: '0', margin: '4px', fontSize: '1.7rem', opacity: 1 }} >
                                    <BiMove />
                                </Fab>
                            </Box>
                        </>) : (<Suspense fallback={<Loader />} />)}
                    </Box>
                </Box>

            </Box>
        </Draggable >
    )
}

export default ImgEditor