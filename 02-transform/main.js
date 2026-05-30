const paymentTransform = require("./PaymentTransform");

paymentTransform(
  "./input/client-payment.csv",
  "./output/normalized-payments.csv",
);
