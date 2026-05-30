const fs = require("node:fs");

const writable = fs.createWriteStream("./data/numbers.txt");

async function main() {
  for (let i = 0; i < 1_000_000; i++) {
    let chunk = ` ${i}`;
    if (i > 0 && i % 10 === 0) {
      chunk = `\n${i}`;
    }
    const canContinue = writable.write(chunk);
    if (!canContinue) {
      console.log("Buffer full...");
      await new Promise((resolve) => {
        writable.once("drain", resolve);
      });
      console.log("buffer drained...");
    }
  }
  writable.end();
  console.log("done.");
}

main();
