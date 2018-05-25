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
        this.scene.launch("sakura");
        tree = this.physics.add.sprite(500, 381, 'treeGrowing').setScale(2).play('treeOver');
        tree.body.allowGravity = false;
        var overPage = this.physics.add.staticImage(500, 290, 'gameOver').setBlendMode(Phaser.BlendModes.SCREEN);
        var died = this.add.text(410,165,'Game Over', { font: '32px Stencil', fill: 'Red'});
        scoreText = this.add.text(410,270,'Score: ' + score, { font: '32px arial', fill: '#000'});
        var menu=this.physics.add.staticImage(500, 400, 'restart').setInteractive();
        menu.setScale(0.25);
        menu.on('pointerdown', function() {
            sparkNum = 0;
            treeGrowing = 0;
            hpPoint = 5;
            score = 0;
            combo = 0;
            // background.pause();
            this.scene.stop('sakura');
            this.scene.launch('christmas');
            this.scene.start('gameStart');
        },this);
    }
});