var Score = function (game) {};

Score.prototype = {
  init: function (pontos) {
    this.pontos = pontos != null && pontos != undefined ? pontos : 0;
  },
  create: function () {
    this.game.stage.backgroundColor = "#0099cc";
    this.fundo = this.game.add.image(
      this.game.world.centerX,
      this.game.world.height,
      "fundo_score"
    );
    this.fundo.anchor.setTo(0.5, 1);

    this.titulo = this.game.add.sprite(this.game.world.centerX, 30, "score");
    this.titulo.anchor.setTo(0.5, 0);

    this.botao_continuar = this.game.add.button(
      this.game.world.centerX,
      this.game.height - 60,
      "buttonPlay",
      this.acaoBotoaContinuar,
      this,
      1,
      0,
      1
    );

    this.botao_continuar.anchor.setTo(0.5, 0.5);

    var estilo = {
      font: "bold 30px Arial",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle",
    };

    var texto = this.game.add.text(
      0,
      this.game.world.centerY,
      this.pontos + " Pontos!",
      estilo
    );

    texto.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);
    texto.setTextBounds(0, 0, 320, 10);
    //texto.setTextBounds(0, this.game.world.centerY, this.game.world.width, 50);
    //texto.anchor.setTo(-0.7, 6);
  },
  acaoBotoaContinuar: function () {
    this.game.state.start("Play", true, false, this.pontos);
  },
};
