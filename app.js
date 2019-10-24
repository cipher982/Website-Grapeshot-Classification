const http = require('http');
//const tf = require()
//import * as tf from '@tensorflow/tfjs-node'
//import * as tf from '@tensorflow/tfjs-node-gpu'
//import * as tf from '@tensorflow/tfjs'


//var AWS = require('aws-sdk');
//AWS.config.update(
//  {
//    accessKeyId: ".. your key ..",
//    secretAccessKey: ".. your secret key ..",
//  }
//);

//const hostname = '0.0.0.0';
const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('Hello World\n');
  //createModel();
  res.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

async function createModel() {
  console.log("Beginning model load. . .")
  const model = await tf.loadLayersModel('model.json')
  console.log("Finished loading model")
  return model
};