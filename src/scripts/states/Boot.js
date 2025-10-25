var Boot = function (game) {};

Boot.prototype = {
  init: function () {
    //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    //this.scale.forceOrientation(true, false);
    //this.scale.forceOrientation(false, true);
    this.scale.updateLayout(true);
    this.scale.refresh();

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Tratativas para dispositivos IOs
    // Fallback para iOS travando o loop
    if (Phaser.Device.iOS) {
      this.game.forceSingleUpdate = true;
      setInterval(() => this.game.update(), 1000 / 30);
    }

    // Desbloquear áudio no primeiro toque (iOS Safari)
    const self = this;
    function unlockAudio() {
      if (self.game.sound.context.state === "suspended") {
        self.game.sound.context.resume();
        console.log("🎵 Áudio desbloqueado!");
      }
      window.removeEventListener("touchstart", unlockAudio, true);
      window.removeEventListener("mousedown", unlockAudio, true);
    }
    window.addEventListener("touchstart", unlockAudio, true);
    window.addEventListener("mousedown", unlockAudio, true);

    // Listener pra quando o Safari pausa o jogo
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) {
        self.game.paused = false;
      }
    });
    // End

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
    //this.game.state.start("Score");
  },
};
