var Game = function (game) {};

Game.prototype = {
  create: function () {
    this.game.add.text(200, 110, "Initial", {
      fill: "#fff",
    });
    this.game.add.text(150, 160, "Game Frogger", {
      fill: "#fff",
    });
  },
};
