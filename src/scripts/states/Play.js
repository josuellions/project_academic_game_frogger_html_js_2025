var Play = function (game) {};

Play.prototype = {
  init: function (pontos) {
    this.pontos = pontos != null && pontos != undefined ? pontos : 0;
    var estilo = { font: "bold 20px Arial", fill: "#fff" };
    var texto = this.game.add.text(8, 8, this.pontos + " Pontos", estilo);

    texto.setShadow(1, 1, "rgba(0.0.0.0.5", 2);
  },
  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.criarCenario();
    this.criarTesouro();
    this.criarArbustos();
    this.criarJogador();
    this.criarVeiculos();
    this.criarBotoes();

    this.teclado = this.game.input.keyboard.createCursorKeys();
    this.botaoAtivo = "";
  },
  update: function () {
    //Colisão com elementos
    this.game.physics.arcade.overlap(
      this.jogador,
      this.veiculos,
      this.colideComVeiculos,
      null,
      this
    );
    this.game.physics.arcade.collide(this.jogador, this.arbustos);

    this.game.physics.arcade.overlap(
      this.jogador,
      this.tesouro,
      this.colideComTesouro,
      null,
      this
    );

    this.atualizarVeiculos();
    this.verificarTecla();
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
  criarVeiculos: function () {
    this.veiculos = this.game.add.group();

    this.game.physics.arcade.enable(this.veiculos);
    this.veiculos.enableBody = true;

    var tipoVeiculo = ["pickup_marrom", "caminhonete_marrom"];
    var direcoes = ["Direita", "Esquerda"];

    for (var i = 0; i < this.pistas.length - 1; i++) {
      var tipo =
        tipoVeiculo[this.game.rnd.integerInRange(0, tipoVeiculo.length - 1)];

      var veiculo = this.veiculos.create(32, this.pistas[i] - 16, tipo);

      if (tipo === "pickup_marrom") {
        veiculo.body.setSize(105, 43, 0, 19);
      } else {
        veiculo.body.setSize(130, 43, 2, 19);
      }

      veiculo.animations.add("irDireita", [0, 1]);
      veiculo.animations.add("irEsquerda", [2, 3]);

      veiculo.direcao =
        direcoes[this.game.rnd.integerInRange(0, direcoes.length - 1)];

      if (veiculo.direcao === "Direita") {
        veiculo.body.velocity.x = this.game.rnd.integerInRange(80, 150);
      } else {
        veiculo.body.velocity.x = -this.game.rnd.integerInRange(80, 150);
      }

      veiculo.animations.play(
        "ir" + veiculo.direcao,
        this.game.rnd.integerInRange(4, 7),
        true
      );
    }
  },
  atualizarVeiculos: function () {
    this.veiculos.forEach(function (veiculo) {
      if (veiculo.direcao === "Direita" && veiculo.x > this.game.width) {
        veiculo.x = -veiculo.width;
        veiculo.body.velocity.x = this.game.rnd.integerInRange(80, 150);
      } else if (veiculo.direcao === "Esquerda" && veiculo.x < -veiculo.width) {
        veiculo.x = this.game.width;
        veiculo.body.velocity.x = -this.game.rnd.integerInRange(80, 150);
      }
    }, this);
  },
  criarBotoes: function () {
    var botao_esquerda = this.game.add.button(
      0,
      this.game.height - 64,
      "botoes_jogo",
      null,
      this,
      4,
      0,
      4
    );

    botao_esquerda.name = "esquerda";
    botao_esquerda.events.onInputDown.add(this.botaoPressionado, this);
    botao_esquerda.events.onInputUp.add(this.botaoSolto, this);

    var botao_direita = this.game.add.button(
      68,
      this.game.height - 64,
      "botoes_jogo",
      null,
      this,
      5,
      1,
      5
    );

    botao_direita.name = "direita";
    botao_direita.events.onInputDown.add(this.botaoPressionado, this);
    botao_direita.events.onInputUp.add(this.botaoSolto, this);

    var botao_cima = this.game.add.button(
      this.game.width - 128,
      this.game.height - 64,
      "botoes_jogo",
      null,
      this,
      6,
      2,
      6
    );

    botao_cima.name = "cima";
    botao_cima.events.onInputDown.add(this.botaoPressionado, this);
    botao_cima.events.onInputUp.add(this.botaoSolto, this);

    var botao_baixo = this.game.add.button(
      this.game.width - 60,
      this.game.height - 64,
      "botoes_jogo",
      null,
      this,
      7,
      3,
      7
    );

    botao_baixo.name = "baixo";
    botao_baixo.events.onInputDown.add(this.botaoPressionado, this);
    botao_baixo.events.onInputUp.add(this.botaoSolto, this);
  },
  botaoPressionado: function (botao) {
    this.botaoAtivo = botao.name;
  },
  botaoSolto: function () {
    this.botaoAtivo = "";
  },
  verificarTecla: function () {
    if (this.teclado.left.isDown || this.botaoAtivo == "esquerda") {
      this.jogador.body.velocity.x = -80;
      this.jogador.body.velocity.y = 0;
      this.jogador.animations.play("paraEsquerda", 7, true);
    } else if (this.teclado.left.isDown || this.botaoAtivo == "direita") {
      this.jogador.body.velocity.x = 80;
      this.jogador.body.velocity.y = 0;
      this.jogador.animations.play("paraDireita", 7, true);
    } else if (this.teclado.left.isDown || this.botaoAtivo == "cima") {
      this.jogador.body.velocity.x = 0;
      this.jogador.body.velocity.y = -80;
      this.jogador.animations.play("paraCima", 7, true);
    } else if (this.teclado.left.isDown || this.botaoAtivo == "baixo") {
      this.jogador.body.velocity.x = 0;
      this.jogador.body.velocity.y = 80;
      this.jogador.animations.play("paraBaixo", 7, true);
    } else {
      this.jogador.body.velocity.x = 0;
      this.jogador.body.velocity.y = 0;
    }
  },
  colideComVeiculos: function () {
    if ("vibrate" in window.navigator) {
      window.navigator.vibrate(200);
    }

    var som = this.game.add.audio("fimjogo");
    som.play();

    //setTimeout(function () {
    this.game.state.start("GameOver", true, false, this.pontos);
    //}, 1000);
  },
  colideComTesouro: function () {
    this.pontos++;

    var som = this.game.add.audio("pontuou");
    som.play();

    this.game.state.start("Score", true, false, this.pontos);
  },
};
