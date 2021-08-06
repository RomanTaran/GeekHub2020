const cors = require("cors");
const movies = require("./routes/movies");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const {resolve} = require("path")

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(resolve(__dirname, 'build')));
app.use("/api", movies);

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, "index.html"));
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect("mongodb://localhost/nn-testtask-db", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true})
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
