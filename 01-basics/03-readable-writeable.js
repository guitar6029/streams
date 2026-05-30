const fs = require("node:fs");

const writable = fs.createWriteStream("./data/output.txt");

const readable = fs.createReadStream("./data/input.txt");

readable.on("data", (chunk) => {
  writable.write(chunk);
});

readable.on("end", () => {
  writable.end();
  console.log("copy complete");
});
