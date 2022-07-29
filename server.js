const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.use(express.static("public"));

app.listen(PORT, console.log("Server started at PORT ", PORT));
