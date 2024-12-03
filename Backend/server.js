const { createServer } = require('node:http');
const fs = require('fs').promises;

const hostname = '127.0.0.1';
const port = 3001;

const server = createServer((req, res) => {
  fs.readFile('./server.json', 'utf8')
    .then(data => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.end(data);
    })
    .catch(err => {
      res.statusCode = 500;
      res.end('Error reading file');
    });
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});