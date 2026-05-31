const http = require("node:http");
const fs = require("node:fs");
const zlib = require("node:zlib");
const downloadFileHelper = require("./downloadHelper");
const PORT = 3000;
const server = http.createServer(async (req, res) => {
  if (req.url === "/download") {
    downloadFileHelper(res);
  } else if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "Hello! Server is working.",
      }),
    );
  } else {
    res.statusCode = 404;
    res.end("Not Found!");
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
