import playerData from '../classes/playerData.json' assert {type: 'json'};
import Game from '../classes/game.js';
import dialogue from '../classes/dialogue.json' assert {type: 'json'};
import Player from '../classes/player.js';
let charColor = '';
export default class MainScreen extends Phaser.Scene {

  constructor() {
    super('MainScreen');
  }

  preload() {
    charColor = playerData.characterType;
    this.load.image(charColor, './src/assets/editCharacter_assets/BODIES/' + charColor + '.png');
    this.load.image('main_background', './src/assets/mainScreen/background.png');
    this.load.image('workbench', './src/assets/mainScreen/workbench.png');
    this.load.image('settingsButton', './src/assets/mainScreen/settings.png');
    this.load.image('dialogue', './src/assets/mainScreen/dialogue_frame.png');
    this.load.image('wyrn', './src/assets/mainScreen/wyrn.png');
    this.load.image('resources', './src/assets/mainScreen/resources.png');
    this.load.image('scvg_btn', './src/assets/mainScreen/scavenge_button.png');
    this.load.image('scvg_pnl', './src/assets/mainScreen/scavenge_panel.png');
  }

  create() {
    //CLASS INITIALIZATION
    let player = new Player();
    const game = new Game();
    ////SET IMAGES TO SCREEN
    this.add.image(250, 150, 'main_background');
    this.add.image(250, 150, charColor).setScale(1);
    this.add.image(100, 125, 'wyrn').setScale(2);
    this.add.image(50, 30, 'resources').setScale(1.5);
    ////

    ////INTERACTIVE ELEMENTS
    const dialogue_var = this.add.image(250, 240, 'dialogue').setInteractive();
    const scavenge_btn = this.add.image(25, 80, 'scvg_btn').setInteractive();
    const scavenge_opt01 = this.add.image(25, 120, 'scvg_btn').setInteractive();
    //const scavenge_panel = this.add.image(40, 123, 'scvg_pnl').setInteractive();
    this.add.image(475, 25, 'settingsButton').setScale(2).setInteractive();
    //// 

    ////DIALOGUE SETUP
    let dialogue_text = this.label = this.make.text({
      x: 75, y: 210,
      text: '',
      style: { font: 'bold 15px KARMASUT', fill: '#2e3850', wordWrap: { width: 350, useAdvancedWrap: true } }
    });
    ////

    //// ITEM COUNTER SETUP
    let itemCounter_text0 = this.add.text(18, 32, "0", { font: 'bold 15px KARMASUT', fill: "#2e3850" });
    let itemCounter_text1 = this.add.text(47, 32, "0", { font: 'bold 15px KARMASUT', fill: "#2e3850" });
    let itemCounter_text2 = this.add.text(75, 32, "0", { font: 'bold 15px KARMASUT', fill: "#2e3850" });
    let itemCounterArr = [itemCounter_text0, itemCounter_text1, itemCounter_text2];
    console.log('items: ' + itemCounter_text0);
    ////

    ////TUTORIAL
    if (playerData.firstTimePlaying = "true") {
      let dialogue_length = dialogue.wyrn.tutorial.tutorial_dialogue[0].length;
      game.gameDialogue(this, dialogue.wyrn.tutorial.tutorial_dialogue, dialogue_length - 1, 2, 0, dialogue_var);
    }
  }


  update() {

  }


}
