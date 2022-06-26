let buttonColours = ["red", "green", "blue", "yellow"];

// Arrays of random pattern + user-picked pattern (must match to 'pass')
let gamePattern = [];
let userPattern = [];

let started = false;
let level = 0;

$(document).keydown(function () {
  if (!started) {
    $("#title-line").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Logging of the user clicked buttons as an array, to be checked against game pattern array
$(".btn").on("click", function () {
  let userChosenColour = $(this).attr("id");
  userPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Seeing if the last colour pressed matched last entry on the game pattern array
  checkAnswer(userPattern.length - 1);
});

// Checking if array of random pattern matches that of user input, including length, and calling nextSequence for next level
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    ("");

    if (userPattern.length === gamePattern.length) {
      setTimeout(() => nextSequence(), 1000);
    }
  } else {
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);

    $("#title-line").text("Game over, press any key to play!");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Random chosen sequence with each new number pushed to the gamePattern array
function nextSequence() {
  level++;

  userPattern = [];

  $("#title-line").text("Level " + level);

  const randomNumber = Math.floor(Math.random() * 4);

  const randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(200)
    .fadeOut(200)
    .fadeIn(100);

  playSound(randomChosenColour);
}

// Playing a sound when button clicked (used in user pattern and random pattern)
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Adds CSS class once button pressed
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(() => $("#" + currentColour).removeClass("pressed"), 150);
}
