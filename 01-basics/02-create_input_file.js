const fs = require("node:fs");

const writable = fs.createWriteStream("./data/input.txt");

for (let i = 0; i < 2_000_000; i++) {
  let chunk = `${i} `;
  if (i > 0 && i % 10 === 0) {
    chunk = `\n${i}`;
  }
  const canContinue = writable.write(chunk);
}

writable.end();
