var Preload = function (game) {
  console.log("Preload");
};

Preload.prototype = {
  init: function () {},
  create: function () {
    this.game.state.start("Menu");
  },
  preload: function () {
    var worldCenterY = 30;
    this.logoGame = this.game.add.sprite(
      this.game.world.centerX,
      worldCenterY,
      "logoGame"
    );
    this.logoGame.anchor.setTo(0.5, 0);

    this.barLoading = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.height - 50,
      "barLoading"
    );
    this.barLoading.anchor.setTo(0.5, 0);

    this.game.load.setPreloadSprite(this.barLoading);
    this.game.load.spritesheet(
      "buttonPlay",
      "./src/assets/img/button_play.png",
      128,
      64
    );
  },
};
