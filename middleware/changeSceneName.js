const mongoose = require('mongoose');
const Scene = require('../models/Scene');

function changeSceneName(userId, _id, newName) {
    const saveScene = Scene.updateOne({ _id, userId }, { name: newName, updatedAt: Date.now() });//, userId 
    return saveScene;
}

module.exports = changeSceneName;