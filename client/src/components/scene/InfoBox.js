import { useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"

const InfoBox = (props) => {
    const { scene, gl, camera } = useThree()
    const size = { x: 4, y: 4, z: 4 }
    const position = { x: -10, y: 2, z: 4 }
    return (
        <mesh onClick={() => console.log(scene, gl, camera, props.inScene)} position={[position.x, position.y, position.z]} >
            <boxBufferGeometry args={[size.x, size.y, size.z]} />
            <meshPhysicalMaterial color={0xffffff} />
            <Html
                transform
                occlude
                rotation={[-Math.PI, -Math.PI, -Math.PI]}
                distanceFactor={10}
                position={[0, 0, size.z / 2 + 0.001]}
                pointerEvents={"none"}
            >
                <b>InfoBox</b>
                <pre><b>click and <br />check console</b></pre>
            </Html>
            <Html
                transform
                occlude
                rotation={[Math.PI, 0, -Math.PI]}
                distanceFactor={10}
                position={[0, 0, -size.z / 2 - 0.001]}
                pointerEvents={"none"}
            >
                <b>InfoBox</b>
                <pre><b>click and <br />check console</b></pre>
            </Html>
            <Html
                transform
                occlude
                rotation={[Math.PI, -Math.PI / 2, -Math.PI]}
                distanceFactor={10}
                position={[-size.x / 2 - 0.001, 0, 0]}
                pointerEvents={"none"}
            >
                <b>InfoBox</b>
                <pre><b>click and <br />check console</b></pre>
            </Html>
            <Html
                transform
                occlude
                rotation={[Math.PI, Math.PI / 2, -Math.PI]}
                distanceFactor={10}
                position={[size.x / 2 + 0.001, 0, 0]}
                pointerEvents={"none"}
            >
                <b>InfoBox</b>
                <pre><b>click and <br />check console</b></pre>
            </Html>
        </mesh >
    )
}

export default InfoBox