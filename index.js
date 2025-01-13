const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const web_services = require('./routes/web_services');

/** set router */
// const { sequelize } = require("./connection");

// sequelize
//   .authenticate()
//   .then((db) => {
//     console.log("CONNECTION ESTABLISHED! ");
//   })
//   .catch((err) => {
//     console.error("UNABLE TO ESTABLISH CONNECTION: ", err);
//   });

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: false }));
/** set path */
app.use("/web_services", web_services);

app.get("/", (req, res) => {
  res.send("Web Services Running");
});

app.listen(port, () => {
  console.log(`web Services listening at http://localhost:${port}`);
});
