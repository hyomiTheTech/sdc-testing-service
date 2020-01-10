const express = require("express");
// const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
// const controller = require("./controller");
const morgan = require("morgan");
const router = require("./router");

const app = express();
const port = process.env.PORT || 3004;

// app.use(cors());
// app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening on port -> ${port} <-`);
});
