var tel1;
var tel2;
var slash;
var walkAttack;
var slashAnim;
var comboText;
var combo = 0;
var scoreText;
var score = 0;
var hpPoint = 5;
var hp;
var leftB, rightB, attackB, jumpB, dashB;
var attacked = false;
var mobile = false;
var gamePlay = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    
    function gamePlay() {
        Phaser.Scene.call(this, {key: 'gamePlay'});
    },
        
    preload: function ()
    {           
    },

    create: function ()
    {
        cursors = this.input.keyboard.createCursorKeys();
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        tree = this.physics.add.sprite(500, 381, 'treeGrowing').setScale(2);
        tree.body.allowGravity = false;

        particles = this.add.particles('flares');
        var well = particles.createGravityWell({
            x: 500,
            y: 300,
            power: 3,
            epsilon: 100,
            gravity: 100
        });

        emitter = particles.createEmitter({
            frame: [ 'red', 'green', 'blue', 'yellow', 'white' ],
            x: 500,
            y: 120,
            lifespan: 4000,
            speed: 225,
            scale: { start: 0.7, end: 0 },
            blendMode: 'ADD'
        });
        emitter.visible = false;

        sparkGroup = this.physics.add.group();

        ran = Math.round(Math.random());
        switch(ran) {
            case 0:
                xPosition = -50;
                break;
            case 1:
                xPosition = 1100;
                break;
        }
        hp = this.physics.add.group();
        var x = 950;
        for (var i=0; i<hpPoint; i++) {
            var hpImage = hp.create(x,50, 'hp').setScale(0.35);
            hpImage.body.allowGravity = false;
            x -= 50;
        }
        
        bombs = this.physics.add.group();
        
        monsters = this.time.addEvent({delay: Phaser.Math.FloatBetween(700, 3000), callback: summon, callbackScope: this, loop: true});

        hearts = this.time.addEvent({delay: Phaser.Math.FloatBetween(1000, 4000), callback: increment, callbackScope: this, loop: true});

        
        player = this.physics.add.sprite(500,500,'walk1').setScale(0.45);

        player.setCollideWorldBounds(true);
        walls = this.physics.add.sprite(500,500,'wall').setScale(0.7);
        walls.body.allowGravity = false;
        // wall = this.physics.add.sprite(500,500,'wall').setScale(0.7);
        // wall.body.allowGravity = false;
        slash = this.physics.add.sprite(player.x+30, player.y, 'slash4', 4).setScale(0.8);
        slash.visible = false;
        slash.body.allowGravity = false;
        
        heal = this.physics.add.sprite(0,0,'heal').setScale(2.8);
        heal.setBlendMode(Phaser.BlendModes.ADD);
        heal.visible = false;
        heal.body.allowGravity = false;

        tel1 = this.physics.add.sprite(30,10,'teleport').setScale(2.8);
        tel1.setBlendMode(Phaser.BlendModes.DIFFERENCE);
        tel1.visible =false;
        tel1.body.allowGravity = false;
        tel2 = this.physics.add.sprite(10,10,'teleport5').setScale(2.8);
        tel2.setBlendMode(Phaser.BlendModes.DIFFERENCE);
        tel2.visible = false;
        tel2.body.allowGravity = false;
        
        var movingL = false;
        var movingR = false;

        leftB = this.add.sprite(90, 642, 'left').setInteractive();
        leftB.on('pointerdown', function(pointer) {
            leftB.setTint(0x999999);
            mobile = true;
            movingL = true;
            player.setVelocityX(-300);
            slash.flipX = true;
            player.anims.play('walking', true);
            player.flipX = true;
        },this);
        leftB.on('pointerup', function(pointer) {
            mobile = false;
            movingL = false;
            leftB.clearTint();
            if ((movingL==false)&&(movingR==false)) {
                player.setVelocityX(0);
            } 
            player.anims.play('stay',true);
        },this);

        rightB = this.physics.add.staticImage(250, 642, 'right').setInteractive();
        rightB.on('pointerdown', function(pointer)  {
            rightB.setTint(0x999999);
            mobile = true;
            movingR = true;
            player.setVelocityX(300);
            slash.flipX = false;
            player.anims.play('walking', true);
            player.flipX = false;
        },this);
        rightB.on('pointerup', function(pointer) {
            rightB.clearTint();
            mobile = false;
            movingR = false;
            if ((movingL==false)&&(movingR==false)) {
                player.setVelocityX(0);
            }
            player.anims.play('stay',true);
        },this);

        attackB = this.physics.add.staticImage(805, 642, 'A').setInteractive();
        attackB.on('pointerdown', function(pointer) {
            swordSound.play();
            mobile = true;
            attackB.setTint(0x999999);
            if(movingR) {
                player.flipX = false;
                slashing(player.x, player.y, false);
                player.setVelocityX(300) 
                player.anims.play('slash', true);
            } else if(movingL) {
                player.flipX = true;
                slashing(player.x, player.y, true);
                player.setVelocityX(-300) 
                player.anims.play('slash', true);
            } else {
                player.setVelocityX(0);
                player.anims.play('attacking', true);
                if(slash.flipX) {
                    slash.x = player.x - 30;
                    slash.y = player.y;
                } else {
                    slash.x = player.x + 30;
                    slash.y = player.y;
                }
                slash.anims.play('slash_attack', true);
            }
        },this);
        attackB.on('pointerup', function(pointer) {
            swordSound.pause();
            mobile = false;
            attackB.clearTint();
        },this);

        jumpB = this.physics.add.staticImage(930, 642, 'J').setInteractive();
        jumpB.on('pointerdown', function(pointer) {
            mobile = true;
            jumpB.setTint(0x999999);
            if (player.body.touching.down) {
                jumpSound.play();
                player.setVelocityY(-700);
            }
        },this);
        jumpB.on('pointerup', function(pointer) {
            jumpSound.pause();
            mobile = false;
            jumpB.clearTint();
        },this);

        dashB = this.physics.add.staticImage(680, 642, 'D').setInteractive();
        dashB.on('pointerdown', function(pointer) {
            telSound.play();
            mobile = true;
            dashB.setTint(0x999999);
            tel2.x = player.x;
            tel2.y = player.y+6;
            tel2.anims.play('teleportation5');
            if(player.flipX) {
                player.x = player.x - 150;
            } else {
                player.x = player.x + 150;
            }
            tel1.x = player.x;
            tel1.y = player.y+6;
            tel1.anims.play('teleportation');
        },this);
        dashB.on('pointerup', function(pointer) {
            telSound.pause();
            mobile = false;
            dashB.clearTint();
        },this);

        scoreText = this.add.text(16,16,'Score: ' + score, { font: '32px Arial', fill: '#33ABF9'});
        scoreText.setBlendMode(Phaser.BlendModes.ADD);
        comboText = this.add.text(650,250,'COMBO ' + combo + '!', { font: '37px Stencil', fill: '#FF69B4'});
        comboText.setBlendMode(Phaser.BlendModes.DIFFERENCE);
        comboText.visible = false;
        this.physics.add.collider(player, ground);
    },
    update: function() {
        if(hpPoint==0) {
            tree.clearTint();
            this.physics.pause();
            this.scene.stop('christmas');
            this.scene.stop('sunset');
            this.scene.start('gameOver');
            return;
        }
        walls.x = player.x;
        walls.y = player.y;
        // wall.x = player.x;
        // wall.y = player.y;
        if (mobile == false) {
            if(Phaser.Input.Keyboard.JustDown(keyD)) {
                telSound.play();
                tel2.x = player.x;
                tel2.y = player.y+6;
                tel2.anims.play('teleportation5');
                if(player.flipX) {
                    player.x = player.x - 150;
                } else {
                    player.x = player.x + 150;
                }
                tel1.x = player.x;
                tel1.y = player.y+6;
                tel1.anims.play('teleportation');
            }

            if (cursors.down.isDown) 
            {
                player.setVelocityY(1500);
            }

            if (cursors.up.isDown && player.body.touching.down)
            {   
                jumpSound.play();
                player.setVelocityY(-610);
            }

            if(keyS.isDown && cursors.left.isDown) {
                swordSound.play();
                player.flipX = true;
                slashing(player.x, player.y, true);
                player.setVelocityX(-300) 
                player.anims.play('slash', true);
            } else if (keyS.isDown && cursors.right.isDown) {
                swordSound.play();
                player.flipX = false;
                slashing(player.x, player.y, false);
                player.setVelocityX(300) 
                player.anims.play('slash', true);
            }
            else if (keyS.isDown) 
            {
                swordSound.play();
                player.setVelocityX(0);
                player.anims.play('attacking', true);

                if(slash.flipX) {
                    slash.x = player.x - 30;
                    slash.y = player.y;
                } else {
                    slash.x = player.x + 30;
                    slash.y = player.y;
                }

                slash.anims.play('slash_attack', true);
            }  
            else if (cursors.left.isDown)
            {       
                    player.setVelocityX(-300);
                    slash.flipX = true;
                    player.anims.play('walking', true);
                    player.flipX = true;
                
            }
            else if (cursors.right.isDown)
            {       
                    player.setVelocityX(300);
                    slash.flipX = false;
                    player.anims.play('walking', true);
                    player.flipX = false;
                
            } else
            {   
                player.setVelocityX(0);
                player.anims.play('stay',true);
            }

            
        }

        sparkGroup.children.iterate(function (child) {
            if(child.y > 500)
            {
                child.disableBody(true, true);
            }
        });
       
    }
});

