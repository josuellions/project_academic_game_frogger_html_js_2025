var Boot = function (game) {};

Boot.prototype = {
  init: function () {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    //this.scale.forceOrientation(true, false);
    //this.scale.forceOrientation(false, true);
    this.scale.updateLayout(true);
    this.scale.refresh();

    this.input.maxPointers = 1;
    this.input.addPointer();
  },
  create: function () {
    this.game.state.add("Play", Play);
    this.game.state.add("Menu", Menu);
    this.game.state.add("Preload", Preload);
    this.game.state.add("Splash", Splash);
    this.game.state.add("Score", Score);
    this.game.state.add("GameOver", GameOver);

    this.game.state.start("Splash");
    //this.game.state.start("Play");
  },
};
