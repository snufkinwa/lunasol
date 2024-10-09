var game;
window.onload = function () {
  let gameConfig = {
    type: Phaser.CANVAS,
    width: 300,
    height: 300,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: {
          y: 0,
        },
      },
    },
    scene: [preloadGame, mainMenu, moonParallax],
  };
  game = new Phaser.Game(gameConfig);
};
