//import HTTP package to turn the file into a server
//http package is a default Node.JS package
// const http = require('http');
// const app = require('./backend/app');
// const port = process.env.PORT || 3000;

// //Tell Express on which port we're working
// //app.set() to set a configuration for the Express environment
// //I set the configuration  for the port key, a reserved key
// app.set('port', port);

// //Use HTTP package to create a new server.
// //Use app.js as a listener for incoming requests, so pass app to createServer
// const server = http.createServer(app);

// server.listen(port);
const express=require("express");


const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");

//Make sure the port number is a valid number
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

//Check what type of error occurred and log something different and
//exit gracefully from NodeJS server
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//onListening: another function which is stored in the constant
//We log that we are now listening to incoming requests.
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);