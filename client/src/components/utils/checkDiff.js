const isLocalhost = window.location.hostname === 'localhost'
const url2 = !isLocalhost ? 'https://no-imagination-required.io/' : 'http://localhost:5000/'

const checkIfNotUnderground = (e, materialProps, selected = false) => {
    if (e.geometry !== undefined) {
        if (e.type === 'Mesh' && selected.length > 0) {
            const minObjectPositionY = e.geometry.parameters.height / 2
            if (e.position.y < minObjectPositionY) e.position.y = minObjectPositionY
            e.properties.mapRepeat = { x: e.material.map.repeat.x * 10, y: e.material.map.repeat.y * 10 }
            //  materialProps.mapRepeat = { x: e.material.map.repeat.x * 10, y: e.material.map.repeat.y * 10 }
            e.properties.position = e.position
            //       console.log(e.properties.map, materialProps.map.image.src)
            //   materialProps.map.image.src = url2 + e.properties.map
            //   e.properties.map = materialProps.map.image.src
            e.properties.scale = e.scale
            e.properties.color = '#' + e.material.color.getHexString()
            e.properties.rotation = { x: e.rotation._x, y: e.rotation._y, z: e.rotation._z, order: e.rotation._order }
            e.properties.width = e.geometry.parameters.width
            e.properties.side = e.material.side
            e.properties.height = e.geometry.parameters.height
            e.properties.length = e.geometry.parameters.depth
        }
    }
}

export { checkIfNotUnderground }