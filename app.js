let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require('mongoose');
let methodOverride = require('method-override');
let Quiz3 = require("./models/quiz");
let Choice = require("./models/choices");


// let seedDB = require("./seeds");TODO: this line of code will change 

app.use(express.static(__dirname + "/public"));//!NOTE:Here we are connecting the css file and index.js to this project.
app.use(methodOverride("_method"));//!NOTE: this give the user the ability to use method-override


// seedDB();

mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost:27017/quiz5_app', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// let carSchema = new mongoose.Schema({
//     carModel: String,
//     Year: String,
//     Sport: String


// });

// let Cars = mongoose.model("Cars", carSchema);

// let cheville = new Cars({
//     carModel: "Cheville",
//     Year: "1969",
//     Sport: "Super Sport"
// });

// cheville.save(function(err, car){
//     if (err) {
//         console.log("something went wrong");
//     }
//     else{
//         console.log("WE JUST SAVE CHEVILLE IN T HE DB");
//         console.log(car);
//     }
// });

//!create will add new item and save all at once
// Cars.create({
//     carModel: "Mustang",
//     Year: "1965",
//     Sport: "Cobra Sport"
// }, function(err, car){
//     if (err) {
//         console.log(err);
//     }
//     else{
//         console.log(car)
//     }
// });

// Cars.find({}, function(err, cars){
//     if (err) {
//         console.log("HO NO, ERROR!");
//         console.log(err);
//     }
//     else{
//         console.log("All The CARS......");
//         console.log(cars);
//     }
// });

// let quizSchema = new mongoose.Schema({
//     topic: String,
//     questions: String,
//     Answer: String
// });

// let Topic = mongoose.model("Quiz2", quizSchema);


// Topic.create({
//     topic: "Math",
//     questions: "Is Calculus hard?",
//     Answer: "No"
// }, function(err, topic){
//     if (err) {
//         console.log(err);
//     }
//     else{
//         console.log(topic);
//     }
// });

app.get("/", function(request, resolve){

    // resolve.render("landing");
    
    resolve.render("mainLanding");
});

// //*INDEX-show all the existing quiz
app.get("/quiz", function(request, resolve){


    Quiz3.find({}, function(err,allTopics){
        if (err) {
            console.log(err);
        }
        else{
                console.log("Testing...." + allTopics.topic);
        
            resolve.render("setupQuiz/quiz",{currentTopic:allTopics});
        }
    });

});

app.post("/quiz",function(request,resolve){
   
    let topic = request.body.topic;
    let currentTopic = {topic:topic};

    console.log("im here..." + currentTopic.topic);
    console.log("im displaying choices from DB..." + currentTopic.choices);

        Quiz3.create(currentTopic, function(err, newTopic){
        if (err) {
            console.log(err);
        }
        else{
            resolve.redirect("/quiz");
        }
    });
});

app.get("/quiz/questions",function(request, resolve){
    Quiz3.find({}, function(err, allTopics){
        if (err) {
         console.log(err);   
        }
        else{
            console.log("allTopics are " + allTopics);
            resolve.render("setupQuiz/insertQuestions",{topics:allTopics});
        }
    }); 
    
});

//TODO: display all existing quiz
app.get("/quiz/existingQuiz", function(request, resolve){
    //Get all quiz from DB
    Quiz3.find({}, function(err, allQuiz){
        if (err) {
            console.log(err);
        } else {
            resolve.render("setupQuiz/updateQuiz", {topics:allQuiz});
        }
    });
});

//TODO: choose quiz
app.get("/quiz/chooseQuiz", function(request, resolve){
    //Get all quiz from DB
    Quiz3.find({}, function(err, allQuiz){
        if (err) {
            console.log(err);
        } else {
            resolve.render("setupQuiz/chooseQuiz", {topics:allQuiz});
        }
    });
});

//TODO: Quiz in progress
app.get("/quiz/:id/progress", function(request, resolve){


        //TODO: find Quiz by id
        Quiz3.findById(request.params.id).populate("choices").exec(function(err, currentQuiz){
            if (err) {
                console.log(err);
            }
            else{
                resolve.render("setupQuiz/quizProgress", { q: currentQuiz});
            }
        })
});

//TODO: REMOVE TOPIC
app.delete("/quiz/:id", function(request, resolve){
    Quiz3.findByIdAndRemove(request.params.id, function(err){
        if (err) {
            console.log(err);
            resolve.redirect("/quiz");
        }
        else{
            resolve.redirect("/quiz/existingQuiz");
        }
    });

});

//TODO: show more info about one topic
app.get("/quiz/:id", function(request, resolve){

    Quiz3.findById(request.params.id, function(err,allTopics){
        if (err) {
            console.log("Error---" + err);
            resolve.redirect("/quiz")
        }
        else{
                console.log("Insertng Questions page...." + allTopics);

                resolve.render("setupQuiz/insertQuestions",{topic:allTopics});
        }
    });

});

// //*CREATE-add new Topic to DB
// //* */ Here the post allows the user to create a Topic player
// app.post("/quiz", function(request, resolve){
//     resolve.send("You hit the post route");

//     let Topic = request.body.topic;

//     let newTopic = {Topic:Topic};
   
//     console.log("Topic is " + newTopic);

//     Quiz.create(newTopic, function(err, newlyTopic){
//         if (err) {
//          console.log(err);   
//         }
//         else{
//             resolve.render("/quiz/questions");
//         }
//     }); 
// });

// //*SHOW-shows more info about one Topic
app.get("/quiz/:id", function(request, resolve){
    //find the player with provided ID
    //render show template with that player
    //TODO: this is how you get the id ----> request.params.id
    Quiz3.findById(request.params.id, function(err, currentTopic){
        if (err) {
            console.log(err);
        }
        else{
            console.log("found the topic......." + currentTopic)
            resolve.render("setupQuiz/insertQuestions", {topic:currentTopic});
        }
    });
});

//****QUESTIONS NESTED ROUTES *******//
app.post("/quiz/:id", function(request, resolve){
    let question = request.body.question;
    let choice1 = request.body.choice1;
    let choice2 = request.body.choice2;
    let choice3 = request.body.choice3;
    let choice4 = request.body.choice4;

    //let newPlayer = {name: name, image: image, description: desc};
    let newQuestion = {question: question};
    let newCard = {question: question, choice1: choice1, choice2: choice2, choice3: choice3, choice4: choice4};

    console.log("im here inserting questions into DB...");

    Quiz3.findById(request.params.id, function(err, quiz){
        if (err) {
            console.log(err);
        }
        else{
            console.log(request.body.choice);

            Choice.create(request.body.choice,function(err,currentChoice){
                if (err) {
                    console.log(err);
                }
                else{
                    console.log(currentChoice);

                    quiz.choices.push(currentChoice);
                    quiz.save();
                    resolve.redirect("/quiz/"+ quiz._id);
                }
            })
        

        }
    });

});


app.listen(8080, function(){
    console.log("Here is the Quiz Website");
});