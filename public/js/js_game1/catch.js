var scoreText;
var gameOver = false;
var potatoStage = false;
var effect;
var score = 0;
var health = 10;
var drops, bananas, pizzas, potatos, chickens;
var mainScene = new Phaser.Class({
    
    Extends: Phaser.Scene,
    
    initialize:
    
    function mainScene()
    {
        //this is scene name.
        Phaser.Scene.call(this, {key: 'mainScene'});
    },
    
    preload: function ()
    {
    },
    
    //this is initial
    create: function ()
    {   
        this.scene.launch('backgroundScene');

        music = this.sound.add('mainMusic');
        music.play();
        music.once('looped', function(sound) {
            startstem.call(this, music, 'musicOver');
        }, this);
        effect = this.sound.add('soundEffect');

        hpImage = this.physics.add.group({
            key: 'heart',
            repeat: health-1,
            setXY: {x: 380, y: 580, stepX: -20}
        });
        hpImage.children.iterate(function (child) {
           child.setScale(0.25);
        });
        //it loops the dropping item so it can keep dropping.
        potatos = this.time.addEvent({delay: Phaser.Math.FloatBetween(30000,100000), callback: bonusOn, callbackScope: this, repeat: 3});

         //it loops the dropping item so it can keep dropping.
        bananas = this.time.addEvent({delay: Phaser.Math.FloatBetween(500, 3000), callback: onEventbnn, callbackScope: this, loop: true});

        //dropping items.
        //it loops the dropping item so it can keep dropping.
        pizzas = this.time.addEvent({delay: Phaser.Math.FloatBetween(1500,5000), callback: onEventpzz, callbackScope: this, loop: true});

         //it loops the dropping item so it can keep dropping.
         drops = this.time.addEvent({delay: Phaser.Math.FloatBetween(1000,3500), callback: onEvent, callbackScope: this, loop: true});
            
        //it loops the dropping item so it can keep dropping.
        chickens = this.time.addEvent({delay: Phaser.Math.FloatBetween(2000,4000), callback: onEventchk, callbackScope: this, loop: true});

        //add text on the game.
        scoreText = this.add.text(16,16,'Score: ' + score, { fontSize: '32px', fill: '#000'});

    },
    //it is frame. This keep updating status of game
    update: function ()
    {   
            
        if (gameOver) {
            this.physics.pause();
            music.pause();
            this.scene.start('catchOver');
            return;
        }
        //pointer movement.
        this.input.on('pointermove', function (pointer) {
            if(player.x>0 && player.x<400) {
            player.x=pointer.x;
            player.y=515;
            }
        });
        
        //it checks the objects are in same position.
        this.physics.add.overlap(player, drops, collectWaste, null, this);
        this.physics.add.overlap(platform, drops, collision, null, this);
        
        this.physics.add.overlap(player, bananas, collectWaste, null, this);
        this.physics.add.overlap(platform, bananas, collision, null, this);
        
        this.physics.add.overlap(player, pizzas, collectWaste, null, this);
        this.physics.add.overlap(platform, pizzas, collision, null, this);
        
        this.physics.add.overlap(player, potatos, bonusCollect, null, this);
        this.physics.add.overlap(platform, potatos, collision, null, this);
        
        this.physics.add.overlap(player, chickens, collectWaste, null, this);
        this.physics.add.overlap(platform, chickens, collision, null, this);
        if(potatoStage) {
            music.pause();
            this.scene.start('bonusStage');
        }

    }
});

function bonusCollect(player, potato) {
    potato.disableBody(true,true);
    score += 50;
    health++;
    scoreText.setText('Score: ' + score);
    potatoStage = true;
}

function collectWaste (player, foodWaste) {
    //make it invisible
    foodWaste.disableBody(true, true);
    score += 25;
    scoreText.setText('Score: ' + score);
        
}
        
function collision (ground, foodWaste) {
    //make it invisible
    effect.play();
    foodWaste.disableBody(true, true);
    health--;
    hpImage = this.physics.add.group({
            key: 'heart',
            repeat: health-1,
            setXY: {x: 380, y: 580, stepX: -20}
    });
    hpImage.children.iterate(function (child) {
           child.setScale(0.25);
    });
    if(health===0) {
        //it stops any movement occurs in system.
        this.physics.pause();
        gameOver = true;
    }
}   

function onEvent () {
    if (gameOver) {
        return;
    }
    drops = this.physics.add.sprite(Phaser.Math.FloatBetween(0, 400), 0, 'foodWaste');
    if(score%5===0) {
        drops.body.setGravityY += 100;
    }
    drops.setScale(0.05);
    drops.setCollideWorldBounds(true);
}
function onEventbnn() {
    if (gameOver) {
            return;
    }
    bananas = this.physics.add.sprite(Phaser.Math.FloatBetween(0, 400), 0, 'banana');
    bananas.body.gravity.y = 200;
    bananas.setScale(0.015);
    bananas.setCollideWorldBounds(true);
}

function onEventpzz() {
    if (gameOver) {
            return;
        }
    pizzas = this.physics.add.sprite(Phaser.Math.FloatBetween(0, 400), 0, 'pizza');
    pizzas.body.gravity.y = 175;
    pizzas.setScale(0.15);
    pizzas.setCollideWorldBounds(true);
}
function bonusOn() {
    if (gameOver) {
            return;
        }
    potatos = this.physics.add.sprite(Phaser.Math.FloatBetween(0, 400), 0, 'potato');
    potatos.body.gravity.y = 300;
    potatos.setScale(0.05);
    potatos.setCollideWorldBounds(true);
}
function onEventchk() {
    if (gameOver) {
            return;
        }
    chickens = this.physics.add.sprite(Phaser.Math.FloatBetween(0, 400), 0, 'chicken');
    chickens.body.gravity.y = 300;
    chickens.setScale(0.14);
    chickens.setCollideWorldBounds(true);
}
