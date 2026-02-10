const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // fs.readFile('./bigFile.txt', (err, data) => {
  //   res.end(data);
  // });
  // const stream = fs.createReadStream('./bigFile.txt');
  // stream.pipe(res);
});
server.listen(3000, 'localhost', () => {
  console.log('Hello! server started');
});
