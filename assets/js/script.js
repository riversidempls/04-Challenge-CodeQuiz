var timeLeft = 60;
var questionIndex = 0;
var score = 0;
var mostRecentAnswer;



var highScores = [];

var questions = [
    {
      question: "In 1995 JavaScript was born as:",
      answer: "Livescript",
      options: ["AOL", "Netscape Navigator", "Livescript", "Coffee Bean Code"],
    },
    {
      question: "Which of these is NOT a primitive data type:",
      answer: "RegEx",
      options: ["RegEx", "null", "Symbol", "Boolean"],
    },
    {
      question: "A family tree style representation of a web page is also known as _______.",
      answer: "the DOM",
      options: [
        "branching syntax",
        "Git Spray",
        "the DOM",
        "console.log",
      ],
    },
  
    {
      question:
        "A type of variable that is a collection of data is known as:",
      answer: "Basic Array",
      options: ["Collection Set", "Scope Group", "Basic Array", "Hamburger Helper"],
    },
  
    {
      question:
        "A comparison operator that resolves to true if either item is true is:",
      answer: "b||c",
      options: ["b!=c", "b===c", "b<or>c", "b||c"],
    },
  ];
  
  //Display questions in sequence

var createQuestion = function (questionData) {
  console.log(questionData);
  var question = document.createElement("h1");
  var questionText = document.createTextNode(questionData.question);
  question.style.textAlign = "center";
  question.className = "body";
  question.appendChild(questionText);

  //Create list of possible answers
  var optionsElementList = document.createElement("div");
  optionsElementList.className = "btn-grid";
  questionData.options.forEach((element) => {
    console.log(element);
    var buttonEl = document.createElement("button");
    buttonEl.className = "option-btn general-btn";
    buttonEl.textContent = element;
    //add event listener to check answer on button element click
    buttonEl.addEventListener("click", () =>
      checkAnswer(questionData.answer, element)
    );
    optionsElementList.appendChild(buttonEl);
  });
  var mostRecentAnswerElement = document.createElement("div");
  mostRecentAnswerElement.textContent = mostRecentAnswer;
  question.appendChild(optionsElementList);
  question.appendChild(mostRecentAnswerElement);
  return question;
};

//Create function to check answers and advance to next
var checkAnswer = function (answer, selectedOption) {

  if (answer !== selectedOption) {
    answeredIncorrectly();

    mostRecentAnswer = "Wrong!";
  }
  if (answer === selectedOption) {
    mostRecentAnswer = "Correct!";
  }
  if (questionIndex < questions.length - 1) {
    questionIndex++;
    nextQuestion();
  } else {
    endQuiz();
  }
};

var nextQuestion = function () {
  var mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";
  mainContent.appendChild(createQuestion(questions[questionIndex]));
};

var startQuizHandler = function startQuiz() {
  var mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";
  mainContent.appendChild(createQuestion(questions[questionIndex]));
  countdown();
};

var timerEl = document.getElementById("timer");
var timeInterval;

function countdown() {
  score = timeLeft;

  // create a timer function to be executed every 1000 milliseconds
  timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else {
      endQuiz();
    }
  }, 1000);
}

// function to end quiz
var gameOver = function () {
  var gameOverContainer = document.createElement("div");
  var gameOverBanner = document.createElement("h1");
  gameOverBanner.textContent = "";
  var gameOverScoreLabel = document.createElement("div");
  gameOverScoreLabel.textContent = "Your score is: " + timeLeft;
  var gameOverInitials = document.createElement("span");
  gameOverInitials.textContent = "Enter initials:  ";
  var gameOverInput = document.createElement("input");
  gameOverInput.id = "initial-input";
  var gameOverButton = document.createElement("button");
  gameOverButton.textContent = "submit";
  gameOverButton.addEventListener("click", goToHighScore);
  gameOverInitials.append(gameOverInput, gameOverButton);
  gameOverContainer.append(gameOverBanner, gameOverScoreLabel, gameOverInitials);
  return gameOverContainer;
};

var createHighScore = function () {
  var highScore = document.createElement("h1");
  highScore.textContent = "High Scores";
  var displayHighScore = document.createElement("div");
  displayHighScore.className = "high-score-container";
  highScores.forEach((element) => {
    var initialsLabel = document.createElement("span");
    initialsLabel.textContent = element.initials + " - " + element.score;
    displayHighScore.appendChild(initialsLabel);
  });
  var clearHighscoresButton = document.createElement("button");
  clearHighscoresButton.textContent = "Clear scores";
  clearHighscoresButton.onclick = clearHighScores;
  var returnButton = document.createElement("button");
  returnButton.textContent = "Try Again";
  returnButton.onclick = function () {
    console.log("return clicked");
    window.parent.location = "index.html";
  };

  highScore.appendChild(displayHighScore);
  highScore.appendChild(returnButton);
  highScore.appendChild(clearHighscoresButton);
  return highScore;
};

var clearHighScores = function () {
  highScores = [];
  saveHighScoreData();

  viewHighScores();
};
var viewHighScores = function () {
  var mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";
  console.log("viweing high scores");
  mainContent.appendChild(createHighScore());
};
var saveHighScore = function () {
  //get input and get initials from input
  //save high score
  var inputElement = document.getElementById("initial-input");
  var newHighScore = {
    initials: inputElement.value,
    score: timeLeft,
  };
  highScores.push(newHighScore);
  saveHighScoreData();
};

//Save Score to local storage
var saveHighScoreData = function () {
    localStorage.setItem("highscores", JSON.stringify(highScores));
  };

//Load score from local storage
var loadHighScoreData = function () {
  highScores = JSON.parse(localStorage.getItem("highscores") || "[]");
};



var goToHighScore = function () {
  saveHighScore();
  var mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";

  mainContent.appendChild(createHighScore());
};

function endQuiz() {
  timerEl.textContent = timeLeft;
  clearInterval(timeInterval);
  var mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";

  mainContent.appendChild(gameOver());
  console.log(mainContent);
}
//if answer is incorrect, remove 5 seconds
function answeredIncorrectly() {
  timeLeft -= 5;
}

//answ
var startButton = document.querySelector("#start-button");
startButton.addEventListener("click", startQuizHandler);
loadHighScoreData();


var viewHighScoresElement = document.getElementById("high-scores");

viewHighScoresElement.addEventListener("click", viewHighScores);