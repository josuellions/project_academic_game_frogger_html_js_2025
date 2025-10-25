var Play = function (game) {};

Play.prototype = {
  init: function (points) {
    this.points = points != null && points != undefined ? points : 0;
    var estilo = { font: "bold 20px Arial", fill: "#fff" };
    var textPoints = this.points > 1 ? " pontos" : " ponto";
    var texto = this.game.add.text(8, 8, this.points + textPoints, estilo);

    texto.setShadow(1, 1, "rgba(0.0.0.0.5", 2);
  },
  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.createScene();
    this.createTreasury();
    this.createBushes();
    this.createPlayer();
    this.createVehicle();
    this.createButtons();

    this.keyboard = this.game.input.keyboard.createCursorKeys();
    this.buttonActive = "";
  },
  update: function () {
    //Colisão com elementos
    this.game.physics.arcade.overlap(
      this.player,
      this.vehicles,
      this.collidesWithVehicle,
      null,
      this
    );
    this.game.physics.arcade.collide(this.player, this.bushes);

    this.game.physics.arcade.overlap(
      this.player,
      this.treasury,
      this.collidesWithTreasury,
      null,
      this
    );

    this.updateVehicles();
    this.checkKey();
  },
  createScene: function () {
    var referenceRandom = 64;
    var referenceHeight = 96;
    var referenceConstruction = 32;
    this.game.stage.backgroundColor = "#82bb65";

    var amount = Math.floor(
      (this.game.height - referenceHeight) / referenceRandom
    );
    this.road = [referenceRandom];

    for (var i = 0; i < amount - 1; i++) {
      if (
        this.road[i] > this.game.height - referenceHeight ||
        this.road[i] < referenceRandom
      ) {
        break;
      }

      var space = this.game.rnd.integerInRange(1, 2);

      this.game.add.tileSprite(
        0,
        this.road[i],
        this.game.width,
        referenceRandom,
        "road",
        0
      );

      this.road.push(
        this.road[i] + referenceRandom + space * referenceConstruction
      );
    }
  },
  createTreasury: function () {
    this.treasury = this.game.add.sprite(
      this.game.world.centerX,
      this.game.world.height - 64,
      "treasure"
    );
    this.treasury.anchor.setTo(0.5, 0);

    this.game.physics.arcade.enable(this.treasury);
    this.treasury.enableBody = true;
  },
  createBushes: function () {
    this.bushes = this.game.add.group();

    this.game.physics.arcade.enable(this.bushes);
    this.bushes.enableBody = true;

    var amount = Math.floor(this.game.width / 32);

    for (var y = 0; y < this.road.length - 1; y++) {
      for (var x = 0; x < amount; x++) {
        if (this.game.rnd.integerInRange(0, 10) > 5) {
          continue;
        }

        var arbusto = this.bushes.create(x * 32, this.road[y] + 64, "bush");

        arbusto.body.setSize(26, 26, 3, 3);

        arbusto.body.immovable = true;
        arbusto.body.moves = false;
      }
    }
  },
  createPlayer: function () {
    this.player = this.game.add.sprite(this.game.world.centerX, 16, "player");

    this.player.animations.add("up", [0, 1, 2, 1]);
    this.player.animations.add("down", [6, 7, 8, 7]);
    this.player.animations.add("left", [9, 10, 11, 10]);
    this.player.animations.add("right", [3, 4, 5, 4]);

    this.game.physics.arcade.enable(this.player);
    this.player.enableBody = true;

    this.player.body.setSize(18, 28, 7, 10);

    this.player.body.collideWorldBounds = true;

    this.player.animations.play("down", 7, true);
  },
  createVehicle: function () {
    this.vehicles = this.game.add.group();

    this.game.physics.arcade.enable(this.vehicles);
    this.vehicles.enableBody = true;

    var vehicleType = ["brownPickupVehicle", "brownPickupTruck"];
    direction = ["Right", "Left"];

    for (var i = 0; i < this.road.length - 1; i++) {
      var tipo =
        vehicleType[this.game.rnd.integerInRange(0, vehicleType.length - 1)];

      var vehicle = this.vehicles.create(32, this.road[i] - 16, tipo);

      if (tipo === "brownPickupVehicle") {
        vehicle.body.setSize(105, 43, 0, 19);
      } else {
        vehicle.body.setSize(130, 43, 2, 19);
      }

      vehicle.animations.add("goRight", [0, 1]);
      vehicle.animations.add("goLeft", [2, 3]);

      vehicle.direction =
        direction[this.game.rnd.integerInRange(0, direction.length - 1)];

      if (vehicle.direction === "Right") {
        vehicle.body.velocity.x = this.game.rnd.integerInRange(80, 150);
      } else {
        vehicle.body.velocity.x = -this.game.rnd.integerInRange(80, 150);
      }

      vehicle.animations.play(
        "go" + vehicle.direction,
        this.game.rnd.integerInRange(4, 7),
        true
      );
    }
  },
  updateVehicles: function () {
    this.vehicles.forEach(function (vehicle) {
      if (vehicle.direction === "Right" && vehicle.x > this.game.width) {
        vehicle.x = -vehicle.width;
        vehicle.body.velocity.x = this.game.rnd.integerInRange(80, 150);
      } else if (vehicle.direction === "Left" && vehicle.x < -vehicle.width) {
        vehicle.x = this.game.width;
        vehicle.body.velocity.x = -this.game.rnd.integerInRange(80, 150);
      }
    }, this);
  },
  createButtons: function () {
    const height = 78;
    var buttonLeft = this.game.add.button(
      4,
      this.game.height - height,
      "buttonsGame",
      null,
      this,
      4,
      0,
      4
    );

    buttonLeft.name = "Left";
    buttonLeft.events.onInputDown.add(this.buttonPressed, this);
    buttonLeft.events.onInputUp.add(this.buttonLoose, this);

    var buttonRight = this.game.add.button(
      78,
      this.game.height - height,
      "buttonsGame",
      null,
      this,
      5,
      1,
      5
    );

    buttonRight.name = "Right";
    buttonRight.events.onInputDown.add(this.buttonPressed, this);
    buttonRight.events.onInputUp.add(this.buttonLoose, this);

    var buttonUp = this.game.add.button(
      this.game.width - 138,
      this.game.height - height,
      "buttonsGame",
      null,
      this,
      6,
      2,
      6
    );

    buttonUp.name = "Up";
    buttonUp.events.onInputDown.add(this.buttonPressed, this);
    buttonUp.events.onInputUp.add(this.buttonLoose, this);

    var buttonDown = this.game.add.button(
      this.game.width - 62,
      this.game.height - height,
      "buttonsGame",
      null,
      this,
      7,
      3,
      7
    );

    buttonDown.name = "Down";
    buttonDown.events.onInputDown.add(this.buttonPressed, this);
    buttonDown.events.onInputUp.add(this.buttonLoose, this);
  },
  buttonPressed: function (button) {
    this.buttonActive = button.name;
  },
  buttonLoose: function () {
    this.buttonActive = "";
  },
  checkKey: function () {
    const keys = ["up", "down", "left", "right"];
    var movePlayer = {
      default: {
        velocityX: 0,
        velocityY: 0,
      },
      left: {
        velocityX: -80,
        velocityY: 0,
      },
      right: {
        velocityX: 80,
        velocityY: 0,
      },
      down: {
        velocityX: 0,
        velocityY: 80,
      },
      up: {
        velocityX: 0,
        velocityY: -80,
      },
    };

    const actionKeyboard = keys.find((key) => this.keyboard[key].isDown);

    const pressKeyMove = actionKeyboard || this.buttonActive || "default";

    const move = movePlayer[pressKeyMove.toLowerCase()];

    this.player.animations.play(pressKeyMove.toLowerCase(), 7, true);
    this.player.body.velocity.x = move.velocityX;
    this.player.body.velocity.y = move.velocityY;
  },
  collidesWithVehicle: function () {
    if ("vibrate" in window.navigator) {
      window.navigator.vibrate(200);
    }

    var sound = this.game.add.audio("gameEnd");
    sound.play();

    //setTimeout(function () {
    var evt = this.time.events.add(
      Phaser.Timer.SECOND * 0.5,
      function () {
        this.game.state.start("GameOver", true, false, this.points);
        this.time.events.remove(evt); // remove manualmente
      },
      this
    );
    //}, 1000);
  },
  collidesWithTreasury: function () {
    this.points++;

    var sound = this.game.add.audio("gamePoints");
    sound.play();

    this.game.state.start("Score", true, false, this.points);
  },
};
