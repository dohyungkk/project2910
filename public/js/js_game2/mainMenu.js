var mainMenuSwitch = 0;

var eeSign1;
var eeSign2;
var eeSign3;
var eeSign4;

var mainMenuScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function mainMenuScene() {
        Phaser.Scene.call(this, {key: 'mainMenuScene'});
    },

    preload: function() {
        eemusic.pause();
        music.resume();

        eeSign1 = 0;
        eeSign2 = 0;
        eeSign3 = 0;
        eeSign4 = 0;

    },

    create: function() {

        this.add.image(400,300, 'mainMenuScreen');
        
        //Adding version number
        var text = this.add.text(10,580, {font: '10px Arial', fill: '#000000'});
        text.setText(['Version: ' + game.config.gameVersion]);

        
        //putting the lights  on the signs
        sign1 = this.add.sprite(50,100, 'signOn').setInteractive();
        sign2 = this.add.sprite(250,100, 'signOn').setInteractive();
        sign3 = this.add.sprite(525, 90, 'signOn').setInteractive();
        sign4 = this.add.sprite(725,90, 'signOn').setInteractive();

        //Adding events to turn off the signs and turn on a hidden variable for the easter egg
        sign1.on('pointerdown', function() {
            eeSign1 = 1;
            sign1.setTint(0x999999);
        })
        sign2.on('pointerdown', function() {
            eeSign2 = 1;
            sign2.setTint(0x999999);
        })
        sign3.on('pointerdown', function() {
            eeSign3 = 1;
            sign3.setTint(0x999999);
        })
        sign4.on('pointerdown', function() {
            eeSign4 = 1;
            sign4.setTint(0x999999);
        })

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

        //Making the pause/resume music button
        var soundBtn = this.add.sprite(750, 75, 'soundOn').setInteractive();
        soundBtn.on('pointerover', function() {
            this.setTint(0xCCCCCC);
        });
        soundBtn.on('pointerout', function() {
            this.clearTint();
        });
        soundBtn.on('pointerdown', function() {
            this.setTint(0x999999);
            if(music.isPaused) { //resume music
                music.resume();
            } else if(music.isPlaying){ //pause music
                music.pause();
            }
        });
        soundBtn.on('pointerup', function() {
            this.setTint(0xCCCCCC);
        });

    },

    update: function() {
        //switch scene to the game if it is 1
        if(mainMenuSwitch === 1) {
            mainMenuSwitch = 0;
            if(eeSign1 == 1 && eeSign2 == 1 & eeSign3 == 1 && eeSign4 == 1) {
                music.pause();
                eemusic.resume();
            }
            this.scene.start('playScene');
        }
    }
});


