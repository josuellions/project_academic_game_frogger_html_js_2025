var Splash = function (game) {};

Splash.prototype = {
  init: function () {},
  preload: function () {
    this.load.image("logoSplash", "./src/assets/img/logotipo_empresa.png");

    this.load.image("logoGame", "./src/assets/img/logotipo_jogo.png");
    this.load.image("barLoading", "./src/assets/img/barra_loading.png");
    this.load.image("backgroundMenu", "./src/assets/img/fundo_menu.png");
  },
  create: function () {
    this.game.stage.backgroundColor = "#fff";
    this.logo = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.centerY,
      "logoSplash"
    );

    this.logo.anchor.setTo(0.5, 0.5);

    setTimeout(() => {
      this.game.state.start("Preload");
    }, 3_000);
  },
};
