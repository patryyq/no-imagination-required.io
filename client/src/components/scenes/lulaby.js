// [Help Required] Unable to load a GLTF Model: https://spectrum.chat/react-three-fiber/general/help-required-unable-to-load-a-gltf-model~d77788d6-35ff-4e5d-b3e9-23682c661699
// PositionalAudio: https://spectrum.chat/react-three-fiber/general/positionalaudio~a19b0644-298e-4323-b5ad-1d3f6019bcf2

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import LulabyCityModel from './model'

const LulabyScene = () => {

    return (
        <div className="root" style={{ background: '#04022b', position: 'absolute', width: '100vw', height: '100vh', top: 0, left: 0 }}>
            <Canvas>
                <fog attach="fog" args={['#0200f2', 0, 20]} />
                <Suspense fallback={null}>
                    <LulabyCityModel />
                    <boxBufferGeometry args={[4, 4, 4]} />
                    <meshPhysicalMaterial />
                </Suspense>
                <OrbitControls />
            </Canvas>
        </div >
    )
}

export default LulabyScene

// #04022b - dark purple
// #0200f2 - blue