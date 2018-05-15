var menu;
var player;
var platform;
var music;
var startCatch = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    
    function startCatch() {
    Phaser.Scene.call(this, {key: 'startCatch', active: true});
    },
        
    preload: function ()
    {   

        var progress = this.add.text(60,250,'Loading...', { fontSize: '50px', fill: '#000'});;

        this.load.on('complete', function () {

            progress.destroy();

        });
        this.load.image('endGround', 'ground.png'); 
        this.load.image('sunsetSky', 'sunset.png');
        this.load.image('black', 'blackBack.png');
        this.load.image('sunlight', 'yellow.png');
        this.load.image('start', 'play.png');
        this.load.image('foodWaste', 'mold_cheese.png');
        this.load.image('heart', 'heart.png');
        this.load.image('pizza', 'pizza_slice.png');
        this.load.image('banana', 'banana_peel.png');
        this.load.image('potato', 'Potato.png');
        this.load.image('chicken', 'drumstick.png');
        this.load.image('gameOver', 'gameover.png');
        this.load.image('restart', 'replay.png');

        this.load.audio('musicOver', 'music/overMusic.mp3');
        this.load.audio('mainMusic', 'music/mainGame.mp3');
        this.load.audio('soundEffect', 'music/effect.mp3');
        this.load.audio('intro', 'music/mainIntro.mp3');
        this.load.audio('bonusMusic', 'music/bonusMusic.mp3');
        
    },

    create: function ()
    {   
        this.scene.launch("backgroundScene");
        menu=this.physics.add.staticImage(200, 300, 'start');
        menu.setScale(0.25);
        this.input.on('pointerdown', function() {
            music.pause();
            this.scene.start('mainScene');
        },this);

        music = this.sound.add('intro');
        music.play();
        music.once('looped', function(sound) {
            startstem.call(this, music, 'musicOver');
        }, this);
        
    },
});
    
