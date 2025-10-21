var Preload = function (game) {};

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

    this.game.load.image("arbusto", "./src/assets/img/arbusto.png");
    this.game.load.image("bueiro", "./src/assets/img/bueiro.png");
    this.game.load.image("tesouro", "./src/assets/img/tesouro.png");

    this.game.load.spritesheet(
      "estrada",
      "./src/assets/img/estrada.png",
      32,
      64
    );
    this.game.load.spritesheet(
      "jogador",
      "./src/assets/img/jogador.png",
      32,
      48
    );
    this.game.load.spritesheet(
      "botoes_jogo",
      "./src/assets/img/botoes_jogo.png",
      64,
      64
    );
    this.game.load.spritesheet(
      "caminhonete_marrom",
      "./src/assets/img/caminhonete_marrom.png",
      134,
      70
    );
    this.game.load.spritesheet(
      "pickup_marrom",
      "./src/assets/img/pickup_marrom.png",
      105,
      70
    );

    this.game.load.image("score", "./src/assets/img/score.png");
    this.game.load.image("fundo_score", "./src/assets/img/fundo_score.png");
    this.game.load.image("gameover", "./src/assets/img/gameover.png");
    this.game.load.image(
      "fundo_gameover",
      "./src/assets/img/fundo_gameover.png"
    );
    this.game.load.audio("musica", [
      "./src/assets/img/musica.ogg",
      "./src/assets/img/musica.mp3",
    ]);
    this.game.load.audio("pontuou", [
      "./src/assets/img/pontuou.ogg",
      "./src/assets/img/pontuou.mp3",
    ]);
    this.game.load.audio("fimjogo", [
      "./src/assets/img/fimjogo.ogg",
      "./src/assets/img/fimjogo.mp3",
    ]);
  },
};
