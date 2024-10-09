class moonParallax extends Phaser.Scene {
  constructor() {
    super("MoonParallax");
  }

  create() {
    this.stars = this.add
      .tileSprite(0, 0, game.config.width, game.config.height, "stars")
      .setOrigin(0, 0)
      .setScrollFactor(0);

    // Updated earth to tileSprite
    this.earth = this.add
      .image(0, 0, "earth")
      .setScale(1.25)
      .setOrigin(0, 0)
      .setScrollFactor(0);

    this.moonSurface1 = this.add
      .image(0, game.config.height - 200, "moon_surface")
      .setOrigin(0, 0)
      .setScrollFactor(0);

    this.moonSurface2 = this.add
      .image(game.config.width, game.config.height - 200, "moon_surface")
      .setOrigin(0, 0)
      .setScrollFactor(0);

    this.astronaut = this.physics.add
      .sprite(100, game.config.height - 75, "astronaut")
      .setScale(2);

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("astronaut", {
        start: 0,
        end: 10,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("astronaut", {
        start: 10,
        end: 20,
      }),
      frameRate: 30,
      repeat: -1,
    });

    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("astronaut", {
        start: 74,
        end: 84,
      }),
      frameRate: 30,
      repeat: 0,
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.satelite = this.cameras.main;
    this.satelite.setBounds(0, 0, game.config.width * 5, game.config.height); // Ensure world bounds are larger
    this.satelite.startFollow(this.astronaut, true, 0.1, 0.1);
  }

  update() {
    let isRunning = false;
    let isJumping = false;

    if (this.cursors.shift.isDown) {
      isRunning = true;
    }

    if (this.cursors.up.isDown) {
      console.log("jump");
      isJumping = true;
      this.astronaut.anims.play("jump", true);
    }

    if (this.cursors.left.isDown) {
      if (isRunning) {
        this.astronaut.setVelocityX(-100);
        this.astronaut.anims.play("run", true);
      } else {
        this.astronaut.setVelocityX(-60);
        this.astronaut.anims.play("walk", true);
      }
      this.astronaut.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      if (isRunning) {
        this.astronaut.setVelocityX(100);
        this.astronaut.anims.play("run", true);
      } else {
        this.astronaut.setVelocityX(60);
        this.astronaut.anims.play("walk", true);
      }
      this.astronaut.setFlipX(false);
    } else {
      this.astronaut.setVelocityX(0);
      this.astronaut.anims.stop();
      this.astronaut.setFrame(0);
    }

    if (this.cursors.up.isDown && this.astronaut.body.touching.down) {
      this.astronaut.setVelocityY(-330);
    }

    // Parallax scrolling
    this.stars.tilePositionX = this.satelite.scrollX * 0.3;
    if (this.astronaut.body.velocity.x !== 0) {
      this.earth.x -= this.astronaut.body.velocity.x * 0.01;
    }

    // Moon parallax with vertical loop effect
    if (this.astronaut.body.velocity.x !== 0) {
      this.moonSurface1.tilePositionX += this.astronaut.body.velocity.x * 0.01;
      this.moonSurface2.tilePositionX += this.astronaut.body.velocity.x * 0.01;
    }

    // Loop the moon surfaces horizontally
    if (this.moonSurface1.x + game.config.width <= 0) {
      this.moonSurface1.x = this.moonSurface2.x + game.config.width;
    }

    if (this.moonSurface2.x + game.config.width <= 0) {
      this.moonSurface2.x = this.moonSurface1.x + game.config.width;
    }
  }
}
