const fs = require("fs");
const http = require("http");
const url = require("url");

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
// HTTP MODULE && URL MODULE
const server = http.createServer((req, res) => {
  const pathName = req.url;
  if (pathName === "/overview") {
    res.end("overview Page");
  } else if (pathName === "/" || pathName === "/services") {
    res.end("Services Page");
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "custom-header": "Please use the proper URL",
    });
    res.end("<h1>Hello, Page Not Found</h1>");
  }
});
server.listen(8000, "localhost", () => {
  console.log("Server Started");
});
