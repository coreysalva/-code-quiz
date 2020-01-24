$(document).ready(function () {

    var counter = 60;
    var interval;
    var numCorrect = 0;
    var highScore = 0;
    var questions = [
        {
            prompt: "What is my fav color?",
            optionA: "Purple",
            optionB: "Blue",
            optionC: "Red",
            optionD: "Green",
            correct: "A"
        },
        {
            prompt: "What is my fav food?",
            optionA: "Pizza",
            optionB: "Buffalo wings",
            optionC: "Burgers",
            optionD: "French Fries",
            correct: "B"
        },
        {
            prompt: "What is my fav show?",
            optionA: "GoT",
            optionB: "Zim",
            optionC: "Sponge",
            optionD: "Avatar",
            correct: "A"
        },
        {
            prompt: "What is my fav game?",
            optionA: "CoD",
            optionB: "LoL",
            optionC: "Melee",
            optionD: "Halo",
            correct: "C"
        },
        {
            prompt: "What is my fav phone?",
            optionA: "Android",
            optionB: "Windows",
            optionC: "Blackberry",
            optionD: "iPhone",
            correct: "D"
        },
        {
            prompt: "What is my fav hat?",
            optionA: "beanie",
            optionB: "fedora",
            optionC: "snapback",
            optionD: "yamaca",
            correct: "A"
        },
        {
            prompt: "What is my fav animal?",
            optionA: "Goose",
            optionB: "Rhino",
            optionC: "Pug",
            optionD: "Mouse",
            correct: "C"
        },
        {
            prompt: "What is my fav color?",
            optionA: "Purple",
            optionB: "Blue",
            optionC: "Red",
            optionD: "Green",
            correct: "A"
        },
        {
            prompt: "What is my fav color?",
            optionA: "Purple",
            optionB: "Blue",
            optionC: "Red",
            optionD: "Green",
            correct: "A"
        },
        {
            prompt: "What is my fav color?",
            optionA: "Purple",
            optionB: "Blue",
            optionC: "Red",
            optionD: "Green",
            correct: "A"
        }
    ];
    var questionsHolder = [];

    function timePenalty() {
        if (counter < 10) {
            counter = 1;
            $('#gameTimer').text("Time left: 0");
        }
        else {
            counter = (counter - 10);
            $('#gameTimer').text("Time left: " + counter);
        }
    };

    //Populate question block
    function fillQuestion(x) {
        currQuestion = Math.floor((Math.random() * questions.length));
        $("#current-question").html(questions[currQuestion].prompt);
        $("#choice-a").html(questions[currQuestion].optionA);
        $("#choice-b").html(questions[currQuestion].optionB);
        $("#choice-c").html(questions[currQuestion].optionC);
        $("#choice-d").html(questions[currQuestion].optionD);
        currCorrectAnswer = questions[currQuestion].correct;


        if (questions.length != 10) {
            if (x) {
                $("#last-answer").html("Correct!");
            }
            else {
                $("#last-answer").html("Incorrect!");
            }

        }

        return currQuestion;
    }

    function checkHighScore() {
        if ((localStorage.getItem("highScore" + localStorage.length) > highScore) || localStorage.length == 0) {
            highScore = numCorrect;
            return true;
        }
        else {
            return false;
        }

    }

    function clearScreen() {
        console.log($("#welcome-screen"));
        $("#last-answer").html("");

        $("#question-box").removeClass('d-block');
        $("#question-box").removeClass('d-block');
        $("#question-box").addClass('d-none');
        $("#high-scores").removeClass('d-block');
        $("#high-scores").removeClass('d-block');
        $("#high-scores").addClass('d-none');
        $("#game-over").removeClass('d-block');
        $("#game-over").removeClass('d-block');
        $("#game-over").addClass('d-none');
        $("#high-score-list").removeClass('d-block');
        $("#high-score-list").removeClass('d-block');
        $("#high-score-list").addClass('d-none');
        $("#welcome-screen").removeClass('d-block');
        $("#welcome-screen").removeClass('d-block');
        $("#welcome-screen").addClass('d-none');
    }

    function gameOver() {
        //Stop timer
        clearInterval(interval);

        clearScreen();
        if (checkHighScore()) {
            $("#high-scores").addClass('d-block');
            $("#high-scores").removeClass('d-none');
            console.log("Game over, you got " + numCorrect + " answers correct out of 10, that's a new high score!");

        }
        else {
            $("#game-over").addClass('d-block');
            $("#game-over").removeClass('d-none');
            console.log("Game over, you got " + numCorrect + " answers correct out of 10.");
        }

        console.log(questionsHolder);
        questions = questionsHolder;
        return questions;
    }

    function displayScores() {
        clearScreen();
        $("#high-score-list").addClass('d-block');
        $("#high-score-list").removeClass('d-none');
        for (var i = 0; i <= localStorage.length; i++) {
            var newScore = $('<li>');
            newScore.addClass("list-group-item");
            newScore.text(JSON.parse(localStorage.getItem("highScore" + i)));
            $(".list-group").append(newScore);

        }
    }

    //Process submitting an answer
    $(".ques-btn").click(function () {
        var answer = false;
        if (currCorrectAnswer === this.value) {
            console.log("correct");
            numCorrect++;
            answer = true;
        }
        else {
            console.log("wrong");
            timePenalty();
        }
        var tempQuestion = questions.splice(currQuestion, 1);

        questionsHolder.push(tempQuestion[0]);
        console.log(questionsHolder);
        //If out of questions, game is over.
        if (questions.length < 1) {
            gameOver();
        }
        else {
            fillQuestion(answer);
        }

        return questionsHolder;
    });

    //Clear high score list
    $(".clear-list").click(function () {
        localStorage.clear();
        $(".list-group").html("");
    });

    $(".save-game").click(function () {
        if ($("#initials").val() != "") {
            var score = {};
            score.initials = $("#initials").val();
            score.total = numCorrect;
            console.log(score);
            localStorage.setItem(('highScore' + (localStorage.length)), JSON.stringify(score));
            displayScores();
        }
        else {
            alert("Please enter your initials before clicking the save button.");
        }

    });


    $("#highscore-button").click(function () {
        clearScreen();
        $("#high-score-list").addClass('d-block');
        if ($(".list-group li").length == 0) {
            for (var i = 0; i < localStorage.length; i++) {
                var newScore = $('<li>');
                newScore.addClass("list-group-item");
                newScore.text("Name: " + JSON.parse(localStorage.getItem("highScore" + i)).initials + "        Score: " + JSON.parse(localStorage.getItem("highScore" + i)).total);
                $(".list-group").append(newScore);
            }
        }

    });

    //Can't make a separate function and attach it here without it running instantly for some reason
    $('.start-game').click(function () {
        clearScreen();
        $("#question-box").addClass('d-block');

        numCorrect = 0;
        counter = 60;
        interval = setInterval(function () {
            counter--;

            // Display 'counter' wherever you want to display it.
            if (counter <= 0) {
                clearInterval(interval);
                $('#gameTimer').text("Time left: " + counter);
                gameOver();
                return;
            } else {
                $('#gameTimer').text("Time left: " + counter);
            }
        }, 1000);
        //hide main screen and show question screen

        $("#question-box").addClass("d-block");
        fillQuestion();
    });
});