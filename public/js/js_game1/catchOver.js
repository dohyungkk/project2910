var overPage;
var died;
var catchOver = new Phaser.Class({
    
    Extends: Phaser.Scene,
    
    initialize:
    
    function catchOver() {
    Phaser.Scene.call(this, {key: 'catchOver'});
    },
        
    preload: function ()
    {
        this.load.image('gameOver', 'image/assets_1/gameover.png');
        this.load.image('restart', 'image/assets_1/replay.png');
        this.load.audio('musicOver', 'image/assets_1/music/overMusic.mp3');
        
    },

    create: function ()
    {
        music = this.sound.add('musicOver');
        music.play();
        music.once('looped', function(sound) {
            startstem.call(this, music, 'musicOver');
        }, this);
        this.add.image(400, 300, 'sky');
        
        platform = this.physics.add.staticImage(192, 600, 'ground');
        
        player = this.physics.add.sprite(200, 450, 'box');
        player.setScale(0.5);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platform);
        
        overPage = this.physics.add.staticImage(200, 250, 'gameOver');
        overPage.setScale(0.9);
        scoreText = this.add.text(110,270,'Score: ' + score, { fontSize: '32px', fill: '#000'});
        died = this.add.text(110,175,'Game Over', { fontSize: '32px', fill: 'Red'});
        menu=this.physics.add.staticImage(200, 420, 'restart');
        menu.setScale(0.25);
        this.input.once('pointerdown', function() {
            this.scene.start('mainScene');
            gameOver = false;
            score=0;
            health=10;
            music.pause();
        },this);
        
    },
});