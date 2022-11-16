import playerData from "../classes/playerData.json" assert {type: "json"};

class Game extends Phaser.Scene {
    //items: the 'items' icon on the top left screen
    constructor(items) {
        super(items);
        this.items = items;
    }

    preload() {
        this.load.spritesheet('fullWalk', './src/assets/memble_anim/full_walk-Sheet.png', { frameWidth: 40, frameHeight: 64 });
    }

    typewriteText(scene, lines, size, repeat, index, image = null) {
        repeat -= 1;
        console.log(scene);
        let i = 0 //iter of array
        let length = lines[index].length;
        let delta = 0;
        scene.time.addEvent({
            callback: () => {
                if (image != null && image.visible == false) {
                    console.log('image is not visible, hiding dialogue.');
                    return;
                }
                scene.label.text += lines[index][i];
                ++i;
                ++delta;
                if (delta == length) {
                    return;
                }
            },
            repeat: size,
            delay: 50
        });

        return "Finished";
    }

    gameDialogue(scene, lines, size, repeat, index, image = null) {
        let numLines = 0; //placeholder to let us know which text line to go next
        let lineTracker = lines[numLines]; //tracks which index of text were on currently
        if (numLines == size)
            image.setVisible(false);
        console.log("image: " + image);
        this.typewriteText(scene, lines, size, repeat, index, image);
        image.on('pointerup', function (pointer) {
            if (lineTracker == scene.label.text) {
                console.log('clicked');
                numLines++;
                scene.label.setText('');

                if (numLines < lines.length) {
                    console.log('committing to text');
                    this.typewriteText(scene, lines, lines[numLines].length - 1, repeat, numLines, image);
                    lineTracker = lines[numLines];
                }
                console.log('numLines :' + numLines);
            }
            if (numLines == repeat)
                image.setVisible(false);
        }, this);
    }

    ////MEMBLE ANIMATION SECTION
    /////-----------------------------
    //---------WALK MEMBLE-----------
    /////-----------------------------
    /////--PARAMETER LIST
    /////-SCENE: the scene from which the animations are passed
    /////-SPRITE: The sprite which is passed from the scene to the Game class.
    /////-ANCHORPOINT: Pixel coordinatates, or x-coord, of reference to dictate from where the \
    /////              Sprite is to be moved
    /////-ANIMATIONS: List of animation structs for the Sprite to use.
    /////             Must be from the same spritesheet.
    /////--RETURNS: Value 'true', to indicate that the walking has stopped
    /////--------------------------------
    walkMemble(scene, sprite, anchorPoint, distance, animations) {
        console.log(animations[0]);
        sprite.play(animations[0].key);
        sprite.playAfterRepeat(animations[0].key);
        let swapFeet = false;
        let distanceX = distance;
        console.log('PLAYED ANIMATION FROM KEY');
        sprite.on('animationcomplete', () => {
            sprite.x += 24;
            distance -= 24;
            console.log('distance to go: ' + distance);
            if (distance > 0) {
                if (swapFeet === false) {
                    sprite.play(animations[1].key);
                    swapFeet = true;
                }
                else {
                    console.log('playing key');

                    //sprite.play(animations[0].key);
                    swapFeet = false;
                }
            }
            else
                return true;
        });
        return false;
    }
    /////-----------------------------
    //---------animateFromList----------
    /////-----------------------------
    /////--PARAMETER LIST
    /////-SCENE: the scene from which the animations are passed
    /////-SPRITE: The sprite which is passed from the scene to the Game class.
    /////-ANIMATIONS: List of animation structs for the Sprite to use.
    /////             Must be from the same spritesheet.
    /////--ORDER: list of which anims to play for sprite
    /////--------------------------------

    animateFromList(scene, sprite, animations, order) {
        console.log('Playing secondary sprite');
        sprite.play(animations[order[0]].key);
    }

    ////UPDATES FOR SCAVENGED ITEM COUNTER
    updateItemCount(scene, array, index, num) {
        array[index].setText(num);
    }
    addItemCount(scene, array, index, num) {
        array[index].text = parseInt(array[index].text) + num;
    }
    subItemCount(scene, array, index, num) {
        array[index].text = parseInt(array[index].text) - num;
    }
    ////
    create() {
    }


}

export default Game;

/*lines: array of sentences  //lines: array of sentences
    //size: length of initial string
    //repeat: # items in array
    //index: always starts at 0, starting position for lines[]
    //image: sprite that textbox is being written on
    /*  typewriteText(scene, lines, size, repeat, index, image = null) {
          repeat -= 1;
          console.log(scene);
          let i = 0 //iter of array
          let length = lines[index].length;
          let delta = 0;
          scene.time.addEvent({
              callback: () => {
                  if (image != null && image.visible == false) {
                      console.log('image is not visible, hiding dialogue.');
                      return;
                  }
                  scene.label.text += lines[index][i];
                  ++i;
                  ++delta;
                  if (delta == length) {
                      scene.time.addEvent({
                          callback: () => {
                              delta = 0;
                              i = 0;
                              //
                              index += 1;
                              if (repeat > 0) {
                                  scene.label.setText('');
                                  this.typewriteText(scene, lines, lines[index].length - 1, repeat, index);
                              }
                              else {
                                  return;
                              }
                          },
                      });
                  }
              },
              repeat: size,
              delay: 50
          });
      }*/