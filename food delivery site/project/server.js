const http = require('http');
const express = require("express");
const fs = require('fs');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');
const hostname = '127.0.0.1';
let port;

port = 8000;


const publicFolderPath = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
  console.log(req.url);

  const url = req.url;
  const filePath = path.join(publicFolderPath, url === '/' ? 'index.html' : url);

  const extname = path.extname(filePath);
  let contentType = 'text/html';

  // Set the appropriate content type for different file extensions
  switch (extname) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    // Add more cases for other file types as needed
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>404 Not Found</h1>');
      } else {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>500 Internal Server Error</h1>');
      }
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', contentType);
      res.end(content);
    }
  });
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});