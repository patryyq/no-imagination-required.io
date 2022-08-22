import React, { useEffect, useRef, forwardRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls, MapControls } from '@react-three/drei'
import useSceneStore from "./sceneStore"

const vec = new THREE.Vector3()

const useCodes = () => {
    const codes = useRef(new Set())
    useEffect(() => {
        const onKeyDown = (e) => codes.current.add(e.code)
        const onKeyUp = (e) => codes.current.delete(e.code)
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('keyup', onKeyUp)
        return () => {
            window.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('keyup', onKeyUp)
        }
    }, [])
    return codes
}

const WSADControls = forwardRef((props, ref) => {
    const { camera, gl, invalidate, scene } = useThree()
    const wsPOV = useSceneStore((state) => state.wsPOV)
    const seeOtherPOV = useSceneStore((state) => state.seeOtherPOV)
    const cam = useSceneStore((state) => state.camera)
    const code = useCodes()

    const moveForward = (distance) => {
        let camY = camera.position.y
        vec.setFromMatrixColumn(camera.matrix, 0)
        vec.crossVectors(camera.up, vec)
        camera.position.addScaledVector(vec, distance)
        camera.position.y = camY
        ref.current.target.addScaledVector(vec, distance)
        window.dispatchEvent(new Event('resize'))
    }

    const moveRight = (distance) => {
        vec.setFromMatrixColumn(camera.matrix, 0)
        camera.position.addScaledVector(vec, distance)
        ref.current.target.addScaledVector(vec, distance)
    }

    const rotateRight = (distance) => {
        vec.setFromMatrixColumn(camera.matrix, 0)
        camera.position.addScaledVector(vec, distance)
    }

    const goUp = (distance) => {
        camera.position.y += distance
        ref.current.target.y += distance
    }

    useEffect(() => window.addEventListener('keydown', invalidate), [])
    useEffect(() => window.addEventListener('mousedown', invalidate), [])

    useFrame((_, delta) => {
        if (seeOtherPOV) return
        if (delta > 0.3) delta = 0.02
        const speed = code.current.has('ShiftLeft') ? 20 : 10
        if (code.current.has('KeyW')) moveForward(delta * speed * 1.5)
        if (code.current.has('KeyA')) moveRight(-delta * speed * 1.5)
        if (code.current.has('KeyS')) moveForward(-delta * speed * 1.5)
        if (code.current.has('KeyD')) moveRight(delta * speed * 1.5)
        if (code.current.has('KeyQ')) rotateRight(delta * speed * 0.1)
        if (code.current.has('KeyE')) rotateRight(-delta * speed * 0.1)
        if (code.current.has('KeyR')) goUp(delta * speed * 1)
        if (code.current.has('KeyF')) goUp(-delta * speed * 1)
    })

    useFrame(() => ref.current.update())

    useEffect(() => {
        wsPOV.then((ws) => {
            document.body.onmousemove = (evt) => {
                const xRatio = evt.clientX / evt?.view.innerWidth
                const yRatio = evt.clientY / evt.view.innerHeight
                const messageBody = { change: { status: 'pov', change: { cursor: { x: xRatio, y: yRatio }, camera: { position: camera?.position, target: ref?.current?.target } } } }
                if (ws.bufferedAmount !== 0) return
                ws.send(JSON.stringify(messageBody));
            };
            // document.body.onkeydown = (evt) => {
            //     const xRatio = evt.clientX / evt.view.innerWidth
            //     const yRatio = evt.clientY / evt.view.innerHeight
            //     const messageBody = { change: { status: 'pov', change: { cursor: { x: xRatio, y: yRatio }, camera: { position: camera?.position, target: ref?.current?.target } } } }
            //     if (ws.bufferedAmount !== 0) return
            //     ws.send(JSON.stringify(messageBody));
            // };
        })
    }, [])

    useEffect(() => {
        wsPOV.then((ws) => {
            ws.onmessage = (webSocketMessage) => {
                const messageBody = JSON.parse(webSocketMessage.data)
                if (messageBody.status === 'pov' && seeOtherPOV) {
                    const windowSize = { x: window.innerWidth, y: window.innerHeight }
                    const cursorPosition = messageBody.change.cursor
                    const cursor = getCursor(cursorPosition)
                    cursor.style.transform = `translate(${cursorPosition.x * windowSize.x}px, ${cursorPosition.y * windowSize.y}px)`

                    const cameraPosition = messageBody.change.camera
                    camera.position.x = cameraPosition.position.x
                    camera.position.y = cameraPosition.position.y
                    camera.position.z = cameraPosition.position.z
                    ref.current.target.x = cameraPosition.target.x
                    ref.current.target.y = cameraPosition.target.y
                    ref.current.target.z = cameraPosition.target.z
                    invalidate()

                };
            }
        })
    }, [seeOtherPOV])

    useEffect(() => {
        const target = cam?.target !== undefined ? Object.values(cam.target) : [-4, 4, -14]
        const position = cam?.position !== undefined ? Object.values(cam.position) : [-5, 1, -5]
        camera.position.x = position[0]
        camera.position.y = position[1]
        camera.position.z = position[2]
        ref.current.target.x = target[0]
        ref.current.target.y = target[1]
        ref.current.target.z = target[2]
    }, [cam])

    return (
        <MapControls
            enabled={!seeOtherPOV}
            enableDamping
            dampingFactor={0.1}
            ref={ref}
            args={[camera, gl.domElement]}
            makeDefault
            maxDistance={0.2}
            listenToKeyEvents={true}
            keys={{ LEFT: 'KeyA', RIGHT: 'KeyD', UP: 'KeyW', BOTTOM: 'KeyS' }}
            minDistance={0.2}
            minZoom={0.5}
            maxZoom={0.5}
            domElement={window}
            enableZoom={true}
            mouseButtons={{ LEFT: 0, RIGHT: 2 }}
            minAzimuthAngle={- Infinity}
            maxAzimuthAngle={Infinity}
            minPolarAngle={0}
            maxPolarAngle={Infinity}
        />
    )
})

export { useCodes }
export default WSADControls

const getCursor = (messageBody) => {
    const sender = messageBody.sender;
    const existing = document.querySelector(`[data-sender='${sender}']`);
    if (existing) {
        return existing;
    }
    const template = document.getElementById('cursor');
    const cursor = template.children[0].cloneNode(true);
    const svgPath = cursor.getElementsByTagName('path')[0];
    cursor.setAttribute("data-sender", sender);
    svgPath.setAttribute('fill', `hsl(blue, 50%, 50%)`);
    document.body.appendChild(cursor);

    return cursor;
}