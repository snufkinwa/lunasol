class mainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  preload() {
    // Preload any assets for the menu here
  }

  create() {
    // Add a title for the main menu
    this.add.text(game.config.width * 0.32, 100, "LunaSol", {
      align: "center",
      fontFamily: "'Pixelify Sans', sans-serif",
      fontSize: "32px",
      fill: "#fff",
    });

    // Capture the space bar input to start the game
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.anims.create({
      key: "leftArrowAnim",
      frames: this.anims.generateFrameNumbers("arrowLeft", {
        start: 0,
        end: 2,
      }), // Adjust end based on the number of frames
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: "rightArrowAnim",
      frames: this.anims.generateFrameNumbers("arrowRight", {
        start: 0,
        end: 2,
      }),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: "shiftAnim",
      frames: this.anims.generateFrameNumbers("shift", { start: 0, end: 2 }),
      frameRate: 3,
      repeat: -1,
    });

    // Add animated tile sprites
    this.arrowLeft = this.add
      .sprite(150, 180, "arrowLeft")
      .play("leftArrowAnim");
    this.arrowRight = this.add
      .sprite(170, 180, "arrowRight")
      .play("rightArrowAnim");
    this.shift = this.add.sprite(160, 230, "shift").play("shiftAnim");
    this.add.text(
      game.config.width * 0.3,
      200,
      "Instructions: \nUse arrow keys to move + shift to run",
      {
        align: "center",
        fontFamily: "'Pixelify Sans', sans-serif",
        fontSize: "8px",
        fill: "#fff",
      }
    );

    // Add instructions for how to play
    this.add.text(game.config.width * 0.25, 280, "Press SPACE to start", {
      align: "center",
      fontFamily: "'Pixelify Sans', sans-serif",
      fontSize: "16px",
      fill: "#fff",
    });
  }

  update() {
    // When space is pressed, start the moonParallax scene
    if (this.spaceBar.isDown) {
      this.scene.start("MoonParallax");
    }
  }
}
