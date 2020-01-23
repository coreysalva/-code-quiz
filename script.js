$(document).ready(function () {

    var counter = 60;
    var questionCounter = 1;
    var currCorrectAnswer = "";
    var questions = [
        {
            prompt: "What is my fav color?",
            optionA: "Purple",
            optionB: "Blue",
            optionC: "Red",
            optionD: "Green",
            correct: "A"
        }
    ];

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

    function runGame() {


    };

    //Populate question block
    function fillQuestion(x) {
        $("#current-question").html(questions[x].prompt);
        $("#choice-a").html(questions[x].optionA);
        $("#choice-b").html(questions[x].optionB);
        $("#choice-c").html(questions[x].optionC);
        $("#choice-d").html(questions[x].optionD);
        currCorrectAnswer = questions[x].correct;

    }


    //Can't make a separate function and attach it here without it running instantly for some reason
    $('#start-game').click(function () {
        var interval = setInterval(function () {
            counter--;

            // Display 'counter' wherever you want to display it.
            if (counter <= 0) {
                clearInterval(interval);
                $('#gameTimer').text("Time left: " + counter);
                return;
            } else {
                $('#gameTimer').text("Time left: " + counter);
            }
        }, 1000);
        //hide main screen and show question screen
        $("#welcome-screen").addClass('d-none');
        $("#welcome-screen").removeClass('d-block');
        $("#question-box").removeClass('d-none');
        $("#question-box").removeClass('d-block');
        fillQuestion(0);
    });
});