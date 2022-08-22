import axios from "axios"
const isLocalhost = window.location.hostname === 'localhost'
const url = !isLocalhost ? '/backend' : 'http://localhost:5000' //'https://no-imagination-required.io/'

const resourceToImg = async (resource, ref) => {
    if (!ref) {
        let img = resource.image
        console.log(img)

        const res = await fetch(img.src)
        console.log(res)
        const blob = await res.blob()
        console.log(blob)
        console.log(typeof blob)
        return saveImg(blob)

    }
    console.log('es', resource)
    let resizedCanvas = document.createElement("canvas");
    let resizedContext = resizedCanvas.getContext("2d");
    let ratio = 1
    let reX = Math.floor(resource.width * ratio)
    while (reX > 1100) {
        ratio -= 0.04
        reX = Math.floor(resource.width * ratio)
    }
    resizedCanvas.width = Math.floor(resource.width * ratio)
    resizedCanvas.height = Math.floor(resource.height * ratio)
    let imageCanvas = !ref ? resource : ref.current.getImage()
    resizedContext.drawImage(imageCanvas, 0, 0, resizedCanvas.width, resizedCanvas.height);

    const image = resizedCanvas.toDataURL('image/jpeg', 0.6)
    const res = await fetch(image)
    console.log(typeof res)
    const blob = await res.blob()
    console.log(typeof blob)
    return saveImg(blob)
}

const saveImg = async (blob) => {
    console.log(blob)
    const formData = new FormData()
    formData.append('image', blob, 'texture.jpg')
    const res = await axios({
        method: 'post',
        url: url + "/api/upload-texture",
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
    })
    const data = await res.data
    console.log(data)
    return data
}

export { resourceToImg }