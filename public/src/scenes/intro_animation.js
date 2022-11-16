import Game from "../classes/game.js";
export default class Intro_Animation extends Phaser.Scene {
  constructor() {
    super('Intro_Animation');
  }


  intro() { }

  preload() {
    this.load.image('intro_background', './src/assets/startingScreen/opening02.png');
  }

  create() {

    const game = new Game();

    const screen = this.add.image(250, 150, 'intro_background').setScale(2).setInteractive();

    screen.on('pointerup', () => {
      this.scene.switch('Intro_01');
    });

  }
}
