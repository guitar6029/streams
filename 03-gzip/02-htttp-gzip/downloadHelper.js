const fs = require("node:fs");
const zlib = require("node:zlib");

function downloadFileHelper(res) {
  const readable = fs.createReadStream("./03-gzip/input/large.txt");
  const gzip = zlib.Gzip();

  res.writeHead(200, {
    "Content-Encoding": "gzip",
    "Content-Type": "application/octet-stream",
    "Content-Disposition": 'attachment; filename="large.txt.gz"',
  });

  readable.pipe(gzip).pipe(res);

  readable.on("end", () => {
    console.log("READABLE: done");
  });

  gzip.on("end", () => {
    console.log("GZIP: done");
  });

  res.on("finish", () => {
    console.log("RESPONSE: done");
  });
}

module.exports = downloadFileHelper;
