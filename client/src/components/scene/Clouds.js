import React, { Suspense } from "react"
import { Cloud } from '@react-three/drei'

export const Clouds = () => {
    return (
        <Suspense fallback={null}>
            <Cloud position={[-60, 68, -55]} speed={0} opacity={1} />
            <Cloud position={[0, 86, -80]} speed={0} opacity={0.7} />
            <Cloud position={[-14, 80, 60]} speed={0} opacity={1} />
            <Cloud position={[-64, 81, -25]} speed={0} opacity={0.7} />
            <Cloud position={[14, 85, 60]} speed={0} opacity={0.75} />
            <Cloud position={[-4, 90, -30]} speed={0} opacity={1} />
            <Cloud position={[34, 61, -55]} speed={0} opacity={0.5} />
            <Cloud position={[14, 55, 80]} speed={0} opacity={0.75} />
            <Cloud position={[60, 78, 55]} speed={0} opacity={1} />
            <Cloud position={[-20, 86, 80]} speed={0} opacity={0.7} />
            <Cloud position={[4, 80, -60]} speed={0} opacity={1} />
            <Cloud position={[64, 81, 15]} speed={0} opacity={0.7} />
            <Cloud position={[-14, 85, -60]} speed={0} opacity={0.75} />
            <Cloud position={[14, 90, 20]} speed={0} opacity={1} />
            <Cloud position={[-34, 71, 55]} speed={0} opacity={0.5} />
            <Cloud position={[-4, 55, -80]} speed={0} opacity={0.75} />
        </Suspense>
    )
}