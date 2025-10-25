var GameOver = function (game) {};

GameOver.prototype = {
  init: function (points) {
    this.points = points != null && points != undefined ? points : 0;
  },
  create: function () {
    this.game.stage.backgroundColor = "#000";

    this.background = this.game.add.image(
      this.game.world.centerX,
      this.game.world.height,
      "backgroundGameOver"
    );
    this.background.anchor.setTo(0.5, 1);

    this.title = this.game.add.sprite(this.game.world.centerX, 30, "gameOver");
    this.title.anchor.setTo(0.5, 0);

    this.buttonContinue = this.game.add.button(
      this.game.world.centerX,
      this.game.height - 60,
      "buttonPlay",
      this.buttonContinueAction,
      this,
      1,
      0,
      1
    );

    this.buttonContinue.anchor.setTo(0.5, 0.5);

    var style = {
      font: "bold 30px Arial",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle",
    };

    var text = this.game.add.text(
      0,
      this.game.world.centerY,
      this.points + " points!",
      style
    );

    text.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);
    text.setTextBounds(0, 0, 320, 10);
    //text.setTextBounds(0, this.game.world.centerY, this.game.world.width, 50);
    //text.anchor.setTo(-0.7, 6);
  },
  buttonContinueAction: function () {
    this.points = 0;
    this.game.state.start("Play", true, false, this.points);
  },
};
