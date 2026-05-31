const fs = require("node:fs");
const zlib = require("node:zlib");
const createLargeFileHelper = require("./helper");

async function main() {
  //first create the file (about 100MB)
  await createLargeFileHelper("./input/large.txt", 5_000_000);

  //then compress it
  const readable = fs.createReadStream("./input/large.txt");
  const writable = fs.createWriteStream("./output/large.txt.gz");

  const gzip = zlib.createGzip();

  let inputBytes = 0;
  let outputBytes = 0;

  const start = Date.now();

  readable.on("data", (chunk) => {
    inputBytes += chunk.length;
  });

  readable.on("end", () => {
    console.log("READABLE: done");
  });

  gzip.on("data", (chunk) => {
    outputBytes += chunk.length;
  });

  gzip.on("error", (err) => {
    console.error(err);
  });

  writable.on("finish", () => {
    const end = Date.now();
    console.log("WRITABLE: done");
    console.log(`Input bytes : ${inputBytes}\nOutput bytes: ${outputBytes}`);
    console.log(`Compression took ${end - start} ms`);
  });

  readable.pipe(gzip).pipe(writable);
}

main();
