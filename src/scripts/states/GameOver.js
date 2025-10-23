var GameOver = function (game) {};

GameOver.prototype = {
  create: function () {
    this.game.add.text(200, 110, "Frogger", {
      fill: "#fff",
    });
    this.game.add.text(150, 160, "Game over", {
      fill: "#fff",
    });
  },
};
