var player;
var platform;
var menu;
var music;
// var musicIcon;
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
        // this.load.image('musicOn', 'assets/musicOn.png')
        // this.load.image('musicOff', 'assets/musicOff.png');
        this.load.audio('intro', 'image/assets_1/music/mainIntro.mp3');
        
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
        this.input.on('pointerdown', function() {
            music.pause();
            this.scene.start('mainScene');
        },this);

        // musicIcon = this.physics.add.staticImage(350, 20, 'musicOn').setInteractive();
        // musicIcon.setScale(0.25);
        // musicIcon.on('pointerdown', function() {
        //     if(music.isPaused) {
        //         music.resume();
        //     } else {
        //         music.pause();
        //     }
        // })
        music = this.sound.add('intro');
        music.play();
        music.once('looped', function(sound) {
            startstem.call(this, music, 'musicOver');
        }, this);
    },
});
    
