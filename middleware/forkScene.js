const mongoose = require('mongoose');
const Scene = require('../models/Scene');
const _ = require('lodash');
const ObjectID = require('mongodb').ObjectID

async function forkScene(userId, _id, userName) {
    const forkScene = await Scene.find({ _id: _id });//, userId 
    // forkScene.userId = userId;
    // forkScene.name = forkScene.name + ' (forked)';
    const forkedScene = _.clone(forkScene[0]);
    const originalName = forkedScene.name
    forkedScene.name += ' (forked)'
    forkedScene._id = ObjectID();
    console.log(forkedScene);

    const insertForkedScene = await Scene.create({ userId, name: forkedScene.name, settings: forkedScene.settings, objects: forkedScene.objects, camera: forkedScene.camera, forked: { userName, originalId: _id, originalName: originalName, originalUserId: forkScene[0].userId } });
    // console.log(insertForketScene);
    return insertForkedScene;
}

module.exports = forkScene