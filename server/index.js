import express from 'express';
import https from 'https';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import devConfig from '../webpack.config.dev';
import {
  join
} from 'path';
import {
  json,
  urlencoded
} from 'body-parser';
import {
  readFileSync
} from 'fs';
import apiRouter from './routes/api';
//simport firebase from 'firebase';

const app = express();

const compiler = webpack(devConfig);
app.use(webpackDevMiddleware(compiler, {
  publicPath: 'https://localhost/assets/', // Serve app.bundle.js on https://.../assets
  logLevel: 'error', // Suppress build info output
}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(join(process.cwd(), 'assets')));

app.use(json({
  limit: '50mb'
}));
app.use(urlencoded({
  extended: true,
  limit: '50mb'
}));

app.use('/api', apiRouter);
app.get('/assets/vendor.dll.js', (req, res) => res.sendFile(join(process.cwd(), 'build', 'vendor.dll.js')));
app.get('*', (req, res) => res.sendFile(join(process.cwd(), 'assets', 'index.html')));

const certificates = {
  key: readFileSync(join(__dirname, 'certificates', 'server.key')),
  cert: readFileSync(join(__dirname, 'certificates', 'server.crt')),
};
https.createServer(certificates, app).listen(443, () => console.log('Server started on port 443.'));


<<<<<<< HEAD
// // setting up firebase connection
// var config = {
//     apiKey: "AIzaSyA7NJkHK-UA--JVDQtUj7hX9IXWiKYuw-I",
//     authDomain: "mapitude-bdcaa.firebaseapp.com",
//     databaseURL: "https://mapitude-bdcaa.firebaseio.com",
//     projectId: "mapitude-bdcaa",
//     storageBucket: "mapitude-bdcaa.appspot.com",
//     messagingSenderId: "104504510528"
//   };
//   firebase.initializeApp(config);

// // Reference database
// var database = firebase.database();
=======
// setting up firebase connection
// const config = {
//   apiKey: "apiKey",
//   authDomain: "projectId.firebaseapp.com",
//   databaseURL: "https://databaseName.firebaseio.com",
//   storageBucket: "bucket.appspot.com"
// };

// const config = {
//   apiKey: "AIzaSyA7NJkHK-UA--JVDQtUj7hX9IXWiKYuw-I",
//   authDomain: "mapitude-bdcaa.firebaseapp.com",
//   databaseURL: "https://mapitude-bdcaa.firebaseio.com",
//   projectId: "mapitude-bdcaa",
//   storageBucket: "mapitude-bdcaa.appspot.com",
//   messagingSenderId: "104504510528"
// };
// firebase.initializeApp(config);

// // Reference database
// const database = firebase.database();
// // Create file root reference
// const storageRef = firebase.storage().ref();

// // Create a reference to file
// const mountainsRef = storageRef.child('mountains.jpg');
// const file = ref.put(file).then(function(snapshot) {
//   console.log('Uploaded a blob or file!');
// });
>>>>>>> a1e5839223db76c1c2f160fc471994a7fdc23e1c
