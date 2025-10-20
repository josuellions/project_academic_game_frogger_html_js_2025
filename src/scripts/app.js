(function () {
  var width = 320;
  var proportion = window.innerHeight / window.innerWidth;

  var game = new Phaser.Game(
    width,
    Math.ceil(width * proportion),
    Phaser.CANVAS,
    "gamer-container"
  );

  // Força recriação do contexto com flag 'willReadFrequently'
  if (game.renderer && game.renderer.context) {
    var oldCanvas = game.renderer.canvas;
    var ctx = oldCanvas.getContext("2d", { willReadFrequently: true });
    if (ctx) {
      game.renderer.context = ctx;
    }
  }

  // game.state.add("Game", Game);
  // game.state.start("Game");

  game.state.add("Boot", Boot);
  game.state.start("Boot");
})();
