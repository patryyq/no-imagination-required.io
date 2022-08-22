import * as THREE from 'three'
import { useState, useRef, Suspense, useMemo } from 'react'
import { Canvas, useThree, useFrame, useLoader } from '@react-three/fiber'
import { MeshReflectorMaterial, CameraShake, OrbitControls, useTexture } from '@react-three/drei'
import { KernelSize } from 'postprocessing'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'
import LulabyScene from '../scenes/lulaby'
function Triangle({ color, ...props }) {
    const ref = useRef()
    const [r] = useState(() => Math.random() * 10000)
    useFrame((_) => (ref.current.position.y = -1.75 + Math.sin(_.clock.elapsedTime + r) / 20))
    const { paths: [path] } = useLoader(SVGLoader, '/triangle.svg') // prettier-ignore
    const geom = useMemo(() => SVGLoader.pointsToStroke(path.subPaths[0].getPoints(), path.userData.style), [path])
    return (
        <group ref={ref}>
            <mesh geometry={geom} {...props}>
                <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>
        </group>
    )
}

function Rig({ children }) {
    const ref = useRef()
    const vec = new THREE.Vector3()
    const { camera, mouse } = useThree()

    useFrame(() => {
        camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05)
        ref.current.position.lerp(vec.set(mouse.x * 0.5, mouse.y * 0.2, 0), 0.1)
        ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, (-mouse.x * Math.PI) / 20, 0.1)
    })

    return <group ref={ref}>{children}</group>
}

function Ground() {
    const [floor, normal] = useTexture(['/surface1.jpg', '/surface2.jpg'])

    return (
        <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position-y={-0.8}>
            <planeGeometry args={[8, 8]} />
            <MeshReflectorMaterial mirror={1} resolution={1024} blur={[500, 100]} mixBlur={12} mixStrength={1.5} color={0xf0f0f0} metalness={0} roughnessMap={floor} normalMap={normal} normalScale={[2, 2]} />
        </mesh>
    )
}

export default function Triangles() {
    return (
        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 15] }}>
            {/* <LulabyScene /> */}
            <color attach="background" args={[0x000000]} />
            <ambientLight />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            <Suspense fallback={null}>
                <Rig>
                    <Triangle color={0xff2060} scale={0.009} rotation={[0, 0, Math.PI / 3]} />
                    <Triangle color={0x00ffff} scale={0.009} position={[2, 0, -2]} rotation={[0, 0, Math.PI / 3]} />
                    <Triangle color={0xffa500} scale={0.009} position={[-2, 0, -2]} rotation={[0, 0, Math.PI / 3]} />
                    <Triangle color={0xffffff} scale={0.009} position={[0, 2, -10]} rotation={[0, 0, Math.PI / 3]} />
                    <Ground />
                </Rig>
                <EffectComposer multisampling={8}>
                    <Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.4} intensity={0.8} />
                    <Bloom kernelSize={KernelSize.HUGE} luminanceThreshold={0} luminanceSmoothing={0} intensity={0.6} />
                </EffectComposer>
            </Suspense>
            <CameraShake yawFrequency={0.2} pitchFrequency={0.2} rollFrequency={0.2} /> */
        </Canvas>
    )
}
