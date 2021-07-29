class Game {
  constructor() {}

  getState() {
    database.ref("gameState").on("value", (data) => {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({ gameState: state });
  }
  start() {
    if (gameState == 0) {
      player = new Player();
      player.getCount();
      form = new Form();
      form.display();
    }
    road1 = createSprite(0, -250, width * 4, 50);
    // road2 = createSprite(width / 2 -100, 650, width, 50);
    road1.addImage(bg);
    // road2.addImage(bg);
    road1.scale = 7.5;
    road1.velocityX = -10;
    // road.scale = 1.3;
    player1 = createSprite(750, 200, 50, 50);
    player2 = createSprite(750, 400, 50, 50);
    virus1 = createSprite(300, 200, 50, 50);
    virus2 = createSprite(300, 400, 50, 50);
    virus1.addImage(virusImg);
    virus2.addImage(virusImg);
    players = [player1, player2];
    player1.addAnimation("label1", player1Animated);
    player2.addAnimation("label2", player2Animated);
    player1.addAnimation("affected1", affectedAnimated);
    player2.addAnimation("affected2", affectedAnimated);
    fakeNews1 = createSprite(2300, 100, 10, 10);
    fakeNews2 = createSprite(2300, 150, 10, 10);
    fakeNews3 = createSprite(2300, 200, 10, 10);
    fakeNews2.visible = false;
    fakeNews3.visible = false;
    fakeNews1.visible = false;
    vaccine1 = createSprite(2300, 300, 10, 10);
    vaccine2 = createSprite(2300, 400, 10, 10);
    vaccine1.visible = false;
    vaccine2.visible = false;
    fakeNews1.addImage(fakeNewsImg1);
    fakeNews1.scale = 0.125;
    fakeNews2.addImage(fakeNewsImg2);
    fakeNews2.scale = 0.5;
    fakeNews3.addImage(fakeNewsImg3);
    fakeNews3.scale = 0.125;
    vaccine1.addImage(vaccineImg1);
    vaccine1.scale = 0.5;
    vaccine2.addImage(vaccineImg2);
    vaccine2.scale = 0.5;

    // fakeNews3.addImage(fakeNewsImg3);
    // fakeNews3.scale = 0.125;
    if (player.index == 2) {
      player.lives = 10;
    }
  }
  play() {
    form.hide();

    player.getPlayerInfo();
    fakeNews2.visible = true;
    fakeNews3.visible = true;
    fakeNews1.visible = true;
    vaccine1.visible = true;
    vaccine2.visible = true;

    database.ref("/fakenews1").on("value", (value) => {
      fakeNews1.y = value.val().y;
    });

    database.ref("/fakenews2").on("value", (value) => {
      fakeNews2.y = value.val().y;
    });
    database.ref("/fakenews3").on("value", (value) => {
      fakeNews3.y = value.val().y;
    });
    database.ref("/vaccine1").on("value", (value) => {
      vaccine1.y = value.val().y;
    });
    database.ref("/vaccine2").on("value", (value) => {
      vaccine2.y = value.val().y;
    });
    database.ref("/coronavirus1").on("value", (value) => {
      virus1.x = value.val().x;
      virus1.y = value.val().y;
    });
    database.ref("/coronavirus2").on("value", (value) => {
      virus2.x = value.val().x;
      virus2.y = value.val().y;
    });

    // database.ref("/fakenews2").on((value) => {
    //   fakeNews2.y = value.val().y;
    // });
    // database.ref("/fakenews3").on((value) => {
    //   fakeNews3.y = value.val().y;
    // });
    // player1.velocityX = 2
    var index = 0;
    // console.log(road1.x);

    if (allPlayers != null) {
      for (var i in allPlayers) {
        index += 1;

        if ("player" + player.index === i) {
          player.y = players[index - 1].y;

          if (player.index == 1) {
            virus1.y = player.y;
          } else {
            virus2.y = player.y;
          }
          if (allPlayers[i].isAffected == true) {
            if (player.index == 1) {
              virus1.visible = false;
              player1.changeAnimation("affected1", affectedAnimated);
            } else {
              virus2.visible = false;
              player2.changeAnimation("affected2", affectedAnimated);
            }
          }

          // camera.position.y = height / 2;
          player.update();
          // camera.position.x = players[player.index-1].x;
        } else {
          players[index - 1].y = allPlayers[i].y;

          if (player.index == 1) {
            virus2.y = players[index - 1].y;
          } else {
            virus1.y = players[index - 1].y;
          }
          if (allPlayers[i].isAffected == true) {
            if (player.index == 1) {
              virus2.visible = false;
              player2.changeAnimation("affected2", affectedAnimated);
            } else {
              virus1.visible = false;
              player1.changeAnimation("affected1", affectedAnimated);
            }
          }
        }
      }

      // road1.x = players[0].x - 100
    }
    if (frameCount % 500 == 0) {
      wave += 0.5;
      counter += 1;
      msg = new SpeechSynthesisUtterance(
        "Wave " + counter + " of Coronavirus has begun!"
      );
      window.speechSynthesis.speak(msg);
    }
    if (frameCount % 100 == 0) {
      randomY1 = Math.round(random(100, 600));

      player.updateFakeNews1(2300, randomY1);
      fakeNews1.velocityX = -10 * wave;
      fakeNews1.lifetime = 600;
    }
    if (fakeNews1.x < 0) {
      fakeNews1.x = 2300;
      fakeNews1.velocityX = 0;
    }
    if (frameCount % 700 == 0) {
      randomY4 = Math.round(random(100, 600));

      player.updateVaccine1(2300, randomY4);
      vaccine1.velocityX = -10 * wave;
      vaccine1.lifetime = 600;
    }
    if (vaccine1.x < 0) {
      vaccine1.x = 2300;
      vaccine1.velocityX = 0;
    }

    if (frameCount % 1000 == 0) {
      randomY5 = Math.round(random(100, 600));

      player.updateVaccine2(2300, randomY5);
      vaccine2.velocityX = -10 * wave;
      vaccine2.lifetime = 600;
    }
    if (vaccine2.x < 0) {
      vaccine2.x = 2300;
      vaccine2.velocityX = 0;
    }

    if (frameCount % 350 == 0) {
      randomY2 = Math.round(random(300, 800));

      player.updateFakeNews2(2300, randomY2);
      fakeNews2.velocityX = -5 * wave;
      fakeNews2.lifetime = 600;
    }
    if (fakeNews2.x < 0) {
      fakeNews2.x = 2300;
      fakeNews2.velocityX = 0;
    }
    if (frameCount % 550 == 0) {
      randomY3 = Math.round(random(500, 900));

      player.updateFakeNews3(2300, randomY3);
      fakeNews3.velocityX = -7 * wave;
      fakeNews3.lifetime = 600;
    }
    if (fakeNews3.x < 0) {
      fakeNews3.x = 2300;
      fakeNews3.velocityX = 0;
    }
    if (road1.x < 0) {
      road1.x = width / 2;
    }

    //vaccine
    if (vaccine1.isTouching(player1) && allPlayers["player1"].isAffected == false) {
      vaccinemusic.play();
      isImmune = true;
      vaccine1.x = 2300;
      randomY4 = Math.round(random(100, 600));
      player.updateVaccine1(2300, randomY4);
      vaccine1.velocityX = 0;
    }
    if (
      vaccine2.isTouching(player1) &&
      allPlayers["player1"].isAffected == false
    ) {
      vaccinemusic.play();
      isImmune = true;
      vaccine2.x = 2300;
      randomY5 = Math.round(random(300, 800));
      player.updateVaccine2(2300, randomY5);
      vaccine2.velocityX = 0;
    }

    if (
      vaccine1.isTouching(player2) &&
      allPlayers["player2"].isAffected == false
    ) {
      vaccinemusic.play();
      vaccine1.x = 2300;
      randomY4 = Math.round(random(100, 600));
      player.updateVaccine1(2300, randomY4);
      vaccine1.velocityX = 0;
    }
    if (
      vaccine2.isTouching(player2) &&
      allPlayers["player2"].isAffected == false
    ) {
      vaccinemusic.play();
      vaccine2.x = 2300;
      randomY5 = Math.round(random(300, 800));
      player.updateVaccine2(2300, randomY5);
      vaccine2.velocityX = 0;
    }
    if (player.index == 1 && allPlayers != null) {
      if (
        fakeNews1.isTouching(player1) &&
        allPlayers["player1"].isAffected == false
      ) {
        fakeNewsMusic.play();
        if (isImmune == false) {
          fakeNews1.x = 2300;
          randomY1 = Math.round(random(100, 600));
          player.updateFakeNews1(2300, randomY1);
          player.lives -= 1;
          player.updateLives();
          virus1.x += 100;
          player.updateVirus1(virus1.x, virus1.y);
          fakeNews1.velocityX = 0;
        } else {
          fakeNews1.x = 2300;
          randomY1 = Math.round(random(100, 600));
          player.updateFakeNews1(2300, randomY1);
          isImmune = false;
          fakeNews1.velocityX = 0;
        }
      }
      if (
        fakeNews2.isTouching(player1) &&
        allPlayers["player1"].isAffected == false
      ) {
        fakeNewsMusic.play();
        if (isImmune == false) {
          fakeNews2.x = 2300;
          randomY2 = Math.round(random(300, 800));
          player.updateFakeNews2(2300, randomY2);
          player.lives -= 1;
          player.updateLives();
          virus1.x += 100;
          player.updateVirus1(virus1.x, virus1.y);
          fakeNews2.velocityX = 0;
        } else {
          fakeNews2.x = 2300;
          randomY2 = Math.round(random(300, 800));
          player.updateFakeNews2(2300, randomY2);
          isImmune = false;
          fakeNews2.velocityX = 0;
        }
      }

      if (
        fakeNews3.isTouching(player1) &&
        allPlayers["player1"].isAffected == false
      ) {
        fakeNewsMusic.play();
        if (isImmune == false) {
          fakeNews3.x = 2300;
          randomY3 = Math.round(random(500, 900));
          player.updateFakeNews3(2300, randomY3);
          player.lives -= 1;
          player.updateLives();
          virus1.x += 100;
          player.updateVirus1(virus1.x, virus1.y);
          fakeNews3.velocityX = 0;
        } else {
          fakeNews3.x = 2300;
          randomY3 = Math.round(random(500, 900));
          player.updateFakeNews3(2300, randomY3);
          isImmune = false;
          fakeNews3.velocityX = 0;
        }
      }
      if (
        fakeNews1.isTouching(player2) &&
        allPlayers["player2"].isAffected == false
      ) {
       
        fakeNews1.x = 2300;
        randomY1 = Math.round(random(100, 600));
        player.updateFakeNews1(2300, randomY1);
        fakeNews1.velocityX = 0;
      }
      if (
        fakeNews2.isTouching(player2) &&
        allPlayers["player2"].isAffected == false
      ) {
       
        fakeNews2.x = 2300;
        randomY2 = Math.round(random(300, 800));
        player.updateFakeNews2(2300, randomY2);
        fakeNews2.velocityX = 0;
      }
      if (
        fakeNews3.isTouching(player2) &&
        allPlayers["player2"].isAffected == false
      ) {
       
        fakeNews3.x = 2300;
        randomY3 = Math.round(random(500, 900));
        player.updateFakeNews3(2300, randomY3);
        fakeNews3.velocityX = 0;
      }
    }
    if (player.index == 2 && allPlayers!=null) {
      if (
        fakeNews1.isTouching(player2) &&
        allPlayers["player2"].isAffected == false
      ) {
        fakeNewsMusic.play();
        if (isImmune == false) {
          fakeNews1.x = 2300;
          randomY1 = Math.round(random(100, 600));
          player.updateFakeNews1(2300, randomY1);
          player.lives -= 1;
          player.updateLives();
          virus2.x += 100;
          player.updateVirus2(virus2.x, virus2.y);
          fakeNews1.velocityX = 0;
        } else {
          fakeNews1.x = 2300;
          randomY1 = Math.round(random(100, 600));
          player.updateFakeNews1(2300, randomY1);
          isImmune = false;
          fakeNews1.velocityX = 0;
        }
      }
      if (
        fakeNews2.isTouching(player2) &&
        allPlayers["player2"].isAffected == false
      ) {
        fakeNewsMusic.play();
        if (isImmune == false) {
          fakeNews2.x = 2300;
          randomY2 = Math.round(random(300, 800));
          player.updateFakeNews2(2300, randomY2);
          player.lives -= 1;
          player.updateLives();
          virus2.x += 100;
          player.updateVirus2(virus2.x, virus2.y);
          fakeNews2.velocityX = 0;
        } else {
          fakeNews2.x = 2300;
          randomY2 = Math.round(random(300, 800));
          player.updateFakeNews2(2300, randomY2);
          isImmune = false;
          fakeNews2.velocityX = 0;
        }
      }

      if (
        fakeNews3.isTouching(player2) &&
        allPlayers["player2"].isAffected == false
      ) {
        fakeNewsMusic.play();
        if (isImmune == false) {
          fakeNews3.x = 2300;
          randomY3 = Math.round(random(500, 900));
          player.updateFakeNews3(2300, randomY3);
          player.lives -= 1;
          player.updateLives();
          virus2.x += 100;
          player.updateVirus2(virus2.x, virus2.y);
          fakeNews3.velocityX = 0;
        } else {
          fakeNews3.x = 2300;
          randomY3 = Math.round(random(500, 900));
          player.updateFakeNews3(2300, randomY3);
          isImmune = false;
          fakeNews3.velocityX = 0;
        }
      }
      if (
        fakeNews1.isTouching(player1) &&
        allPlayers["player1"].isAffected == false
      ) {
   
        fakeNews1.x = 2300;
        randomY1 = Math.round(random(100, 600));
        player.updateFakeNews1(2300, randomY1);
        fakeNews1.velocityX = 0;
      }
      if (
        fakeNews2.isTouching(player1) &&
        allPlayers["player1"].isAffected == false
      ) {
       
        fakeNews2.x = 2300;
        randomY2 = Math.round(random(300, 800));
        player.updateFakeNews2(2300, randomY2);
        fakeNews2.velocityX = 0;
      }
      if (
        fakeNews3.isTouching(player1) &&
        allPlayers["player1"].isAffected == false
      ) {
       
        fakeNews3.x = 2300;
        randomY3 = Math.round(random(500, 900));
        player.updateFakeNews3(2300, randomY3);
        fakeNews3.velocityX = 0;
      }
    }

    if (keyIsDown(DOWN_ARROW)) {
      players[player.index - 1].velocityY = 5.5;
    }
    if (keyIsDown(UP_ARROW)) {
      players[player.index - 1].velocityY = -5.5;
    }
    if (player1.y > height || player1.y < 0) {
      player1.velocityY = player1.velocityY * -1;
    }
    if (player2.y > height || player2.y < 0) {
      player2.velocityY = player2.velocityY * -1;
    }
    if (player.lives <= 0) {
      player.affected = true;
      player.update();
      console.log(player.affected);
    }
    if (player.index == 1 && allPlayers != null) {
      if (allPlayers["player1"].isAffected == true) {
        if (player1.isTouching(player2)) {
          database.ref("players/player2").update({ isAffected: true });
          isTouched = "YOU TOUCHED YOUR FRIEND!";
          both = "BOTH PLAYERS";
                 
        }
      } else if (allPlayers["player2"].isAffected == true) {
        if (player2.isTouching(player1)) {
          database.ref("players/player1").update({ isAffected: true });
          player.affected = true;
          isTouched = "YOU TOUCHED YOUR FRIEND!";
          both = "BOTH PLAYERS";
                
        }
      }
    }
    if (player.index == 2 && allPlayers != null) {
      if (allPlayers["player2"].isAffected == true) {
        if (player2.isTouching(player1)) {
          database.ref("players/player1").update({ isAffected: true });
          isTouched = "YOU TOUCHED YOUR FRIEND!";
          both = "BOTH PLAYERS";
            
        }
      } else if (allPlayers["player1"].isAffected == true) {
        if (player1.isTouching(player2)) {
          database.ref("players/player2").update({ isAffected: true });
          player.affected = true;
          isTouched = "YOU TOUCHED YOUR FRIEND!";
          both = "BOTH PLAYERS";
        
        }
      }
    }

    if (allPlayers != null) {
      player.affected = allPlayers["player" + player.index].isAffected;
    }

    if (allPlayers != null) {
      if (
        allPlayers["player1"].isAffected == true &&
        allPlayers["player2"].isAffected == true
      ) {
        setTimeout(function () {
          gameState = 2;
          game.update(2);
        }, 5000);
      }
    }

    drawSprites();
    if (player.affected != true) {
      player.score += Math.round(frameCount / 100);
      player.update();
      fill("white");
      textSize(25);
      text("Immune to VIRUS: " + isImmune, 50, 50);
      text("Lives: " + player.lives, 550, 50);
      text("WAVE: " + counter, 950, 50);
      text("SCORE: " + player.score, 1500, 50);
      text("YOU", player.x + 100, player.y + 20);
    } else {
      fill("white");
      textSize(25);
      text(both + " have the COVID-19!", 50, 50);

      text(isTouched, 50, 100);
      if (player.index == 1) {
        player1.changeAnimation("affected1", affectedAnimated);
      } else {
        player2.changeAnimation("affected1", affectedAnimated);
      }
    }
     
  }
  end() {
    bgMusic.stop();

    form.hide();
    console.log(gameState);
    background(255);
    var rank = createElement("h1");

    rank.html("Game Over: Your score was " + player.score);
    rank.position(width / 2 - 100, height / 2);
    var info2 = createElement("h4")
    info2.html("CLICK RESET TO START AGAIN!")
    info2.position(width/2-100,height/2+100)
  }
  // updateVaccine(x, y) {
  //   database.ref("/vaccine").update({ x: x, y: y });
  // }

  // readVaccine() {
  //   database.ref("/vaccine").on((value) => {
  //     return value.val();
  //   });
  // }

  // updateVirus(x, y) {
  //   database.ref("/virus").update({ x: x, y: y });
  // }
  // readVirus() {
  //   database.ref("/virus").on((value) => {
  //     return value.val();
  //   });
  // }

  updateWaves(wave) {
    database.ref("/").update({ waves: wave });
  }
  readWaves() {
    database.ref("/waves").on((value) => {
      return value.val();
    });
  }
}
