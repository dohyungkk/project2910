var ground;
var tree;
var player;
var spring = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    
    function spring() {
        Phaser.Scene.call(this, {key: 'spring'});
    },
        
    preload: function ()
    {   
        this.load.image('ground', 'ground.png');
        this.load.image('ground2', 'back4/grass1.png');
        this.load.image('ground3', 'testGround.png');
        this.load.image('sky', 'back4/spring9.png');
        
        this.load.image('mCircle2', 'mcircle2/mCircle4.png');
        this.load.image('mCircle', 'mcircle1/mCircle7.png');
        
        this.load.image('rock', 'rock.png');
    },
    create: function() {
        crystal = this.physics.add.staticImage(500,575,'crystal').setBlendMode(Phaser.BlendModes.DIFFERENCE);
        crystal.rotation += 0.8;

        this.add.image(500,300, 'sky').setScale(1.25,1.9);
        
        this.physics.add.staticImage(500,75,'mCircle').setBlendMode(Phaser.BlendModes.DIFFERENCE).setScale(0.35);
        this.physics.add.staticImage(500, 75, 'mCircle2').setBlendMode(Phaser.BlendModes.ADD).setScale(0.21);
        
        this.add.image(270, 580, 'rock');
        this.add.image(560, 580, 'rock');

        ground = this.physics.add.staticImage(500, 673, 'ground3');
        var ground1 = this.physics.add.staticGroup();
        var ground2 = this.physics.add.staticGroup();
        var x =30
        for (var i=0; i<16; i++) {
            ground2.create(x, 620, 'ground2');
            ground1.create(x, 668, 'ground');
            x += 64;
        }
    }
});