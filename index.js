var colors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userPattern[currentLevel]){
    if(gamePattern.length === userPattern.length){
      setTimeout(function(){
        nextSequence();
      }, 500);
    }
  }else {
    playSound("wrong");
    $("h1").html("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over")
    }, 100);
    startOver();
  }
}


function nextSequence(){
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor  = colors[randomNumber];
  gamePattern.push(randomColor);
  $("." + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
  level++;
  $("h1").text("Level " + level);
  userPattern = [];
}


$(document).keypress(function() {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

 $(".btn").click(function(){
   var clickedButton = $(this).attr("id");
   animatePress(clickedButton);
   userPattern.push(clickedButton);
   playSound(clickedButton);
   checkAnswer(userPattern.length -1);
 });


function playSound(button){
  var audio = new Audio("sounds/" + button + ".mp3");
  audio.play();
}


function animatePress(button){
  $("#" + button).addClass("pressed");
  setTimeout(function(){
    $("#" + button).removeClass("pressed")
  }, 100);
}


function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
