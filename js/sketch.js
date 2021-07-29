var database;
var gameState = 0;
var playerCount = 0;
var randomY1, randomY2, randomY3, randomY4, randomY5;
var isTouched = "DO NOT TOUCH YOUR FRIEND";
var both = "YOU";
var wave = 1;
var counter = 0;
var player1,
  player2,
  players,
  vaccine1,
  vaccine2,
  fakeNews1,
  fakeNews2,
  fakeNews3,
  road2,
  virus1,
  othervirus1,
  virus2,
  othervirus2;
  let timer = 0;
var isImmune = false;
var dataLives = 3;
var road1 = 0;
var player1Animated,
  player2Animated,
  bg,
  vaccineImg1,
  vaccineImg2,
  fakeNewsImg1,
  fakeNewsImg2,
  fakeNewsImg3,
  affectedAnimated,
  virusImg;
var affectedPlayer1, affectedPlayer2, affected;
var form, player, game;
var allPlayers;
var playerEllipse;
var bgMusic;
var fakeNewsMusic;
var vaccinemusic;
var waveMusic;
var gameOverMusic;
var msg;
var musicStop = true;
var covidPic;
var thingTrue = false

function preload() {
  covidPic = loadImage("images/covidpic.png")
  bgMusic = loadSound("sounds/background.mp3");
  fakeNewsMusic = loadSound("sounds/collectfakenews.mp3");
  vaccinemusic = loadSound("sounds/vaccinecollect.mp3");
  waveMusic = loadSound("sounds/wave.mp3");
  gameOverMusic = loadSound("sounds/gameover.mp3");
  player1Animated = loadAnimation(
    "images/player1a.png",
    "images/player1b.png",
    "images/player1c.png"
  );
  player2Animated = loadAnimation(
    "images/player2a.png",
    "images/player2b.png",
    "images/player2c.png"
  );
  affectedAnimated = loadAnimation(
    "images/affectedA.png",
    "images/affectedB.png",
    "images/affectedC.png"
  );
  bg = loadImage("images/track copy.png");
  vaccineImg1 = loadImage("images/vaccine.png");
  vaccineImg2 = loadImage("images/vaccine2.png");
  fakeNewsImg1 = loadImage("images/fakemedicine1.jpeg");
  fakeNewsImg2 = loadImage("images/fakemedicine2.jpeg");
  fakeNewsImg3 = loadImage("images/fakenews3.jpeg");
  virusImg = loadImage("images/covid.png");
}
function setup() {
  database = firebase.database();

  createCanvas(windowWidth, windowHeight);
  game = new Game();
  game.getState();
  game.start();
  // bgMusic.loop();

  

}

function draw() {

  if (millis() >= 1000 + timer) {
    if (thingTrue == false) {
      image(
        covidPic,
        Math.round(random((100, windowWidth - 100))),
        Math.round(random((0, windowHeight - 100))),
        50,
        50
      );
    }
    timer = millis();
  }

      

  

  if (playerCount === 2 && gameState === 0) {
    game.update(1);
    game.getState();
  }

  if (gameState === 1) {
      background(bg);
    game.play();
  } else if (gameState === 2 && musicStop == true) {
    gameOverMusic.play();
    msg = new SpeechSynthesisUtterance(
      "Game Over: Your score was " + player.score
    );
    window.speechSynthesis.speak(msg);
    musicStop = false;
  }
  if (musicStop == false) {
    gameOverMusic.pause();
    game.end();
  }
}
