const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
require("./controller/itemController")(app);
require("./controller/UserController")(app);
require("./controller/CatalogController")(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(process.env.PORT || 4000, () =>
  console.log(`server listening at port ${process.env.PORT || 4000}`)
);
