var bombs;
var hearts;
var enemies;
var count = 1;
var crystal;
var timedEvent;
var magic;
var sparkGroup;
var ran;
var xPosition;
var crystal;
var player;
var cursors;
var keyS;
var keyD;
var monsters;
var numMon = 1;
var damage = false;
var walls;
var background;
var gameStart = new Phaser.Class({
	Extends: Phaser.Scene,
    
    initialize:
    
    function gameStart() {
        Phaser.Scene.call(this, {key: 'gameStart'});
    },
        
    preload: function ()
    {
        var progress = this.add.text(370,250,'Loading...', { fontSize: '50px', fill: '#000'});;

        this.load.on('complete', function () {

            progress.destroy();

        });
        this.load.spritesheet('teleport', 'tel1.png',{frameWidth: 41, frameHeight: 41, endFrame: 28});
        this.load.spritesheet('teleport5', 'tel5.png',{frameWidth: 45, frameHeight: 45, endFrame: 25});

        this.load.image('left', 'Buttons/left.png');
        this.load.image('right', 'Buttons/right.png');
        this.load.image('A', 'Buttons/a.png');
        this.load.image('D', 'Buttons/d.png');
        this.load.image('J', 'Buttons/j.png');

        this.load.image('wall', 'character.png');
        
        this.load.image('slash0', 'swordSwing/slash0.png');
        this.load.image('slash1', 'swordSwing/slash1.png');
        this.load.image('slash2', 'swordSwing/slash2.png');
        this.load.image('slash3', 'swordSwing/slash3.png');
        this.load.image('slash4', 'swordSwing/slash4.png');

        this.load.image('walk1', 'walk/sprite1.png');
        this.load.image('walk2', 'walk/sprite2.png');
        this.load.image('walk3', 'walk/sprite3.png');
        this.load.image('walk4', 'walk/sprite4.png');

        this.load.image('attack1', 'swordSwing/swordSwing1.png');
        this.load.image('attack2', 'swordSwing/swordSwing2.png');
        this.load.image('attack3', 'swordSwing/swordSwing3.png');
        this.load.image('attack4', 'swordSwing/swordSwing4.png');

        this.load.image('hp', 'enemy/heart.png');
        

        this.load.image('monster', 'enemy/monster.png');

        this.load.image('crystal', 'crystal3.png');
        this.load.image('redCrystal', 'crystal4.png');

        this.load.image('bomb', 'enemy/Potato.png');
        this.load.image('heart', 'enemy/apple.png');
        this.load.image('enemy', 'enemy/potato.png');

        this.load.image('spark', 'blue.png');
        this.load.image('damaged', 'red.png');

        this.load.image('redCircle', 'mCircle6.png');
        this.load.image('redCircle2', 'mCircle5.png');

    },
    create: function ()
    {
        this.scene.launch('gamePlay');
        this.anims.create({
            key: 'teleportation',
            frames: this.anims.generateFrameNames('teleport', {start: 0, end: 28, first: 0}),
            frameRate: 70,
            repeat: 0,
            showOnStart: true,
            hideOnComplete: true


        });
        this.anims.create({
            key: 'teleportation5',
            frames: this.anims.generateFrameNames('teleport5', {start: 0, end: 25, first: 0}),
            frameRate: 70,
            repeat: 0,
            showOnStart: true,
            hideOnComplete: true


        });
        this.anims.create({
            key: 'walking',
            frames: [
                
                {key: 'walk2'},
                {key: 'walk3'},
                {key: 'walk4'},
                {key: 'walk1', duration: 0}
            ],
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'slash_attack',
            frames: [
                {key: 'slash0'},
                {key: 'slash1'},
                {key: 'slash2'},
                {key: 'slash3'},
                {key: 'slash4'}
            ],
            frameRate: 25,
            repeat: 0,
            showOnStart: true,
            hideOnComplete: true

        });
        this.anims.create({
            key: 'slash',
            frames: [
                {key: 'walk2'},
                {key: 'attack1'},
                {key: 'attack2'},
                {key: 'attack3'},
                {key: 'attack4'},
                {key: 'walk4', duration: 25}
            ],
            frameRate: 25,
            repeat: 0
        });
        this.anims.create({
            key: 'stay',
            frames: [
                {key: 'walk1'}
            ],
            frameRate: 20
        });
        this.anims.create({
            key: 'attacking',
            frames: [
                {key: 'attack1'},
                {key: 'attack2'},
                {key: 'attack3'},
                {key: 'attack4', duration: 25}
            ],
            frameRate: 25,
            repeat: 0
        });
    }
});
function positive(crystal, heart) {
    heart.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
    var spark = sparkGroup.create(500, 70, 'spark');
    spark.setScale(0.5);
    spark.setBlendMode(Phaser.BlendModes.ADD);
    spark.body.allowGravity = false;
    sparkGroup.add(spark);
    sparkGroup.children.iterate(function (child) {
        child.setVelocityY(650);
    });
}

function increment() {
    ran = Math.round(Math.random());
            switch(ran) {
                    case 0:
                    xPosition = -50;
                     break;
                 case 1:
                     xPosition = 1100;
                    break;
    }
    hearts = this.physics.add.sprite(xPosition, 555, 'heart');
    hearts.setScale(0.06);
    if (ran == 1) {
        hearts.setVelocityX(Phaser.Math.Between(-70, -250));
    } else {
        hearts.flipX = true;
        hearts.setVelocityX(Phaser.Math.Between(70, 250));
    }
    this.physics.add.collider(hearts,ground);
    this.physics.add.overlap(slash, hearts, wrongAttack, null, this);
    this.physics.add.overlap(crystal, hearts, positive, null, this);
}
function summon() {
    ran = Math.round(Math.random());
            switch(ran) {
                    case 0:
                    xPosition = -50;
                     break;
                 case 1:
                     xPosition = 1100;
                    break;
    }
    monsters = this.physics.add.sprite(xPosition, 555, 'monster').setScale(0.7);
    if (ran == 1) {
        monsters.setVelocityX(Phaser.Math.Between(-70, -250));
    } else {
        monsters.flipX = true;
        monsters.setVelocityX(Phaser.Math.Between(70, 250));
    }
    this.physics.add.collider(monsters, ground);
    this.physics.add.overlap(walls,monsters, damaged, null, this);
    this.physics.add.overlap(slash, monsters, attack, null, this);
    this.physics.add.overlap(crystal, monsters, negative, null, this);
}
    
function wrongAttack(slash, heart) {
    if (slash.visible) {
        heart.disableBody(true, true);
        hpProgress();
        score -= 10;
        scoreText.setText('Score: ' + score);
    }
}
function negative(crystal, monster) {
    monster.disableBody(true, true);
    tree.setTint(0xff0000);
    timedEvent = this.time.addEvent({ delay: 135, callback: clearT, callbackScope: this, loop: 0 });
    hpProgress();
    score -= 25;
    scoreText.setText('Score: ' + score);
}
function hpProgress() {
    hpPoint--;
    hp.children.iterate(function (child) {
            child.disableBody(true, true);
    });
    var x = 950;
    for (var i=0; i<hpPoint; i++) {
        var hpImage = hp.create(x, 50, 'hp').setScale(0.35);
        hpImage.body.allowGravity = false;
        x -= 50;
    }
}
function damaged(wall, monster) {
    monster.disableBody(true, true);
    player.setTint(0xff0000);
    timedEvent = this.time.addEvent({ delay: 135, callback: clearC, callbackScope: this, loop: 0 });
    score -= 5;
    scoreText.setText('Score: ' + score);
    hpProgress();
}
function clearC() {
    player.clearTint();
}
function clearT() {
    tree.clearTint();
}
function attack(slash, mons) {
    if (slash.visible) {
        mons.disableBody(true, true);   
        score += 5;
        scoreText.setText('Score: ' + score);
    } 
}
function slashing(x, y, yOrN) {
        slash.flipX = yOrN;
        if(yOrN) {
            slash.x = x - 35;
            slash.y = y;
        } else {
            slash.x = x + 35;
            slash.y = y;
        }
        slash.anims.play('slash_attack', true);
}
