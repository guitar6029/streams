const fs = require("node:fs");

async function paymentTransform(pathFrom, pathTo) {
  const readable = fs.createReadStream(pathFrom);
  const writable = fs.createWriteStream(pathTo);

  let buffer = "";

  readable.on("data", (chunk) => {
    buffer += chunk.toString();

    const rows = buffer.split("\n");

    // Save potentially incomplete row
    buffer = rows.pop();

    for (const row of rows) {
      processRow(row, readable, writable);
    }
  });

  readable.on("end", () => {
    // Process final row if file doesn't end with newline
    if (buffer.length > 0) {
      processRow(buffer, readable, writable);
    }

    writable.end();

    console.log("Finished processing");
  });
}

function processRow(row, readable, writable) {
  const parsedPayment = parseRow(row);

  const sanitizedPayment = sanitizePayment(parsedPayment);

  validatePayment(sanitizedPayment);

  const normalizedPayment = normalizePayment(sanitizedPayment);

  const formattedPayment = formatPayment(normalizedPayment);

  const canContinue = writable.write(formattedPayment + "\n");

  if (!canContinue) {
    console.log("PAUSING: Too much data flowing in");

    readable.pause();

    writable.once("drain", () => {
      console.log("RESUMING: buffer drained");

      readable.resume();
    });
  }
}

function parseRow(row) {
  const [paymentId, vendor, amount, paymentDate, status] = row.split(",");

  return {
    paymentId,
    vendor,
    amount,
    paymentDate,
    status,
  };
}

function validatePayment(payment) {
  validatePaymentId(payment.paymentId);
  validateVendor(payment.vendor);
  validateAmount(payment.amount);
  validatePaymentDate(payment.paymentDate);
  validateStatus(payment.status);
}

function sanitizePayment(payment) {
  return {
    paymentId: payment.paymentId.trim(),
    vendor: payment.vendor.trim(),
    amount: payment.amount.trim(),
    paymentDate: payment.paymentDate.trim(),
    status: payment.status.trim(),
  };
}

function normalizePayment(payment) {
  return {
    paymentId: payment.paymentId,
    vendor: payment.vendor.toUpperCase(),
    amount: normalizeAmount(payment.amount),
    paymentDate: normalizePaymentDate(payment.paymentDate),
    status: payment.status.toUpperCase(),
  };
}

function formatPayment(payment) {
  return [
    payment.paymentId,
    payment.vendor,
    payment.amount,
    payment.paymentDate,
    payment.status,
  ].join(",");
}

function checkIfNullOrUndefined(value) {
  return value === null || value === undefined;
}

function isEmpty(value) {
  if (checkIfNullOrUndefined(value)) {
    return true;
  }

  return value.trim().length === 0;
}

function validatePaymentId(paymentId) {
  if (isEmpty(paymentId)) {
    throw new Error("Invalid payment id");
  }
}

function validateVendor(vendor) {
  if (isEmpty(vendor)) {
    throw new Error("Invalid vendor");
  }
}

function validateAmount(amount) {
  if (isEmpty(amount)) {
    throw new Error("Invalid amount");
  }

  if (!amount.startsWith("$")) {
    throw new Error("Amount must start with $");
  }

  const numericAmount = Number(amount.replace("$", ""));

  if (Number.isNaN(numericAmount)) {
    throw new Error("Amount must be numeric");
  }
}

function validatePaymentDate(paymentDate) {
  if (isEmpty(paymentDate)) {
    throw new Error("Invalid payment date");
  }

  const parts = paymentDate.split("/");

  if (parts.length !== 3) {
    throw new Error(`Invalid payment date: ${paymentDate}`);
  }

  const [month, day, year] = parts;

  if (
    Number.isNaN(Number(month)) ||
    Number.isNaN(Number(day)) ||
    Number.isNaN(Number(year))
  ) {
    throw new Error(`Invalid payment date: ${paymentDate}`);
  }
}

function validateStatus(status) {
  console.log(JSON.stringify(status));
  if (isEmpty(status)) {
    throw new Error("Invalid status");
  }

  const validStatuses = ["paid", "pending", "failed"];

  if (!validStatuses.includes(status.toLowerCase())) {
    throw new Error(`Invalid status: ${status}`);
  }
}

function normalizeAmount(amount) {
  const numericAmount = Number(amount.replace("$", ""));

  return Math.round(numericAmount * 100);
}

function normalizePaymentDate(paymentDate) {
  const [month, day, year] = paymentDate.split("/");

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

module.exports = paymentTransform;
