var Play = function (game) {};

Play.prototype = {
  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.criarCenario();
    this.criarTesouro();
    this.criarArbustos();
    this.criarJogador();
  },
  criarCenario: function () {
    this.game.stage.backgroundColor = "#82bb65";

    var quantidade = Math.floor((this.game.height - 96) / 64);
    this.pistas = [64];

    for (var i = 0; i < quantidade - 1; i++) {
      if (this.pistas[i] > this.game.height - 96 || this.pistas[i] < 64) {
        break;
      }

      var espaco = this.game.rnd.integerInRange(1, 2);

      this.game.add.tileSprite(
        0,
        this.pistas[i],
        this.game.width,
        64,
        "estrada",
        0
      );

      this.pistas.push(this.pistas[i] + 64 + espaco * 32);
    }
  },
  criarTesouro: function () {
    this.tesouro = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.height - 64,
      "tesouro"
    );
    this.tesouro.anchor.setTo(0.5, 0);

    this.game.physics.arcade.enable(this.tesouro);
    this.tesouro.enableBody = true;
  },
  criarArbustos: function () {
    this.arbustos = this.game.add.group();

    this.game.physics.arcade.enable(this.arbustos);
    this.arbustos.enableBody = true;

    quantidade = Math.floor(this.game.width / 32);

    for (var y = 0; y < this.pistas.length - 1; y++) {
      for (var x = 0; x < quantidade; x++) {
        if (this.game.rnd.integerInRange(0, 10) > 5) {
          continue;
        }

        var arbusto = this.arbustos.create(
          x * 32,
          this.pistas[y] + 64,
          "arbusto"
        );

        arbusto.body.setSize(26, 26, 3, 3);

        arbusto.body.immovable = true;
        arbusto.body.moves = false;
      }
    }
  },
  criarJogador: function () {
    this.jogador = this.game.add.sprite(this.game.world.centerX, 16, "jogador");

    this.jogador.animations.add("paraCima", [0, 1, 2, 1]);
    this.jogador.animations.add("paraBaixo", [6, 7, 8, 7]);
    this.jogador.animations.add("paraEsquerda", [9, 10, 11, 10]);
    this.jogador.animations.add("paraDireita", [3, 4, 5, 4]);

    this.game.physics.arcade.enable(this.jogador);
    this.jogador.enableBody = true;

    this.jogador.body.setSize(18, 28, 7, 10);

    this.jogador.body.collideWorldBounds = true;

    this.jogador.animations.play("paraBaixo", 7, true);
  },
};
