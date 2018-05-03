var drops;
var score = 0;
var scoreText;
var hp;
var health = 10;
var gameOver = false;
//var damage = false;
//var regame;
var heart, hpImage;
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
       
        hpImage = this.physics.add.staticGroup({
            key: 'heart',
            repeat: health-1,
            setXY: {x: 380, y: 580, stepX: -20}
        });
        hpImage.children.iterate(function (child) {
            child.setScale(0.25);
//            child.setCollideWorldBounds(true);
        });
        

        //dropping items.
        drops = this.physics.add.sprite(Phaser.Math.FloatBetween(0, 150), 0, 'foodWaste');
        //it changes size.
        drops.setScale(0.05);
        drops.setCollideWorldBounds(true);
        //it loops the dropping item so it can keep dropping.
        this.time.addEvent({delay: 350, callback: onEvent, callbackScope: this, loop: true});
        
        //add text on the game.
        scoreText = this.add.text(16,16,'Score: 0', { fontSize: '32px', fill: '#000'});
        hp = this.add.text(16,550,'HP: 10', {fontSize: '32px', fill: 'red'});
       
    },
    //it is frame. This keep updating status of game
    update: function ()
    {   
        if (gameOver) {
//            if game is over show restart menu.
//            regame = this.physics.add.staticImage(200, 300, 'restart');
//            regame.setScale(0.25);
//            pointer click once.
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
//        hpImage.children.iterate(function (heart) {
//            if(damage) {
//                heart.destroy();
//            }
//        });
//        if(damage) {
//            heart.disableBody(true, true);
//        }
    }
});


function collectWaste (player, foodWaste) {
    //make it invisible
    foodWaste.disableBody(true, true);
    score += 25;
    scoreText.setText('Score: ' + score);
        
}
        
function collision (ground, foodWaste) {
    //make it invisible
    foodWaste.disableBody(true, true);
    health--;
    damage=true;
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
        if(score>250) {
            drops.body.gravity.y += 200;
        }
        if(score>500) {
            drops.body.gravity.y += 200;
        }
        if(score>750) {
            drops.body.gravity.y += 200;
        }
        if(score>1000) {
            drops.body.gravity.y += 200;
        }
        if(score>1250) {
            drops.body.gravity.y += 200;
        }
        if(score>1500) {
            drops.body.gravity.y += 200;
        }
        drops.setScale(0.05);
        drops.setCollideWorldBounds(true);
}