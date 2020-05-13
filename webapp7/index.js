const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

mongoose.connect("mongodb://localhost/beast-db", 
{
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

app.use('/img', express.static('img'));
app.use(bodyParser.json());
app.use("/api",require("./api"));

app.listen(8888, ()=>{
    console.log("Server started");
});

