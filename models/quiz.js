let mongoose = require("mongoose");

//TODO: SCHEMA SETUP   
let quizTopicsSchema = new mongoose.Schema({
    topic: String,
    choices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Choices'
        }
    ],

    counter: Number

});

//TODO: Compiled schema into a model
module.exports = mongoose.model("Quiz", quizTopicsSchema);