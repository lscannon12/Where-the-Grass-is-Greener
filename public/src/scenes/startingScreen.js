console.log('accessed class StartingScreen');

class StartingScreen extends Phaser.Scene
{
  constructor()
  {
    super('StartingScreen');
  }

  init(){}

  preload()
  {
    this.load.image('background', './src/assets/startingScreen/opening.png');
  }

  create()
  {
    this.add.image('250', '150', 'background').setScale(0.85);

    this.input.on('pointerdown', function (pointer) {
            this.scene.switch('EditCharacter');
            console.log('changed scene to EditCharacter');
        }, this);
  }

}

console.log('started scene StartingScreen');

export default StartingScreen;
