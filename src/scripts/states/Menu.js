var Menu = function (game) {};

Menu.prototype = {
  init: function () {},
  preload: function () {},
  create: function () {
    this.game.stage.backgroundColor = "#0099cc";
    this.fundoMenu = this.game.add.image(
      this.game.world.centerX,
      this.game.world.height,
      "backgroundMenu"
    );
    this.fundoMenu.anchor.setTo(0.5, 1);

    this.logoJogo = this.game.add.sprite(
      this.game.world.centerX,
      30,
      "logoGame"
    );
    this.logoJogo.anchor.setTo(0.5, 0);
    this.buttonPlay = this.game.add.button(
      this.game.world.centerX,
      this.game.world.centerY,
      "buttonPlay",
      this.actionButtonPlay,
      this,
      1,
      0,
      1
    );
    this.buttonPlay.anchor.setTo(0.5, 0.5);
  },
  update: function () {},
  actionButtonPlay: function () {
    this.game.state.start("Play");
  },
};
