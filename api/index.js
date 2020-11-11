const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require("./controller/itemController")(app);
require("./controller/UserController")(app);

app.listen(process.env.PORT || 4000, () =>
  console.log(`server listening at port ${process.env.PORT || 4000}`)
);
