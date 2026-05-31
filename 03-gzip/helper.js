const fs = require("node:fs");

const companies = ["ACME_CORP", "GLOBEX", "INITECH", "WAYNE_ENTERPRISES"];

async function createLargeFile(outputPath, count) {
  const writable = fs.createWriteStream(outputPath);

  for (let i = 0; i < count; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    let randomInvoiceAmount =
      Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    let randomPaidStatus = Math.random() > 0.5 ? "PAID" : "PENDING";
    const canContinue = writable.write(
      `${company},${randomInvoiceAmount},${randomPaidStatus}\n`,
    );
    if (!canContinue) {
      await new Promise((resolve) => writable.once("drain", resolve));
    }
  }

  writable.end();
}

module.exports = createLargeFile;
