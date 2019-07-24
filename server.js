const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const item = require("./item");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use("/item", item);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));