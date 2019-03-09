var colors = ["red", "yellow", "green", "blue"];
var btns = [$("#red"), $("#yellow"), $("#green"), $("#blue")];
var sounds = [new Audio("sounds/red.mp3"),new Audio("sounds/yellow.mp3"),new Audio("sounds/green.mp3"),new Audio("sounds/blue.mp3"),new Audio("sounds/wrong.mp3"),new Audio("sounds/correct.mp3")];
var gameSequence = [];
var userAnswers = [];
var level = 1;

$("#startButton").click(newGame);
for(var i = 0; i < btns.length; i++){
  btns[i].click(playerAnswer);
}

toggleButtons();

function playerAnswer(){
  var color = this.getAttribute("id");
  userAnswers.push(color);
  console.log(color);
  animateButton($(this), color);
  checkAnswers();
}

function checkAnswers(){
  if(userAnswers[userAnswers.length-1]!==gameSequence[userAnswers.length-1]){
    playSound("wrong");
    gameOver();
  }else{
    if(level === userAnswers.length){
      nextLevel();
      toggleButtons();
    }
  }
}

function toggleButtons(){
  for(var i = 0; i < btns.length; i++){
    btns[i].prop('disabled', function(i, v) { return !v; });
  }
}

function nextLevel(){
  level++;
  $("#gameTitle").text("Level "+level);
  playSound("correct");
  gameSequence.push(getNextColor());
  setTimeout(showSequence,1000);
}

function gameOver(){
  toggleButtons();
}

//Starts a new game;
function newGame() {
  gameSequence = [];
  level = 1;
  $("#gameTitle").text("Level "+level);
  $("#startButton").text("New game");
  gameSequence.push(getNextColor());
  showSequence();
}

//Return a random color from the array
function getNextColor() {
  return colors[getRandomNumber(0, colors.length)];
}

//Returns a random number between min(included) an max(excluded)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function showSequence() {
  userAnswers = [];
  $("#startButton").attr("disabled","disabled");
  setTimeout(function(){
      $("#startButton").removeAttr("disabled");
      toggleButtons();
  },500*(gameSequence.length));

  for (var i = 0; i < gameSequence.length; i++) {
    (function(ind){
    setTimeout(function() {
      switch (gameSequence[ind]) {
        case "red":
          animateButton(btns[0], colors[0]);
          break;

        case "yellow":
          animateButton(btns[1], colors[1]);
          break;

        case "green":
          animateButton(btns[2], colors[2]);
          break;

        case "blue":
          animateButton(btns[3], colors[3]);
          break;

        default:
          console.log("Sequence" + ind + "not recognized. Sequence array =" + gameSequence);
          break;
      }
    }, 500*ind);
    })(i);
  }
}

function animateButton(btn, color) {
  btn.removeClass(color);
  btn.addClass(color + "-pressed");
  playSound(color);
  setTimeout(function() {
    btn.removeClass(color + "-pressed");
    btn.addClass(color);
  }, 300);
}

function playSound(sonido){
  switch(sonido){
    case "red":
      sounds[0].play();
    break;
    case "yellow":
      sounds[1].play();
    break;
    case "green":
      sounds[2].play();
    break;
    case "blue":
      sounds[3].play();
    break;
    case "wrong":
      sounds[4].play();
    break;
    case "correct":
      sounds[5].play();
    break;
    default:
      sounds[4].play();
    break;
  }
}
