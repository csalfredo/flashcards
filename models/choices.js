let mongoose = require("mongoose");

//TODO: SCHEMA SETUP
let choicesSchema = new mongoose.Schema({
    question: String,
    choice1: String,
    choice2: String,
    choice3: String,
    choice4: String
});

//TODO: Compiled schema into a model

module.exports = mongoose.model("Choices", choicesSchema);