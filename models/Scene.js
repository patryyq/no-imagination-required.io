const mongoose = require('mongoose');

const SceneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  objects: {
    type: Array,
    name: {
      type: String,
    },
    properties: {
      type: Object
    },
  },
  settings: {
    type: Object
  },
  forked: {
    type: Object
  },
  camera: {
    type: Object
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Scene', SceneSchema);
