const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const beastSchema = new Schema({
    name: String,
    food: String,
    class: String,
    ID: String,
    image: String,
    value: Number
});

const beast = mongoose.model("beast",beastSchema);

module.exports = beast;