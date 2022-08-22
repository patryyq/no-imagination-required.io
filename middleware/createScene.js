const mongoose = require('mongoose');
const Scene = require('../models/Scene');

// need a 'dummy' object to make collaboration features work. hopefully its only a temporary solution.
const dummyObject =
{
    objID: "d7aae34-2b22",
    name: "Object",
    position: {
        x: -4,
        y: -10,
        z: -5
    },
    rotation: {
        x: 0,
        y: 0,
        z: 0,
        order: "XYZ"
    },
    scale: {
        x: 0.01,
        y: 0.01,
        z: 0.01,
    },
    width: 1,
    height: 1,
    length: 1,
    color: "#ffffff",
    mapRepeat: {
        x: 10,
        y: 10
    }
}

const defaultCamera = {
    position: {
        x: 2.5348030784502256,
        y: 3.8085272913709476,
        z: 32.3400690689512
    },
    target: {
        x: 2.510815279105227,
        y: 3.802999999993484,
        z: 32.14158976390251
    }
}

// const dummyNewObj =

function createScene(userId, newSceneSettings) {
    const newScene = Scene.create({ userId, name: newSceneSettings.name, settings: newSceneSettings.settings, objects: [dummyObject], camera: defaultCamera })
    return newScene
}

module.exports = createScene
