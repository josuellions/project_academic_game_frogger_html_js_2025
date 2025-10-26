var Score = function (game) {};

Score.prototype = {
  init: function (points) {
    this.points = points != null && points != undefined ? points : 0;
  },
  create: function () {
    this.game.stage.backgroundColor = "#0099cc";
    this.fundo = this.game.add.image(
      this.game.world.centerX,
      this.game.world.height,
      "backgroundScore"
    );
    this.fundo.anchor.setTo(0.5, 1);

    this.titulo = this.game.add.sprite(this.game.world.centerX, 30, "score");
    this.titulo.anchor.setTo(0.5, 0);

    this.buttonContinue = this.game.add.button(
      this.game.world.centerX,
      this.game.height - 60,
      "buttonPlay",
      this.actionButtonContinue,
      this,
      1,
      0,
      1
    );

    this.buttonContinue.anchor.setTo(0.5, 0.5);

    var estilo = {
      font: "bold 30px Arial",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle",
    };

    var textPoints = this.points > 1 ? " pontos!" : " ponto!";
    var texto = this.game.add.text(
      0,
      this.game.world.centerY,
      this.points + textPoints,
      estilo
    );

    texto.setShadow(3, 3, "rgba(0,0,0,0.5)", 2);
    texto.setTextBounds(0, 0, 410, 10);
    //texto.setTextBounds(0, this.game.world.centerY, this.game.world.width, 50);
    //texto.anchor.setTo(-0.7, 6);
  },
  actionButtonContinue: function () {
    this.game.state.start("Play", true, false, this.points);
  },
};
