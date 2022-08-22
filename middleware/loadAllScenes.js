const mongoose = require('mongoose');
const Scene = require('../models/Scene');

function loadAllScenes(userId) {
    const loadAllScenes = Scene.find({ userId }).sort({ updatedAt: -1 })
    return loadAllScenes
}

module.exports = loadAllScenes