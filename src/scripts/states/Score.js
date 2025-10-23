var Score = function (game) {};

Score.prototype = {
  create: function () {
    this.game.add.text(200, 110, "Frogger", {
      fill: "#fff",
    });
    this.game.add.text(150, 160, "End Game ", {
      fill: "#fff",
    });
  },
};
