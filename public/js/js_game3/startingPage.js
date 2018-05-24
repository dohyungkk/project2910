var startingPage = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    
    function startingPage() {
        Phaser.Scene.call(this, {key: 'startingPage', active: true});
    },
        
    preload: function ()
    {   
        this.load.image('start', 'play.png');
    },
    create: function() {
        background = this.scene.launch("gameLoading");
        var menu=this.add.image(500, 250, 'start').setInteractive();
        menu.setScale(0.25);
        menu.on('pointerdown', function() {
            // background.pause();
            var num = 3;
            console.log(num);  
            this.scene.start('gameStart');
        },this);
    }
});