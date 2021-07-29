class Player {
  constructor() {
    this.index = null;
    this.name = null;
    this.score = 0;
    this.rank = 0;
    this.x = 0;
    this.y = 0;
    this.lives = 4;
    this.affected = false;
  }
  getCount() {
    database.ref("playerCount").on("value", (data) => {
      playerCount = data.val();
    });
  }
  getPlayerInfo() {
    database.ref("players").on("value", (data) => {
      allPlayers = data.val();
    });
  }
  updateCount(count) {
    database.ref("/").update({ playerCount: count });
  }
  updateLives() {
    database.ref("/").update({ waves: this.lives });
  }
  update() {
    database.ref("players/player" + player.index).set({
      name: this.name,
      score: this.score,
      x: this.x,
      y: this.y,
      isAffected: this.affected,
      lives: this.lives,
    });
  }
  updateFakeNews1(x, y) {
    database.ref("/fakenews1").update({ x: x, y: y });
  }
  updateFakeNews2(x, y) {
    database.ref("/fakenews2").update({ x: x, y: y });
  }
  updateFakeNews3(x, y) {
    database.ref("/fakenews3").update({ x: x, y: y });
  }
  updateVaccine1(x, y) {
    database.ref("/vaccine1").update({ x: x, y: y });
  }
  updateVaccine2(x, y) {
    database.ref("/vaccine2").update({ x: x, y: y });
  }
  updateVirus1(x, y) {
    database.ref("/coronavirus1").update({ x: x, y: y });
  }
  updateVirus2(x, y) {
    database.ref("/coronavirus2").update({ x: x, y: y });
  }
}
