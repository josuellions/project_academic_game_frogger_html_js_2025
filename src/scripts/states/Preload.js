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

    this.game.load.image("arbusto", "./src/assets/img/bushes.png");
    this.game.load.image("bueiro", "./src/assets/img/manhole.png");
    this.game.load.image("tesouro", "./src/assets/img/treasure.png");

    this.game.load.spritesheet("estrada", "./src/assets/img/road.png", 32, 64);
    this.game.load.spritesheet(
      "jogador",
      "./src/assets/img/player.png",
      32,
      48
    );
    this.game.load.spritesheet(
      "botoes_jogo",
      "./src/assets/img/game_buttons.png",
      64,
      64
    );
    this.game.load.spritesheet(
      "caminhonete_marrom",
      "./src/assets/img/brown pickup_trunk.png",
      134,
      70
    );
    this.game.load.spritesheet(
      "pickup_marrom",
      "./src/assets/img/brown_pickup_vehicle.png",
      105,
      70
    );

    this.game.load.image("score", "./src/assets/img/score.png");
    this.game.load.image(
      "fundo_score",
      "./src/assets/img/background_score.png"
    );
    this.game.load.image("game_over", "./src/assets/img/game_over.png");
    this.game.load.image(
      "background_game_over",
      "./src/assets/img/background_game_over.png"
    );
    this.game.load.audio("musica", [
      "./src/assets/audio/game_music.ogg",
      "./src/assets/audio/game_music.mp3",
    ]);
    this.game.load.audio("pontuou", [
      "./src/assets/audio/game_points.ogg",
      "./src/assets/audio/game_points.mp3",
    ]);
    this.game.load.audio("fimjogo", [
      "./src/assets/audio/end_game.ogg",
      "./src/assets/audio/end_game.mp3",
    ]);
  },
};
