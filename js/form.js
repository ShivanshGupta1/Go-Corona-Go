class Form {
  constructor() {
    this.input = createInput("Name");
    this.button = createButton("Let's RUN!");
    this.greeting = createElement("h3");
    this.reset = createButton("RESET!");
  
    
  }
  display() {

    this.input.position(windowWidth / 2 - 25, windowHeight / 2 - 100);

    this.button.position(windowWidth / 2 - 30, windowHeight / 2 - 10);
    this.button.style.width = "500px"
    this.reset.position(windowWidth - 250, 20);
  
 
    this.reset.mousePressed(() => {
      game.update(0);
      player.updateCount(0);
      database.ref("/").update({ players: null });
      database.ref("coronavirus1").update({ x: 300, y: 200 });
       database.ref("coronavirus2").update({ x: 300, y: 400 });
      database.ref("vaccine1").update({ x: 0, y: 0 });
      database.ref("vaccine2").update({ x: 0, y: 0 });
      database.ref("fakenews1").update({ x: 0, y: 0 });
      database.ref("fakenews2").update({ x: 0, y: 0 });
      database.ref("fakenews3").update({ x: 0, y: 0 });
      database.ref("/").update({ waves: 0 });
      location.reload();
    });
    this.button.mousePressed(() => {
      thingTrue = true
          document.getElementById("123").remove();
              document.getElementById("1234").remove();
                  document.getElementById("12345").remove();
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount += 1;
      player.index = playerCount;
      player.updateCount(playerCount);
      player.update();
      this.greeting.html("Welcome " + player.name +" - Waiting for player 2");
      this.greeting.position(windowWidth / 2 - 300, 10);
          

    });
  }
  hide() {
    this.greeting.hide();
  }
}
