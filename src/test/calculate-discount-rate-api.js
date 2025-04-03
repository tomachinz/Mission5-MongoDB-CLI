const express = require("express");
const cors = require("cors");

const calculateDiscountRate = require("./calculate-discount-rate");

const app = express();
const port = 3004;

app.use(express.json());
app.use(cors());

app.get("/calculate-discount-rate", (req, res) => {
  res.send(calculateDiscountRate());
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
