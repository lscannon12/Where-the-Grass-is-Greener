//SCENES
import EditCharacter from './src/scenes/editCharacter.js';
import StartingScreen from './src/scenes/startingScreen.js';
import Intro_Animation from './src/scenes/intro_animation.js';
import MainScreen from './src/scenes/mainScreen.js';
import Intro_01 from './src/scenes/Intro_01.js';
//CLASSES
import Player from './src/classes/player.js';

export const PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,

        // The backing store size in relation to the canvas element
        bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1

    return dpr / bsr
})();

var config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: 500,
    height: 300,
    resolution: PIXEL_RATIO,
    scene: [Intro_Animation, Intro_01, EditCharacter, MainScreen],
    backgroundColor: '#000000'
};

var game = new Phaser.Game(config);
