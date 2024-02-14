const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cors = require("cors");
const routes = require("./routes/route")


const app = express();
require('dotenv').config()

app.use(
    cors({
      origin: "*",
      optionsSuccessStatus: 200,
    })
  );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Define Routes
app.use("/api", routes);

// Start the server
const port = process.env.PORT || 8000;
connectDB();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
