var header = document.querySelector(".header");
var score = document.getElementById("score");
var submitBtn = document.getElementById("submitBtn");
var questionHeader = document.getElementById("questionHeader");
var option1 = document.getElementById("one");
var option2 = document.getElementById("two");
var option3 = document.getElementById("three");
var option4 = document.getElementById("four");
var correct = document.getElementById("correct");
var response = document.getElementById("response");
var yourFinalScore = document.getElementById("yourFinalScore");
var quizQuestions = document.getElementById("quizQuestions");
var start = document.getElementById("start");
var finalScore = document.getElementById("finalScore");
var highScoreBtn = document.getElementById("highScoreBtn");
var initialBtn = document.getElementById("initialBtn");
var initials = document.getElementById("initials");
var initialInput = document.getElementById("initialInput");
var done = document.getElementById("done");
var doneBtn = document.getElementById("form-inline");
var timer = document.getElementById("timer");
var questions = [
    {
        "questionHeader": "Who stared as The Man with No Name in the Spaghetti Westerns movies?",
        "one": "1. Clint Eastwood",
        "two": "2. John Wayne",
        "three": "3. Charles Bronson",
        "four": "4. Kurt Russell",
        "correct": "1. Clint Eastwood"
    },
    {
        "questionHeader": "What movie is about the famous Wyatt Earp?",
        "one": "1. Gremlins",
        "two": "2. Tombstone",
        "three": "3. Wyatt Earp",
        "four": "4. Wichita",
        "correct": "2. Tombstone"
    },
    {
        "questionHeader": "Who wrote the famous score for The Good, The Bad and The Ugly?",
        "one": "1. Elmer Bernstein",
        "two": "2. Henry Mancini",
        "three": "3. Ennio Morricone",
        "four": "4. John Williams",
        "correct": "3. Ennio Morricone"
    },
    {
        "questionHeader": "Which 2008 western starred Ed Harris and Viggo Mortensen?",
        "one": "1. True Grit",
        "two": "2. 3:10 to Yuma",
        "three": "3. Bone Tomahawk",
        "four": "4. Appaloosa",
        "correct": "4. Appaloosa"
    }
]

var startScore = 0;
var questionIndex = 0;

function theQuestions() {
    start.style.display = "block";
    header.style.display = "block";
    quizQuestions.style.display = "none";
    finalScore.style.display = "none";

    var startScore = 0;
    timer.textContent = "Time: " + startScore;
}

function reset() {
    startScore = 0;
    questionIndex = 0;
}

function startQuiz() {
    start.style.display = "none";
    quizQuestions.style.display = "block";

    secondsLeft = 60;

    var timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = "Time: " + secondsLeft;
        if (secondsLeft === 0 || questions.length === questionIndex) {
            clearInterval(timerInterval);
            showFinalScore();
        }
    }, 1000);
}

function showQuestions() {
    var question = questions[questionIndex];

    questionHeader.innerHTML = question.questionHeader;
    option1.innerHTML = question.one;
    option1.setAttribute("data-answer", question.one);
    option2.innerHTML = question.two;
    option2.setAttribute("data-answer", question.two);
    option3.innerHTML = question.three;
    option3.setAttribute("data-answer", question.three);
    option4.innerHTML = question.four;
    option4.setAttribute("data-answer", question.four);
}

showQuestions();
option1.addEventListener("click", function (event) {
    checkIt(event);
})
option2.addEventListener("click", function (event) {
    checkIt(event);
})
option3.addEventListener("click", function (event) {
    checkIt(event);
})
option4.addEventListener("click", function (event) {
    checkIt(event);
})

function checkIt(event) {
    event.preventDefault();

    var answer = event.currentTarget.dataset.answer;
    var correct = null;

    if (questions[questionIndex].correct === answer) {
        correct = answer;
    }
    if (answer === correct) {
        response.textContent = "Yeppers. Got this one right!";
    } else {
        response.textContent = "Nope.  That's just WRONG.";
        secondsLeft -= 10
        if (secondsLeft < 0) {
            secondsLeft = 0;
        }
    }
    if (quizQuestions.length === questionIndex + 1) {
        showFinalScore();
        return;
    }
    questionIndex++;
    showQuestions();
}

function showFinalScore() {
    quizQuestions.style.display = "none";
    highScoreBtn.style.display = "none";
    finalScore.style.display = "block";
    yourFinalScore.style.display = "block"
    initials.style.display = "block"
    initialBtn.style.display = "block"
    initialInput.style.display = "block"

    yourFinalScore.textContent = "Your final score is " + secondsLeft;
    initialBtn.textContent = "Submit";
    initials.textContent = "Enter Your Initials: ";
}

var highScoreArray = []

function showHighScores() {
    header.style.display = "none";
    done.style.display = "none";
    yourFinalScore.style.display = "none"
    initials.style.display = "none"
    initialBtn.style.display = "none"
    initialInput.style.display = "none"
    highScoreButton.style.display = "block";

    var getInitials = document.getElementById("initialInput").value;

    var highScoreArray = JSON.parse(localStorage.getItem("highScore")) || [];

    var localStorageArray = {
        score: secondsLeft,
        initials: getInitials
    };
    highScoreArray.push(localStorageArray)
    localStorage.setItem("highScore", JSON.stringify(highScoreArray));

    var highScores = getInitials + ": " + secondsLeft;

    $("#highScoreList").append(highScores)
}

// Hey LISTEN

submitBtn.addEventListener("click", function () {
    startQuiz()
    console.log("start")
})

score.addEventListener("click", function () {
    showHighScores();
    console.log("view high scores")
})

initialBtn.addEventListener("click", function () {
    showHighScores();
    console.log("initial button")
})

clearHighScore.addEventListener("click", function () {
    localStorage.clear();
})

startOver.addEventListener("click", function () {
    $("#highScoreList").empty()
    $("#initialInput").val("")
    reset()
    theQuestions();
})

theQuestions();