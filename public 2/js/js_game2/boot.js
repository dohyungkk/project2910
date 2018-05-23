var bootScene = new Phaser.Class({
    
    Extends: Phaser.Scene,

    initialize:
    
    function bootScene() {
        Phaser.Scene.call(this, { key: 'bootScene'});
    },

    preload: function() {
        this.load.image('mainMenuScreen', 'mainMenu/mainMenu.png')
        this.load.image('loadimage', 'mainMenu/loadingBar.png');
    },

    create: function () {
        this.scene.start('loadScene');
    }
});

