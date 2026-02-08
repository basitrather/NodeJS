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
const replaceTemplate = (templatePage, product) => {
  let current = templatePage.replace(/{%PRODUCTNAME%}/g, product.productName);
  current = current.replace(/{%IMAGE%}/g, product.image);
  current = current.replace(/{%FROM%}/g, product.from);
  current = current.replace(/{%QAUNTITY%}/g, product.quantity);
  current = current.replace(/{%NUTRIENTS%}/g, product.nutrients);
  current = current.replace(/{%PRODUCT_DESCRIPTION%}/g, product.description);
  current = current.replace(/{%PRICE%}/g, product.price);
  current = current.replace(/{%ID%}/g, product.id);

  if (!product.organic) current = current.replace(/{%NOT-ORGANIC%}/g, 'not-organic');
  return current;
};

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //OVERVIEW PAGE
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const cardsHtml = productData.map((ele) => replaceTemplate(cardTemplatePAGE, ele)).join('');
    const finalOutput = overviewPAGE.replace('{%PRODUCT_CARD%}', cardsHtml);
    res.end(finalOutput);

    // PRODUCT PAGE
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = productData[query.id];
    const output = replaceTemplate(productPAGE, product);
    res.end(output);

    //API PAGE
  } else if (pathname === '/customAPI') {
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
