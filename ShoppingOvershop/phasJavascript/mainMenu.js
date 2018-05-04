var mainMenuSwitch = 0;
var music;

var mainMenuScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function mainMenuScene() {
        Phaser.Scene.call(this, {key: 'mainMenuScene'});
    },

    preload: function() {
        
    },

    create: function() {
        music = game.sound.play('music');
        this.add.image(400,300, 'mainMenuScreen');
        
        //Adding version number
        var text = this.add.text(10,580, {font: '10px Arial', fill: '#000000'});
        text.setText(['Version: ' + game.config.gameVersion]);

        

        //Adding invisible platform so the logo doesnt bounce to the bottom and cover buttons
        invisiPlatform = this.physics.add.staticGroup();
        invisiPlatform.create(400,300, 'invisiPlatform');

        //adding the logo and giving it a money particle effect
        var moneyParticle = this.add.particles('moneyParticle');
        var moneyEmission = moneyParticle.createEmitter({
           speed: 1000,
           scale: {start: 1, end: 0},
           blendMode: 'ADD' 
        });
        var logo = this.physics.add.image(400,100, 'logo');
        logo.setVelocity(100,50);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
        this.physics.add.collider(logo,invisiPlatform);
        moneyEmission.startFollow(logo);

        
        //Adding buttons and logic
        var startBtn = this.add.sprite(400,400, 'startBtn').setInteractive();
        
        startBtn.on('pointerover', function() {
            this.setTint(0xCCCCCC);
        });
        startBtn.on('pointerout', function() {
            this.clearTint();
        });
        startBtn.on('pointerdown', function() {
            this.setTint(0x999999);
            //insert code to switch to game scene
            mainMenuSwitch = 1;
        });
        startBtn.on('pointerup', function() {
            this.setTint(0xCCCCCC);
        });
        
        //making the webpage have the scores
        var scoreBtn = this.add.sprite(400,500, 'scoreBtn').setInteractive();
        scoreBtn.on('pointerover', function() {
            this.setTint(0xCCCCCC);
        });
        scoreBtn.on('pointerout', function() {
            this.clearTint();
        });
        scoreBtn.on('pointerdown', function() {
            this.setTint(0x999999);
            //insert code to switch to highscore scene
        });
        scoreBtn.on('pointerup', function() {
            this.setTint(0xCCCCCC);
        });

        var soundBtn = this.add.sprite(750, 75, 'soundOn').setInteractive();
        soundBtn.on('pointerover', function() {
            this.setTint(0xCCCCCC);
        });
        soundBtn.on('pointerout', function() {
            this.clearTint();
        });
        soundBtn.on('pointerdown', function() {
            this.setTint(0x999999);
            this.loadTexture('soundOff');
        });
        soundBtn.on('pointerup', function() {
            this.setTint(0xCCCCCC);
        });
    },

    update: function() {
        //switch scene to the game if it is 1
        if(mainMenuSwitch === 1) {
            mainMenuSwitch = 0;
            this.scene.start('playScene');
        }
    }
});


