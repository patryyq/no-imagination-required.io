// Imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const Resize = require('./Resize');
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const { uploadFile, getFileStream } = require('./config/aws-s3')

const createScene = require('./middleware/createScene')
const saveScene = require('./middleware/saveScene')
const loadScene = require('./middleware/loadScene')
const removeScene = require('./middleware/removeScene')
const loadAllScenes = require('./middleware/loadAllScenes')
const forkScene = require('./middleware/forkScene')
const changeSceneName = require('./middleware/changeSceneName')

// Config
dotenv.config({ path: './config/config.env' });
require('./config/passport')(passport);

// Environment Varibles
const PORT = process.env.NODE_ENV === 'production' ? 5000 : 5000;

// Connect to DB
connectDB();

// Start Server
const app = express();
// CORS Middleware
let link = 'http://localhost:3000';
if (process.env.NODE_ENV === 'production') {
  link = 'https://no-imagination-required.io';
  app.use(cors({ credentials: true, origin: 'https://no-imagination-required.io' }));
} else {
  app.use(cors({ credentials: true, origin: true }));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static File Declaration
app.use('/static/', express.static(path.join(__dirname, 'client/build')));
app.use('/', express.static(path.join(__dirname, 'public')));

app.options('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  res.status(204)
  next()
})

// Logging Middleware
app.use(morgan('dev'));

// Sessions Middleware
app.use(
  session({
    secret: 'someR4nd0ms4cr3t',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
  }),
);

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, './public/uploads/');
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.fieldname + '-' + Date.now() + file.originalname);
//   }
// });
// const upload = multer({ storage: storage }).single('image');

const upload = multer({ dest: './public/uploads/' })

// const s3 = new aws.S3({
//   accessKeyId: "AKIAURXJUAI3SX4YH2FU",
//   secretAccessKey: "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",
//   Bucket: " "
// })

// const upload = multer({
//   storage: multerS3({
//       s3: s3,
//       bucket:””,
//       metadata: function (req, file, cb) {
//           cb(null, { fieldName: file.fieldname });
//       },
//       key: function (req, file, cb) {
//           cb(null, Date.now().toString())
//       }
//   })
// })


// app.post('/api/upload-texture', function (req, res) {
//   upload(req, res, function (err) {
//     if (err) {
//       return res.end("Error uploading file.");
//     }

//     return res.end('uploads/' + req.file.filename);
//   });
// });

app.get('/images/:key', (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  getFileStream(key, res);
})

app.post('/api/upload-texture', upload.single('image'), async (req, res) => {
  const file = req.file;
  console.log(file);

  // resize
  const resizeFile = new Resize(file.destination)
  const resizeFileRes = await resizeFile.save(file.path)
  console.log(resizeFileRes)
  const result = await uploadFile({ path: 'public/uploads/' + resizeFileRes, filename: resizeFileRes });
  await unlinkFile('public/uploads/' + resizeFileRes);
  console.log(result);
  console.log(resizeFileRes);
  const description = req.body.description;
  res.send(`${resizeFileRes}`);
})

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));

app.post('/api/create-scene', function (req, res) {
  if (req.isAuthenticated()) {
    createScene(req.body.userId, req.body.settings).then((response, err) => {
      if (response) {
        console.log(response)
        res.json(response)
      } else {
        console.log(err)
        res.status(304).send('not cool')
      }
    })
  } else {
    res.status(303).send('not auth')
  }
});

app.post('/api/save-scene', function (req, res) {
  if (req.isAuthenticated()) {
    saveScene(req.body.userId, req.body.sceneId, req.body.objects, req.body.settings, req.body.camera).then((response, err) => {
      if (response) {

        res.json(response)
      } else {
        console.log(err)
        res.status(304).send('not cool')
      }
    })
  } else {
    res.status(403).send('not auth')
  }
});


app.post('/api/change-scene-name', function (req, res) {
  if (req.isAuthenticated()) {
    changeSceneName(req.body.userId, req.body.sceneId, req.body.newName).then((response, err) => {
      if (response) {

        res.json(response)
      } else {
        console.log(err)
        res.status(304).send('not cool')
      }
    })
  } else {
    res.status(403).send('not auth')
  }
});

app.post('/api/fork-scene', function (req, res) {
  if (req.isAuthenticated()) {
    forkScene(req.body.userId, req.body.sceneId, req.body.userName).then((response, err) => {
      if (response) {

        res.json(response)
      } else {
        console.log(err)
        res.status(304).send('not cool')
      }
    })
  } else {
    res.status(403).send('not auth')
  }
});

app.post('/api/remove-scene', function (req, res) {
  if (req.isAuthenticated()) {
    removeScene(req.body.userId, req.body.sceneId).then((response, err) => {
      if (response) {

        res.json(response)
      } else {
        console.log(err)
        res.status(304).send('not cool')
      }
    })
  } else {
    res.status(403).send('not auth')
  }
});

app.post('/api/load-scene', function (req, res) {
  if (req.isAuthenticated()) {
    loadScene(req.body.sceneId, req.body.userId,).then((response, err) => {
      if (response) {

        res.json(response)
      } else {
        console.log(err)
        res.status(403).send('not cool')
      }
    })
  } else {
    res.status(403).send('not auth')
  }
});

app.post('/api/all-scenes', function (req, res) {
  if (req.isAuthenticated()) {
    loadAllScenes(req.body.userId).then((response, err) => {
      if (response) {

        res.json(response)
      } else {
        console.log(err)
        res.status(403).send('not cool')
      }
    })
  } else {
    res.status(403).send('not auth')
  }
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));



// moving and adding/removing objects websocket
function heartbeat() {
  this.isAlive = true;
}
const wss = new WebSocket.Server({ port: 7071 });

wss.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', heartbeat);

  ws.on('message', (dat) => {
    const data = JSON.parse(dat)
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data.change));
      }
    });
  });
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', function close() {
  clearInterval(interval);
});


// see-their-pov websocket
const wsPOV = new WebSocket.Server({ port: 7072 });

wsPOV.on('connection', (ws) => {
  ws.isAlive = true;
  ws.on('pong', heartbeat);

  ws.on('message', (dat) => {
    const data = JSON.parse(dat)
    wsPOV.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data.change));
      }
    });
  });
});

const inter = setInterval(function ping() {
  wsPOV.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wsPOV.on('close', function close() {
  clearInterval(inter);
});