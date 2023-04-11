const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
const dbo = require("./db/conn");

app.get("/fiverr", (req, res) => {
  res.send("Hello Fiverr!");
});

app.listen(3000, () => console.log("Server is running on port 3000"));
