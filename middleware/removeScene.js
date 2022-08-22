const mongoose = require('mongoose');
const Scene = require('../models/Scene');

function removeScene(userId, sceneId) {
    const removeScene = Scene.deleteOne({ _id: sceneId, userId });
    return removeScene;
}

module.exports = removeScene;