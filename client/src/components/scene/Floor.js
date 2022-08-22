import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
const isLocalhost = window.location.hostname === 'localhost'
const url2 = 'https://no-imagination-required.s3.eu-west-2.amazonaws.com/' // !isLocalhost ? 'https://no-imagination-required.io/backend/images/' : 'http://localhost:5000/images/'
export const Floor = (props) => {
    const colorMap = useLoader(TextureLoader, url2 + 'grasslight-big3.jpg')
    colorMap.repeat.set(props.size.width / props.size.ratio, props.size.length / props.size.ratio)
    colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
    return (
        <>
            <mesh ref={props.ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                <planeGeometry args={[props.size.width, props.size.length]} />
                <meshLambertMaterial map={colorMap} color={props.color} dithering={false} />
            </mesh>

        </>
    )
}