var ground;
var tree;
var gameLoading = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    
    function gameLoading() {
        Phaser.Scene.call(this, {key: 'gameLoading', active: true});
    },
        
    preload: function ()
    {   
        this.load.image('mCircle2', 'mCircle1.png');
        this.load.image('mCircle', 'mCircle4.png');
        this.load.image('sky', 'sky.png');
        
        this.load.image('rock', 'rock.png');
        this.load.image('ground3', 'testGround.png');
    },
    create: function() {
        
        crystal = this.physics.add.staticImage(500,575,'crystal').setBlendMode(Phaser.BlendModes.DIFFERENCE);
        crystal.rotation += 0.8;

        this.add.image(500,200,'sky');

        this.physics.add.staticImage(500,75,'mCircle').setBlendMode(Phaser.BlendModes.DIFFERENCE).setScale(0.35);
        this.physics.add.staticImage(500, 75, 'mCircle2').setBlendMode(Phaser.BlendModes.ADD).setScale(0.21);
        
        this.add.image(270, 580, 'rock');
        this.add.image(560, 580, 'rock');
        
        ground = this.physics.add.staticImage(500, 670, 'ground');
    }
});