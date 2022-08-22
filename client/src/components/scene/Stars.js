import * as React from 'react'

import { Stars, Plane } from '../../src'

function StarsScene() {
    return (
        <>
            <Stars />
            <Plane rotation-x={Math.PI / 2} args={[100, 100, 4, 4]}>
                <meshBasicMaterial color="black" wireframe attach="material" />
            </Plane>
            <axesHelper />
        </>
    )
}

export const StarsSt = () => <StarsScene />
StarsSt.storyName = 'Default'