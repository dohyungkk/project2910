var musicReference;
var music;
var eemusic;

var loadScene = new Phaser.Class({
    
    Extends: Phaser.Scene,

    initialize:
    
    function loadScene() {
        Phaser.Scene.call(this, { key: 'loadScene'});
    },

    preload: function() {
        
        var progText = this.add.text(575,550, '', {font: '40px Arial', fill: '#FFFFFF'});

        var progOutline = this.add.graphics()
        progOutline.fillStyle(0xFFFFFF, 100);
        progOutline.fillRect(0,490,800,50);

        var progress = this.add.graphics();

        this.load.on('progress', function (value) {
            progress.clear();
            progress.fillStyle(0x88FF88, value);
            progress.fillRect(0,500,800*value,30);
            
            if(Math.floor(value*100) < 10) {
                progText.setText("L");
            } else if(Math.floor(value*100) < 20) {
                progText.setText("LO");
            } else if(Math.floor(value*100) < 30) {
                progText.setText("LOA");
            } else if(Math.floor(value*100) < 40) {
                progText.setText("LOAD");
            } else if(Math.floor(value*100) < 50) {
                progText.setText("LOADI");
            } else if(Math.floor(value*100) < 60) {
                progText.setText("LOADIN");
            } else if(Math.floor(value*100) < 70) {
                progText.setText("LOADING");
            } else if(Math.floor(value*100) < 80) {
                progText.setText("LOADING.");
            } else if(Math.floor(value*100) < 90) {
                progText.setText("LOADING..");
            } else if(Math.floor(value*100) < 100) {
                progText.setText("LOADING...");
            }

        });

        this.load.on('complete', function() {
            //progress.destroy();
        });

        //load most used files
        this.load.audio('music', 'audio/Splashing_Around.mp3');
        this.load.audio('rickroll', 'audio/rickroll.mp3');
        this.load.image('invisiPlatform', 'etc/invisibleLine.png')
        
    
        //load main menu files
        this.load.image('moneyParticle', 'mainMenu/money.png');
        this.load.image('logo', 'mainMenu/logo.png');
        this.load.image('startBtn', 'buttons/startBtn.png');
        this.load.image('scoreBtn', 'buttons/scoreBtn.png');

        //load game files
        this.load.image('shelf', 'etc/gameShelf.png');
        this.load.image('cart', 'etc/cart.png'); //UNNEEDED
        this.load.image('floor', '/etc/gameFloor.png');
        this.load.image('list', 'etc/list.png');
        this.load.image('cartBottom', 'etc/cartBottom.png');
        this.load.image('invisiCover', 'etc/invisi100x50.png');
        this.load.image('gameover', 'etc/gameOver.png');
        this.load.image('retry', 'buttons/retryBtn.png');
        this.load.image('back', 'buttons/backBtn.png');
        this.load.image('soundOn', 'buttons/soundOn.png');
        this.load.image('soundOff', 'buttons/soundOff.png');
        //this.load.image('smallPlatform', 'etc/smallInvis.png');
        this.load.image('cartTop', 'etc/cartTop.png');
        this.load.image('signOn', 'etc/signOn.png');
        this.load.image('fruitSign', 'etc/fruitSign.png');
        this.load.image('dairySign', 'etc/dairySign.png');
        this.load.image('veggieSign', 'etc/veggieSign.png');
        this.load.image('meatSign', 'etc/meatSign.png');
        this.load.image('greenBin', 'etc/greenBin.png');

        //load food files
        this.load.image('fruit', '/foodItems/apple.png');
        this.load.image('dairy', '/foodItems/dairy.png');
        this.load.image('meat', '/foodItems/meat.png');
        this.load.image('veggies', '/foodItems/veggie.png');
    
    
    
    
    
    
    },

    create: function() {
        //Start playing music
        menuReference = this;
        music = this.sound.add('music');
        music.play();
        eemusic = this.sound.add('rickroll');
        eemusic.play();

        this.scene.start('mainMenuScene');
    }
    
});

