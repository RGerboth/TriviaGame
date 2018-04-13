//JavaScript for The Trivia Game
let secondsRemaining = 10;
let correctGuesses = 0;
let incorrectGuesses = 0;
let unanswered = 0;
let currentQuestion = 0;
let answerTimeout = "";
const launchSound = new Audio("http://www.wavsource.com/snds_2018-01-14_3453803176249356/movies/monty_python_hg/holy_grail_music.wav");
const incorrectSound = new Audio("http://www.wavsource.com/snds_2018-01-14_3453803176249356/movies/monty_python_hg/nih2.wav");
const correctSound = new Audio("http://www.wavsource.com/snds_2018-01-14_3453803176249356/movies/monty_python_hg/so_be_it.wav");
const mouseClick = new Audio("http://www.kalmanovitz.co.il/courses/English/construction/Assets/Mousclik.wav");

const questions=[
["Stop! WHAT is your name?"],
["What is your favorite color?"],
["What is your quest?"],
["What is the captol of Assyria?"],
["What is the airspeed velocity of a unlaiden swallow?"]
];

const answers=[
["Sir Gawain","It is Arthur, King of the Britons!","Sir Lancelot", "Fred"],
["Red","Green","Blue","Orange"],
["To find Camelot","To obtain a shrubbery","To save Guinevere","To seek the Holy Grail"],
["Assur","Neneveh","Babylon","Sumer"],
["African, or European?", "25 miles per hour", "I don't know that!", "35 miles per hour"]
];

const correctAnswers=[
["B. It is Arthur, King of the Britons!"],
["C. Blue"],
["D. To seek the Holy Grail"],
["A. Assur"],
["A. African, or European?"]
];

function startScreen() {
	currentQuestion=0;
	firstScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
	$("#body").html(firstScreen);
}

function displayCorrectAnswer() {
	answerScreen = "<p class='answerDisplay'>You are correct! <br>" + correctAnswers[currentQuestion] + "</p><img src='assets/images/SoBeIt.gif' alt='So be it!'</img>";
	console.log(answerScreen);
	$("#body").html(answerScreen);
}

function displayIncorrectAnswer() {
	answerScreen = "<p class='answerDisplay'>Incorrect! The correct answer is: <br>" + correctAnswers[currentQuestion] + "</p><img src='assets/images/RunAway.gif' alt='Run away!'</img>";
	console.log(answerScreen);
	$("#body").html(answerScreen);
}
function displayTimeoutAnswer() {
  answerScreen = "<p class='answerDisplay'>Time Out! The correct answer is: <br>" + correctAnswers[currentQuestion] + "</p><img src='assets/images/wrongAnswer.gif' alt='dreaded black beast'</img>";
  console.log(answerScreen);
  $("#body").html(answerScreen);
}
//display startup screen
startScreen();

function answerSecondsCountdown() {
  secondsRemaining--;
  console.log("Answer Countdown: " + secondsRemaining)
  $("#timeRemaining").text("Time Remaining: " + secondsRemaining);
}

//display a quesion
function displayQuestion() {
  displayHTML = "<p class='text-center question'>" + questions[currentQuestion] + "</p><button class='first-answer answer'>A. " + answers[currentQuestion][0] + "</button><button class='answer'>B. " + answers[currentQuestion][1] + "</button><button class='answer'>C. " + answers[currentQuestion][2] + "</button><button class='answer'>D. " + answers[currentQuestion][3] + "</button>";
  $("#body").html(displayHTML);
  startAnswerCountdown();
  console.log("Current Question: " + currentQuestion)
}

//display the final results
function resultsScreen() {
  console.log("Display Results Screen?")
  currentQuestion=0;
  results = "<p class='results'>Correct Answers: " + correctGuesses + "</p><p class='results'>Incorrect Answers: " + incorrectGuesses + "</p><p class='results'>Unanswered: " + unanswered + "</p><p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Play Again</a></p>";
  console.log(results);
  $("#body").html(results);
}

function correctAnswer() {
  displayCorrectAnswer();
  correctSound.play();
  correctGuesses++;
  setTimeout(nextQuestion, 5000)
}

function incorrectAnswer() {
  displayIncorrectAnswer();
  incorrectSound.play();
  incorrectGuesses++;
  setTimeout(nextQuestion, 5000)
}

function timeout() {
  displayTimeoutAnswer();
  incorrectSound.play();
  unanswered++;
  setTimeout(nextQuestion, 5000)
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    displayQuestion();
	console.log("Game Continues")
  } else {
    resultsScreen();
  }
}

//function to present the question and start the answer countdown; 
//10 seconds then stops clock
function startAnswerCountdown() {
  clearInterval(answerTimeout);
  //set the question countdown timer
  secondsRemaining  = 10;
  $("#timeRemaining").text("Time Remaining: " + secondsRemaining);
  answerTimeout = setInterval(function() {
    answerSecondsCountdown();
    if (secondsRemaining === 0) {
      clearInterval(answerTimeout);
      timeout();
    }
  }, 1000);
}

//when click on start and reset
$("body").on("click", ".start-button", function(event){
  launchSound.play();
  correctGuesses=0;
  incorrectGuesses=0;
  unanswered=0;
  currentQuestion=0;
  displayQuestion();
});

//when answer is clicked
$("body").on("click", ".answer", function(event){
  mouseClick.play();
  clearInterval(answerTimeout);
  playerAnswer = $(this).text();
  if(playerAnswer == correctAnswers[currentQuestion]) {
    correctAnswer();
  } else {
    incorrectAnswer();
  }
}); // end answer click
