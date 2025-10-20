(function () {
  game = new Phaser.Game(480, 320, Phaser.CANVAS, "gamer-container");

  game.state.add("Game", Game);

  game.state.start("Game");
})();
