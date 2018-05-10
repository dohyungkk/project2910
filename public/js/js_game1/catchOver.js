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
    },

    create: function ()
    {
        this.scene.launch('backgroundScene');
        music = this.sound.add('musicOver');
        music.play();
        music.once('looped', function(sound) {
            startstem.call(this, music, 'musicOver');
        }, this);

        overPage = this.physics.add.staticImage(200, 250, 'gameOver');
        overPage.setScale(0.9);
        scoreText = this.add.text(110,270,'Score: ' + score, { fontSize: '32px', fill: '#000'});
        died = this.add.text(110,175,'Game Over', { fontSize: '32px', fill: 'Red'});
        menu=this.physics.add.staticImage(200, 420, 'restart');
        menu.setScale(0.25);
        this.input.once('pointerdown', function() {
            gameOver = false;
            score=0;
            health=10;
            music.pause();
            this.scene.start('mainScene');
        },this);
    },
});