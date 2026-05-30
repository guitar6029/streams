const fs = require("node:fs");

const readable = fs.createReadStream("./data/input.txt");

const writable = fs.createWriteStream("./data/output.txt");

readable.on("data", (chunk) => {
  const canContinue = writable.write(chunk);
  if (!canContinue) {
    console.log("PAUSING : too much data flowing");

    readable.pause();

    writable.once("drain", () => {
      console.log("RESUMING: buffer has room again");
      readable.resume();
    });
  }
});

readable.on("end", () => {
  writable.end();
  console.log("Done");
});
