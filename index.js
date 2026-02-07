const fs = require('fs');
const http = require('http');
const { json } = require('stream/consumers');
const url = require('url');

////////////////////////////////////////////////////////////////
// FILES MODULE

// Blocking | Sync way of using NodeJS
// const readingTxt = fs.readFileSync("./txt/input.txt", "utf-8");
// fs.writeFileSync(
//   "./txt/writtenFile.txt",
//   `This is the written file : ${readingTxt}`,
// );

// NonBlocking | Async way of using NodeJS via callbacks
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//   });
// });
// console.log("I run first");

///////////////////////////////////////////////////////////////////
// SERVER
const data = fs.readFileSync('./dev-data/data.json', 'utf-8');
const overviewPAGE = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const productPAGE = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8');
const cardTemplatePAGE = fs.readFileSync(`${__dirname}/templates/card_template.html`, 'utf-8');
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  //OVERVIEW PAGE
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    res.end(overviewPAGE);

    // PRODUCT PAGE
  } else if (pathName === '/product') {
    res.end('Product Page');

    //API PAGE
  } else if (pathName === '/customAPI') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);

    // NOT FOUND PAGE
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'custom-header': 'Please use the proper URL',
    });
    res.end('<h1>Hello, Page Not Found</h1>');
  }
});
server.listen(8000, 'localhost', () => {
  console.log('Server Started');
});
