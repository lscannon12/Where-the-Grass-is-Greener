import playerData from '../classes/playerData.json' assert {type: 'json'};
import Game from '../classes/game.js';
import dialogue from '../classes/dialogue.json' assert {type: 'json'};
import Player from '../classes/player.js';
export default class Intro_01 extends Phaser.Scene {

    constructor() {
        super('Intro_01');
    }



    create() {
        this.add.image(250, 150, 'background').setScale(2)
        //CLASS INITIALIZATION
        let player = new Player();
        const game = new Game(this, 0);


        ////ANIMATION STRUCT
        const deadFire =
        {
            key: 'unsetFire',
            frames: this.anims.generateFrameNumbers("fire", { start: 0, end: 0 }),
            frameRate: 7,
            repeat: 0
        }

        const fullStepOne = {
            key: '_stepOne',
            frames: this.anims.generateFrameNumbers("fullWalk", { start: 0, end: 3 }),
            frameRate: 7,
            repeat: 5
        };
        const fullStepTwo = {
            key: '_stepTwo',
            frames: this.anims.generateFrameNumbers("fullWalk", { start: 4, end: 6 }),
            frameRate: 7,
            repeat: 5
        };
        const squatDown = {
            key: '_squatDown',
            frames: this.anims.generateFrameNumbers("fullWalk", { start: 8, end: 12 }),
            frameRate: 7,
            repeat: 5
        };

        //LIST OF ANIMATIONS FOR THE MAIN SPRITE OBJECT
        let animList = [fullStepOne, fullStepTwo, squatDown];
        let order = [2];
        this.anims.create(fullStepOne);
        this.anims.create(fullStepTwo);
        this.anims.create(squatDown);
        this.anims.create(deadFire);

        //VAR TO CHECK WHICH FOOT WILL BE INVOLVED IN THE NEXT STEP
        //USED IN THE SPRITES CALLBACK FUNCTION
        let intro_sprite = this.add.sprite(50, 220, 'fullWalk');
        const fireSprite = this.add.sprite(300, 260, 'fire');
        fireSprite.setScale(2);
        intro_sprite.setScale(2);

        //fireSprite.play('unsetFire');
        //if (game.walkMemble(this, intro_sprite, intro_sprite.x, 100, animList))
        //  game.animateFromList(this, intro_sprite, animList, order)
        //game.walkMemble(this, intro_sprite, intro_sprite.x, 200, animList);
        intro_sprite.playAfterDelay("_stepOne", 1000);




    }


    update() {

    }


}