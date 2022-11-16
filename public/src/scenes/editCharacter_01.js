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
    this.load.image('head01', './src/assets/woodland_tramp/head01.png')
    this.load.image('head02', './src/assets/woodland_tramp/head02.png')
    this.load.image('head03', './src/assets/woodland_tramp/head03.png')
    this.load.image('screen', './src/assets/startingScreen/blank.png');
    this.load.image('frame', './src/assets/woodland_tramp/frame_head.png');
  }

  create()
  {
    this.add.image('250', '150', 'screen');
    this.add.image('250', '250', 'frame').setScale(2);
    this.add.text(40, 25, 'Pick Your Head', { fontFamily: 'Karma, "Goudy Bookletter 1911", Times, serif' }).setFontSize(60);

    var heads = [];
    heads.push(this.add.sprite('175', '150', 'head01'));
    heads.push(this.add.sprite('250', '150', 'head02'));
    heads.push(this.add.sprite('325', '150', 'head03'));

    heads[0].setScale(2);
    heads[1].setScale(2);
    heads[2].setScale(2);

    var totalHeads = heads.length;
    var gameWidth = 500;
    var gameHeight = 300;
    var originalPositions = [];
    var nextHead = -1;
    var currentHead = nextHead;

    // SET INTERACTIVITY FOR EACH ITEM IN THE LIST
    heads.forEach(function (item) {
      console.log('ran heads');
      originalPositions.push({x: item.x, y: item.y}); //SNAG ORIGINAL COORDINATES OF ITEMS
      item.setInteractive(); //PHASER3 INTERACTIVE NOTATION
      //vvv passes func with parameter AS A parameter
      item.on('pointerdown', function() {clickListener(item)});
    });


     function clickListener (item)
     {
      console.log(heads.indexOf(item));
      if(nextHead == heads.indexOf(item)) //IF SAME HEAD CLICKED, DO NOTHING
      {
        return;
      }
      else if(nextHead != heads.indexOf(item))
      {
        heads[heads.indexOf(item)].x = 250; //MOVE HEAD TO FRAME
        heads[heads.indexOf(item)].y = 245;
        if(nextHead > -1)
        {
          heads[nextHead].x = originalPositions[nextHead].x; //SET HEAD IN FRAME TO ORIGINAL POSITION
          heads[nextHead].y = originalPositions[nextHead].y;
        }
        for (var i = 0; i < heads.length; i++)
        {
          if(heads[i] != heads.indexOf(item)) //CHANGE OPACITY OF NON-FRAME HEADS
            heads[i].alpha = 0.5;
        }
        heads[heads.indexOf(item)].alpha = 1;
      }
      nextHead = heads.indexOf(item);
      console.log('Original Position: ' + originalPositions[heads.indexOf(item)].x + ", " + originalPositions[heads.indexOf(item)].y);
     }

     var startButton = this.add.text(325, 225, 'select', 'Humanoid')
     .setPadding(10)
     .setStyle({ backgroundColor: '#ffe1a1' })
     .setInteractive({ useHandCursor: true })
     .on('pointerover', () => startButton.setStyle({ fill: '#f39c12' }))
     .on('pointerout', () => startButton.setStyle({ fill: '#FFF' }))
     .on('pointerdown', () => {
   playerData.characterBuild = heads[nextHead].texture.key;
   console.log(playerData.characterBuild);
   this.scene.switch('Intro_Animation');
   console.log('changed scene to EditCharacter');
 });
}

}

export default EditCharacter;
