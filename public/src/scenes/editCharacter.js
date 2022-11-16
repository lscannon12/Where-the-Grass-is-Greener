import playerData from '../classes/playerData.json' assert {type: 'json'};

class EditCharacter extends Phaser.Scene
{


  constructor()
  {
    super('EditCharacter');
  }

  init(){}

  preload()
  {

    //HEADS
    this.load.image('originalHead', './src/assets/editCharacter_assets/HEADS/head_original.png');
    this.load.image('blueHead', './src/assets/editCharacter_assets/HEADS/head_blue.png');
    this.load.image('redHead', './src/assets/editCharacter_assets/HEADS/head_red.png');
    this.load.image('greenHead', './src/assets/editCharacter_assets/HEADS/head_green.png');
    this.load.image('blackHead', './src/assets/editCharacter_assets/HEADS/head_black.png');
    this.load.image('pinkHead', './src/assets/editCharacter_assets/HEADS/head_pink.png');
    this.load.image('whiteHead', './src/assets/editCharacter_assets/HEADS/head_white.png');
    this.load.image('yellowHead', './src/assets/editCharacter_assets/HEADS/head_yellow.png');

    //BODIES
    this.load.image('blueHeadBody', './src/assets/editCharacter_assets/BODIES/blue_body.png');
    this.load.image('originalHeadBody', './src/assets/editCharacter_assets/BODIES/original_body.png');
    this.load.image('greenHeadBody', './src/assets/editCharacter_assets/BODIES/green_body.png');
    this.load.image('blackHeadBody', './src/assets/editCharacter_assets/BODIES/black_body.png');
    this.load.image('pinkHeadBody', './src/assets/editCharacter_assets/BODIES/pink_body.png');
    this.load.image('redHeadBody', './src/assets/editCharacter_assets/BODIES/red_body.png');
    this.load.image('whiteHeadBody', './src/assets/editCharacter_assets/BODIES/white_body.png');
    this.load.image('yellowHeadBody', './src/assets/editCharacter_assets/BODIES/yellow_body.png');


    this.load.image('Editbackground', './src/assets/editCharacter_assets/background.png');
    this.load.image('edit_message', './src/assets/editCharacter_assets/edit_message.png');
    this.load.spritesheet('edit_frame', './src/assets/editCharacter_assets/memble_frame-Sheet.png',{frameWidth: 47, frameHeight: 86});
    this.load.spritesheet('select_button', './src/assets/editCharacter_assets/select_button-Sheet.png', {frameWidth: 16, frameHeight: 25});
  }

  create()
  {
    this.add.image(250, 150, 'Editbackground');
    let chosenType = '';

    const editConfig = {
            key: 'cloud',
            frames: 'edit_frame',
            frameRate: 5,
            repeat: -1
        };

  const selectConfig = {
          key: 'select',
          frames: 'select_button',
          frameRate: 2,
          repeat: -1
      };

    this.anims.create(editConfig);
    this.anims.create(selectConfig);
    const editFrame = this.add.sprite(120, 143, 'edit_frame');
    const select_button = this.add.sprite(470, 265, 'select_button').setScale(2).setInteractive();

    let bodyType = this.add.sprite(120, 165, 'originalHeadBody').setScale(2.5);
    //this.add.image(250, 50, 'edit_message'); //*******TO BE ADDED LATER

    //HEADS FOR INTRO SELECTION
    this.add.sprite(250, 100, 'originalHead').setScale(2).setAlpha(0.5).setInteractive();
    this.add.sprite(325, 100, 'blueHead').setScale(2).setAlpha(0.5).setInteractive();
    this.add.sprite(400, 100, 'redHead').setScale(2).setAlpha(0.5).setInteractive();
    this.add.sprite(250, 175, 'greenHead').setScale(2).setAlpha(0.5).setInteractive();
    this.add.sprite(325, 175, 'blackHead').setScale(2).setAlpha(0.5).setInteractive();
    this.add.sprite(400, 175, 'pinkHead').setScale(2).setAlpha(0.5).setInteractive();
    this.add.sprite(285, 250, 'yellowHead').setScale(2).setAlpha(0.5).setInteractive();
    this.add.sprite(360, 250, 'whiteHead').setScale(2).setAlpha(0.5).setInteractive();
    editFrame.setScale(3.25);
    editFrame.play('cloud');
    select_button.play('select');



    this.input.on('pointerover', function (event, gameObjects) {
      if(gameObjects[0].texture.key.includes('Head'))
        gameObjects[0].setAlpha(1);

    });

    this.input.on('pointerout', function (event, gameObjects) {
      if(gameObjects[0].texture.key.includes('Head'))
        gameObjects[0].setAlpha(0.5);
    });

    this.input.on('pointerup', function (event, gameObjects) {
      if(gameObjects[0].texture.key.includes('Head'))
      {
        console.log(gameObjects[0].texture.key);
        let type = gameObjects[0].texture.key;
        type = type + 'Body';
        chosenType = type;
        bodyType.setTexture(type);
      }
    });

    //WHERE THE PLAYER DATA AND SELECTION IS CHANGED IN THE JSON FILE
    select_button.on('pointerup', () => {
       console.log(playerData.characterType);
       playerData.characterType = chosenType;
       console.log('Selection chosen: ' + playerData.characterType);
       this.scene.switch('MainScreen');
     });

  }

}

export default EditCharacter;
