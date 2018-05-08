var player;
var platform;
var menu;
var startCatch = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    
    function startCatch() {
    Phaser.Scene.call(this, {key: 'startCatch'});
    },
        
    preload: function ()
    {
        this.load.image('ground', 'image/assets_1/platform3.png');
        this.load.image('sky', 'image/assets_1/sky.png');
        this.load.image('box', 'image/assets_1/greenBin.png');
        this.load.image('start', 'image/assets_1/play.png');
        
    },

    create: function ()
    {
        this.add.image(400, 300, 'sky');
        
        platform = this.physics.add.staticImage(192, 600, 'ground');
        
        player = this.physics.add.sprite(200, 450, 'box');
        player.setScale(0.5);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platform);
        
        menu=this.physics.add.staticImage(200, 300, 'start');
        menu.setScale(0.25);
        this.input.once('pointerdown', function() {
            this.scene.start('mainScene');
        },this);
        
    },
});
    
