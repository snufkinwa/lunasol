class preloadGame extends Phaser.Scene {
  constructor() {
    super("preloadGame");
  }

  preload() {
    this.load.on("filecomplete", (key) => {
      console.log(`${key} loaded successfully`);
    });

    this.load.on("loaderror", (file) => {
      console.error(`Failed to load: ${file.src}`);
    });

    this.load.spritesheet("arrowLeft", "assets/ARROWLEFT.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("arrowRight", "assets/ARROWRIGHT.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("shift", "assets/SHIFT.png", {
      frameWidth: 42,
      frameHeight: 16,
    });

    this.load.image("stars", "./assets/stars.png");
    this.load.image("earth", "./assets/earth.png");
    this.load.image("moon_surface", "./assets/moon_surface.png");
    this.load.spritesheet("astronaut", "./assets/Astronaut_10x9.png", {
      frameWidth: 50,
      frameHeight: 50,
    });
  }
  create() {
    this.scene.start("MainMenu");
  }
}
