var gameOver = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    
    function gameOver() {
        Phaser.Scene.call(this, {key: 'gameOver'});
    },
        
    preload: function ()
    {   
        this.load.image('restart', 'replay.png');
        this.load.image('gameOver', 'gameover.png');
    },
    create: function() {
        background = this.scene.launch("gameLoading");
        var overPage = this.physics.add.staticImage(500, 300, 'gameOver').setBlendMode(Phaser.BlendModes.SCREEN);
        var died = this.add.text(410,175,'Game Over', { fontSize: '32px', fill: 'Red'});
        scoreText = this.add.text(400,280,'Score: ' + score, { fontSize: '32px', fill: '#000'});
        var menu=this.physics.add.staticImage(500, 410, 'restart').setInteractive();
        menu.setScale(0.25);
        menu.on('pointerdown', function() {
            // background.pause();
            hpPoint = 5;
            score = 0;
            this.scene.start('gameStart');
        },this);
    }
});