const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;
app.use(cors());

app.use(express.json());

// Connecting to MongoDB database
mongoose.connect("mongodb://0.0.0.0/emsDb");
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.use("/", require("./routes/employeeRouter"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
