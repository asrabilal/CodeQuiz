
//Question Array with title, choices,anwers//
var questions = [{
    title: "String values must be enclosed within __________ when being assigned to variables?",
    choices: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes"
},
{
    title: "Arrays in JavaScript can be used to store __________ ?",
    choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
},
{
    title: "The condition in an if / else statement is enclosed with __________ ?",
    choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "parenthesis"
},
{
    title: "Commonly used data types DO Not Include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
},
{
    title: "A very useful tool used during developments and debugging for printing content to the debugger is:",
    choices: ["JavaScripts", "terminal/bash", "for loops", "console.log"],
    answer: "console.log"
}
]


//variables for the functions,scores and timers.. //
var score = 0;
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//Function to start timer//
function start() {

timeLeft = 75;
document.getElementById("timeLeft").innerHTML = timeLeft;

timer = setInterval(function() {
    timeLeft--;
    document.getElementById("timeLeft").innerHTML = timeLeft;
   
    //When time run out to 0 Quiz is over//
    if (timeLeft <= 0) {
        clearInterval(timer);
        endGame(); 
    }
}, 1000);

next();
}

//  Clearing timer //
function endGame() {
clearInterval(timer);

var quizContent = `
<h2>Quiz Time Over</h2>
<h3>You got a ` + score +  ` /100</h3>
<h3>That means you got ` + score / 20 +  ` questions correct</h3>
<input type="text" id="name" placeholder="First name"> 
<button onclick="setScore()">Submit</button>`;

document.getElementById("mainquizbody").innerHTML = quizContent;
}

// local storage for Scores value//
function setScore() {
localStorage.setItem("highscore", score);
localStorage.setItem("highscoreName",  document.getElementById('name').value);
getScore();
}

// Printing user name & score //
function getScore() {
var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score</button><button onclick="resetGame()">Go Back</button>`;

document.getElementById("mainquizbody").innerHTML = quizContent;
}

//Clear Score and User Name which is stored in local storage//
function clearScore() {
localStorage.setItem("highscore", "");
localStorage.setItem("highscoreName",  "");

resetGame();
}

//Reset function//
function resetGame() {
clearInterval(timer);
score = 0;
currentQuestion = -1;
timeLeft = 0;
timer = null;

document.getElementById("timeLeft").innerHTML = timeLeft;

var quizContent = `
<h1> Code Quiz </h1>
<button onclick="start()">Start</button>`;

document.getElementById("mainquizbody").innerHTML = quizContent;
}

//Timer if user chooses an incorrect answer (subtract 15)
function incorrect() {
timeLeft -= 15; 
next();
}

//Timer if the user chooses the correct answer (addition 20)
function correct() {
score += 20;
next();
}

//loops through the questions 
function next() {
currentQuestion++;

if (currentQuestion > questions.length - 1) {
    endGame();
    return;
}

var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"

for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = "<button onclick=\"[ANS]\">[CHOICE]</button>"; 
    buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
    if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
        buttonCode = buttonCode.replace("[ANS]", "correct()"); 
    } 
    else {
        buttonCode = buttonCode.replace("[ANS]", "incorrect()"); 
    }
    quizContent += buttonCode
}



document.getElementById("mainquizbody").innerHTML = quizContent;
}