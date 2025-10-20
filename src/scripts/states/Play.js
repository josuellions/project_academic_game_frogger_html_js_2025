var Play = function (game) {};

Play.prototype = {
  create: function () {
    this.game.add.text(110, 30, "Start", {
      fill: "#fff",
    });
    this.game.add.text(60, 60, "Game Frogger", {
      fill: "#fff",
    });
  },
};
