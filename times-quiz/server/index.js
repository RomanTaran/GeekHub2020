const timesText = require("./routes/timesText");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const {resolve} = require("path");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(resolve(__dirname, 'build')));
app.use("/api", timesText);


app.get('/', (req, res) => {
    res.sendFile(resolve(__dirname, "index.html"));
})

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port: ${port}...`);
});

mongoose
    .connect("mongodb://localhost/text-times-db")
    .then(() => console.log("MongoDB connection established..."))
    .catch((error) => console.error("MongoDB connection failed:", error.message));
