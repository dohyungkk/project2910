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
        background = this.scene.launch("sunset");
        tree = this.physics.add.staticImage(500, 450, 'tree');
        var overPage = this.physics.add.staticImage(500, 290, 'gameOver').setBlendMode(Phaser.BlendModes.SCREEN);
        var died = this.add.text(410,165,'Game Over', { fontSize: '32px', fill: 'Red'});
        scoreText = this.add.text(400,270,'Score: ' + score, { fontSize: '32px', fill: '#000'});
        var menu=this.physics.add.staticImage(500, 400, 'restart').setInteractive();
        menu.setScale(0.25);
        menu.on('pointerdown', function() {
            sparkNum = 0;
            treeGrowing = 0;
            hpPoint = 5;
            score = 0;
            combo = 0;
            // background.pause();
            this.scene.stop('sunset');
            this.scene.launch('christmas');
            this.scene.start('gameStart');
        },this);
    }
});