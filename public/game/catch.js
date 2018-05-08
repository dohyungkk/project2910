var scoreText;
var hp;
var gameOver = false;
var potatoStage = false;
//var damage = false;
var score = 0;
var health = 10;
//var order = 0;
//var hpImage0,hpImage1,hpImage2,hpImage3,hpImage4,hpImage5,hpImage6,hpImage7,hpImage8,hpImage9;
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
        //set images that will be using
        this.load.image('foodWaste', 'assets/mold_cheese.png');
        this.load.image('heart', 'assets/heart.png');
        this.load.image('pizza', 'assets/pizza_slice.png');
        this.load.image('banana', 'assets/banana_peel.png');
        this.load.image('potato', 'assets/Potato.png');
        this.load.image('chicken', 'assets/drumstick.png')
        
    },
    
    //this is initial
    create: function ()
    {
        this.add.image(400, 300, 'sky');
        //this becomes obsatcles(object) from game. It doesn't move
        platform = this.physics.add.staticImage(192, 600, 'ground');
        
        //it gives movement and rule.
        player = this.physics.add.sprite(200, 450, 'box');
        player.setScale(0.5);
        //it blocks object to go out of canvas.
        player.setCollideWorldBounds(true);
        //it blocks object to go through static object.
        this.physics.add.collider(player, platform);
       
//        hpImage = this.time.addEvent({delay: 0, callback: hpPoint, callbackScope: this, repeat: 3});
//        hpImage.setScale(0.25);
//        hpImage.children.iterate(function (child) {
//            child.setScale(0.25);
//            child.setCollideWorldBounds(true);
//        });
        
        //it loops the dropping item so it can keep dropping.
        potatos = this.time.addEvent({delay: Phaser.Math.FloatBetween(5000,10000), callback: bonusOn, callbackScope: this, repeat: 3});

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
        hp = this.add.text(16,550,'HP: ' + health, {fontSize: '32px', fill: 'red'});
       
    },
    //it is frame. This keep updating status of game
    update: function ()
    {   
            
        if (gameOver) {
            this.physics.pause();
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
            this.scene.start('bonusStage');
        }
//        if(damage) {
//            hpImage.destroy();
//        }
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
//    damage = false;
    score += 25;
    scoreText.setText('Score: ' + score);
        
}
        
function collision (ground, foodWaste) {
    //make it invisible
    foodWaste.disableBody(true, true);
    health--;
//    damage = true;
    hp.setText('HP: ' + health);
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
    drops.setScale(0.05);
    drops.setCollideWorldBounds(true);
}
function onEventbnn() {
    if (gameOver) {
            return;
        }
    bananas = this.physics.add.sprite(Phaser.Math.FloatBetween(0, 400), 0, 'banana');
    bananas.setScale(0.015);
    bananas.setCollideWorldBounds(true);
}

function onEventpzz() {
    if (gameOver) {
            return;
        }
    pizzas = this.physics.add.sprite(Phaser.Math.FloatBetween(0, 400), 0, 'pizza');
    pizzas.setScale(0.15);
    pizzas.setCollideWorldBounds(true);
}
function bonusOn() {
    if (gameOver) {
            return;
        }
    potatos = this.physics.add.sprite(Phaser.Math.FloatBetween(0, 400), 0, 'potato');
    potatos.setScale(0.05);
    potatos.setCollideWorldBounds(true);
}
function onEventchk() {
    if (gameOver) {
            return;
        }
    chickens = this.physics.add.sprite(Phaser.Math.FloatBetween(0, 400), 0, 'chicken');
    chickens.setScale(0.14);
    chickens.setCollideWorldBounds(true);
}
