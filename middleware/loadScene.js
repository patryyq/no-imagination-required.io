const mongoose = require('mongoose');
const Scene = require('../models/Scene');

function loadScene(_id) {
    const loadScene = Scene.findOne({ _id }) //, userId
    return loadScene
}

module.exports = loadScene