import React, { forwardRef, useState, useEffect } from "react"
import { TransformControls } from '@react-three/drei'

const TransformControl = forwardRef((props, ref) => {
    const [position, setPosition] = useState(false)
    const [rotation, setRotation] = useState(false)
    const [scale, setScale] = useState(false)

    useEffect(() => {
        if (ref?.current) {
            ref.current?.updateWorldMatrix(true, true)
            ref.current?.updateMatrixWorld(true)
        }
    }, [])

    return (
        <React.Fragment>
            {props.isSelected && (
                <TransformControls
                    ref={ref}
                    showX={props.isSelected}
                    showY={props.isSelected}
                    showZ={props.isSelected}
                    active={props.isSelected}
                    rotationSnap={0.02}
                    mode={props.mode}
                    object={props.selected[0]}
                //      onChange={(e) => setPos(e, props.selected, position, setPosition, rotation, setRotation, setScale, props.mode)}
                //      onObjectChange={(e) => checkIfNotUnderground(e, props.selected, position, rotation, scale, props.mode)}
                />
            )}
        </React.Fragment>
    )
})

const setPos = (e, selected, position, setPosition, rotation, setRotation, setScale, mode) => {
    if (e.target.object !== undefined) {
        if (selected.length > 1 && (!position || (position.uuid0 !== selected[0].uuid) || (position.uuid1 !== selected[1].uuid))) {

            const posDiffX = selected[0].position.x - selected[1].position.x
            const posDiffY = selected[0].position.y - selected[1].position.y
            const posDiffZ = selected[0].position.z - selected[1].position.z
            setPosition({ pos: { posDiffX, posDiffY, posDiffZ }, uuid0: selected[0].uuid, uuid1: selected[1].uuid })

            const rotDiffX = selected[0].rotation.x - selected[1].rotation.x
            const rotDiffY = selected[0].rotation.y - selected[1].rotation.y
            const rotDiffZ = selected[0].rotation.z - selected[1].rotation.z
            setRotation({ rot: { rotDiffX, rotDiffY, rotDiffZ }, uuid0: selected[0].uuid, uuid1: selected[1].uuid })

            const scaDiffX = selected[0].scale.x - selected[1].scale.x
            const scaDiffY = selected[0].scale.y - selected[1].scale.y
            const scaDiffZ = selected[0].scale.z - selected[1].scale.z
            setScale({ sca: { scaDiffX, scaDiffY, scaDiffZ }, uuid0: selected[0].uuid, uuid1: selected[1].uuid })
        }
    }
}

const moveSelected = (selected, position) => {
    const posDiffX = selected[0].position.x - selected[1].position.x - position.pos.posDiffX
    const posDiffY = selected[0].position.y - selected[1].position.y - position.pos.posDiffY
    const posDiffZ = selected[0].position.z - selected[1].position.z - position.pos.posDiffZ

    if (posDiffX !== 0) {
        for (let i = 1; i < selected.length; ++i) {
            selected[i].position.set(selected[i].position.x + posDiffX, selected[i].position.y, selected[i].position.z)
        }
    } else if (posDiffY !== 0) {
        for (let i = 1; i < selected.length; ++i) {
            selected[i].position.set(selected[i].position.x, selected[i].position.y + posDiffY, selected[i].position.z)
        }
    } else if (posDiffZ !== 0) {
        for (let i = 1; i < selected.length; ++i) {
            selected[i].position.set(selected[i].position.x, selected[i].position.y, selected[i].position.z + posDiffZ)
        }
    }
}

const rotateSelected = (selected, rotation) => {
    const rotDiffX = selected[0].rotation.x - selected[1].rotation.x - rotation.rot.rotDiffX
    const rotDiffY = selected[0].rotation.y - selected[1].rotation.y - rotation.rot.rotDiffY
    const rotDiffZ = selected[0].rotation.z - selected[1].rotation.z - rotation.rot.rotDiffZ

    if (rotDiffX !== 0) {
        for (let i = 1; i < selected.length; ++i) {
            selected[i].rotation.set(selected[i].rotation.x + rotDiffX, selected[i].rotation.y, selected[i].rotation.z)
        }
    } else if (rotDiffY !== 0) {
        for (let i = 1; i < selected.length; ++i) {
            selected[i].rotation.set(selected[i].rotation.x, selected[i].rotation.y + rotDiffY, selected[i].rotation.z)
        }
    } else if (rotDiffZ !== 0) {
        for (let i = 1; i < selected.length; ++i) {
            selected[i].rotation.set(selected[i].rotation.x, selected[i].rotation.y, selected[i].rotation.z + rotDiffZ)
        }
    }
}

const scaleSelected = (selected, scale) => {
    const scaDiffX = selected[0].scale.x - selected[1].scale.x - scale.sca.scaDiffX
    const scaDiffY = selected[0].scale.y - selected[1].scale.y - scale.sca.scaDiffY
    const scaDiffZ = selected[0].scale.z - selected[1].scale.z - scale.sca.scaDiffZ

    if (scaDiffX !== 0) {
        for (let i = 1; i < selected.length; ++i) {
            selected[i].scale.set(selected[i].scale.x + scaDiffX, selected[i].scale.y, selected[i].scale.z)
        }
    } else if (scaDiffY !== 0) {
        for (let i = 1; i < selected.length; ++i) {
            selected[i].scale.set(selected[i].scale.x, selected[i].scale.y + scaDiffY, selected[i].scale.z)
        }
    } else if (scaDiffZ !== 0) {
        for (let i = 1; i < selected.length; ++i) {
            selected[i].scale.set(selected[i].scale.x, selected[i].scale.y, selected[i].scale.z + scaDiffZ)
        }
    }
}

const checkIfNotUnderground = (e, selected, position, rotation, scale, mode) => {
    if (e.target.object !== undefined) {
        if (e.target.object.type === 'Mesh') {
            const minObjectPositionY = e.target.object.sizeH / 2
            if (e.target.object.position.y < minObjectPositionY) e.target.object.position.y = minObjectPositionY
        } else {
            const minObjectPositionY = 0
            if (e.target.object.position.y < minObjectPositionY) e.target.object.position.y = minObjectPositionY
        }
        if (selected.length > 1) {
            if (mode === 'translate') {
                moveSelected(selected, position)
            }
            else if (mode === 'rotate') {
                rotateSelected(selected, rotation)
            }
            else if (mode === 'scale') {
                scaleSelected(selected, scale)
            }
        }
    }
}

export default TransformControl