//JavaScript for The Trivia Game
	var secondsRemaining=10;
	var correctGuesses=0;
	var incorrectGuesses=0;
	var unanswered=0;
	var currentQuestion=0;
	var answerTimeout;
	var launchSound = new Audio("http://www.wavsource.com/snds_2018-01-14_3453803176249356/movies/monty_python_hg/holy_grail_music.wav");
	var incorrectSound = new Audio("http://www.wavsource.com/snds_2018-01-14_3453803176249356/movies/monty_python_hg/nih2.wav");
	var correctSound = new Audio("http://www.wavsource.com/snds_2018-01-14_3453803176249356/movies/monty_python_hg/so_be_it.wav");
	var mouseClick = new Audio("http://www.kalmanovitz.co.il/courses/English/construction/Assets/Mousclik.wav");

	var questions=[["Stop! WHAT is your name?"],["What is your favorite color?"],["What is your quest?"]];
	var answers=[["Sir Gawain","It is Arthur, King of the Britons!","Sir Lancelot", "Fred"],["Red","Green","Blue","Orange"],["To find Camelot","To obtain a shrubbery","To save Guinevere","We seek the Holy Grail"]];
	var correctAnswers=[["B. It is Arthur, King of the Britons!"],["C. Blue"],["D. We seek the Holy Grail"]];

	function startScreen() {
		currentQuestion=0;
		firstScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
		$("#body").html(firstScreen);
	}

	function displayCorrectAnswer() {
		answerScreen = "<p class='answerDisplay'>You are correct! <br>" + correctAnswers[currentQuestion] + "</p>";
		console.log(answerScreen);
		$("#body").html(answerScreen);
	}

	function displayIncorrectAnswer() {
		answerScreen = "<p class='answerDisplay'>Incorrect! The correct answer is: <br>" + correctAnswers[currentQuestion] + "</p>";
		console.log(answerScreen);
		$("#body").html(answerScreen);
	}
	function displayTimeoutAnswer() {
		answerScreen = "<p class='answerDisplay'>Time Out! The correct answer is: <br>" + correctAnswers[currentQuestion] + "</p>";
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
		displayHTML = "<p class='text-center'>" + questions[currentQuestion] + "</p><p class='first-answer answer'>A. " + answers[currentQuestion][0] + "</p><p class='answer'>B. " + answers[currentQuestion][1] + "</p><p class='answer'>C. " + answers[currentQuestion][2] + "</p><p class='answer'>D. " + answers[currentQuestion][3] + "</p>";
		$("#body").html(displayHTML);
		startAnswerCountdown();
		console.log("Current Question: " + currentQuestion)
}
	//display the final results
	function resultsScreen() {
		console.log("Display Results Screen?")
		currentQuestion=0;
		results = "<p class='results'>Correct Guesses: " + correctGuesses + "</p><p class='results'>Incorrect Guesses: " + incorrectGuesses + "</p><p class='results'>Unanswered: " + unanswered + "</p><p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Play Again</a></p>";
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

	//when click on start-button, also works on reset
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
		}
		else {
			incorrectAnswer();
		}
	}); // end answer click