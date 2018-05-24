var bombs;
var hearts;
var enemies;
var crystal;
var timedEvent;
var magic;
var sparkGroup;
var ran;
var xPosition;
var crystal;
var cursors;
var keyS;
var keyD;
var monsters;
var sparkNum = 0;
var numMon = 1;
var damage = false;
var walls;
var heal;
var treeGrowing = 0;
var emitter;
var particles;
var gameStart = new Phaser.Class({
	Extends: Phaser.Scene,
    
    initialize:
    
    function gameStart() {
        Phaser.Scene.call(this, {key: 'gameStart'});
    },
        
    preload: function ()
    {
        

    },
    create: function ()
    {   
        this.scene.launch('gamePlay');
        this.anims.create({
            key: 'healing',
            frames: this.anims.generateFrameNames('heal', {start: 0, end: 28, first: 0}),
            frameRate: 20,
            repeat: 0,
            showOnStart: true,
            hideOnComplete: true
        });
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
            key: 'growingTree1',
            frames: this.anims.generateFrameNames('treeGrowing', {start: 0, end: 10, first: 0}),
            frameRate: 20,
            repeat: 0,
        });
        this.anims.create({
            key: 'growingTree2',
            frames: this.anims.generateFrameNames('treeGrowing', {start: 10, end: 27, first: 10}),
            frameRate: 20,
            repeat: 0,
        });
        this.anims.create({
            key: 'growingTree3',
            frames: this.anims.generateFrameNames('treeGrowing', {start: 28, end: 49, first: 28}),
            frameRate: 20,
            repeat: 0,
        });

        this.anims.create({
            key: 'reverseTree1',
            frames: this.anims.generateFrameNames('treeGrowing', {start: 10, end: 0, first: 10}),
            frameRate: 20,
            repeat: 0,
        });
        this.anims.create({
            key: 'reverseTree2',
            frames: this.anims.generateFrameNames('treeGrowing', {start: 27, end: 10, first: 27}),
            frameRate: 20,
            repeat: 0,
        });
        this.anims.create({
            key: 'reverseTree3',
            frames: this.anims.generateFrameNames('treeGrowing', {start: 49, end: 28, first: 49}),
            frameRate: 20,
            repeat: 0,
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
    combo++;
    score += 10;
    var comNum = Math.floor(combo/50);
    if(comNum!=0) {
        score+=comNum*10;
    }
    sparkNum++;
    if(sparkNum%10==0) {
        if (treeGrowing < 4) {
            treeGrowing++;
            switch(treeGrowing) {
                case 1:
                    bonusHP();
                    this.scene.stop('christmas');
                    tree.anims.play('growingTree1');
                    break;
                case 2:
                    bonusHP();
                    this.scene.launch('sunset');
                    tree.anims.play('growingTree2');
                    break;
                case 3:
                    bonusHP();
                    this.scene.stop('sunset');
                    this.scene.launch('sakura');
                    tree.anims.play('growingTree3');
                    emitter.visible = true;
                    break;
            }
        }
    }
    scoreText.setText('Score: ' + score);

    if (combo > 5) {
        comboText.visible = true;
        comboText.setText('COMBO ' + combo + '!');
    }

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
function sorting(heart, mons) {
    heart.setDepth(1);
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
    this.physics.add.overlap(hearts, monsters, sorting, null, this);
}
    
function wrongAttack(slash, heart) {
    if (slash.visible) {
        heart.disableBody(true, true);
        hpProgress();
        comboText.visible = false;
        combo = 0;
        score -= 10;
        scoreText.setText('Score: ' + score);
    }
}
function negative(crystal, monster) {
    monster.disableBody(true, true);
    tree.setTint(0xff0000);
    timedEvent = this.time.addEvent({ delay: 135, callback: clearT, callbackScope: this, loop: 0 });
    hpProgress();
    comboText.visible = false;
    combo = 0;
    sparkNum = 0;
    if(treeGrowing>0 && treeGrowing<4) {
        switch(treeGrowing) {
            case 1:
                // this.scene.stop('spring');
                this.scene.launch('christmas');
                tree.anims.play('reverseTree1');
                break;
            case 2:
                this.scene.stop('sunset');
                // this.scene.launch('spring');
                tree.anims.play('reverseTree2');
                break;
            case 3:
                this.scene.stop('sakura');
                this.scene.launch('sunset');
                tree.anims.play('reverseTree3');
                emitter.visible = false;
                break;
        }
        treeGrowing--;
    }
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
function bonusHP() {
    hpPoint++;
    heal.x = player.x;
    heal.y = player.y+20;
    heal.anims.play('healing');
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
    comboText.visible = false;
    combo = 0;
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
        combo++;   
        score += 5;
        if(Math.floor(combo/50)!=0) {
            score+=Math.floor(combo/50)*10;
        }
        scoreText.setText('Score: ' + score);
        if (combo > 5) {
            comboText.visible = true;
            comboText.setText('COMBO ' + combo + '!');
        }
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