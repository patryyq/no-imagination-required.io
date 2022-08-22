const mongoose = require('mongoose');
const Scene = require('../models/Scene');

function saveScene(userId, _id, objects, settings, camera) {
    const saveScene = Scene.updateOne({ _id, userId }, { objects, settings, camera, updatedAt: Date.now() });//, userId 
    return saveScene;
}

module.exports = saveScene;