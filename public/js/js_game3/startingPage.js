var background;
var stepSound, deadSound, swordSound, telSound, damSound,
jumpSound, healSound, wrongSound1, wrongSound2, monsDied,
treeSound;
var startingPage = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    
    function startingPage() {
        Phaser.Scene.call(this, {key: 'startingPage', active: true});
    },
        
    preload: function ()
    {   
        
        
        var progress = this.add.text(370,240,'Loading...', { fontSize: '50px', fill: '#000'});;

        this.load.on('complete', function () {

            progress.destroy();

        });
        this.load.atlas('flares', 'flares.png', 'flares.json');

        this.load.image('start', 'play.png');
        this.load.image('tree', 'tree.png');
        this.load.spritesheet('teleport', 'tel1.png',{frameWidth: 41, frameHeight: 41, endFrame: 28});
        this.load.spritesheet('teleport5', 'tel5.png',{frameWidth: 45, frameHeight: 45, endFrame: 25});
        this.load.spritesheet('treeGrowing', 'treeG1.png',{frameWidth: 271, frameHeight: 249, endFrame: 50});
        this.load.spritesheet('heal', 'heal.png',{frameWidth: 41, frameHeight: 41, endFrame: 28});

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

        this.load.image('bomb', 'enemy/Potato.png');
        this.load.image('heart', 'enemy/apple.png');
        this.load.image('enemy', 'enemy/potato.png');

        this.load.image('spark', 'blue.png');

        this.load.audio('damageEffect', 'music/damaged.mp3');
        this.load.audio('deadEffect', 'music/dead.mp3');
        this.load.audio('jumpEffect', 'music/jump.mp3');
        this.load.audio('swordEffect', 'music/slash.mp3');
        this.load.audio('telEffect', 'music/teleport.mp3');
        this.load.audio('healEffect', 'music/healsound.mp3');
        this.load.audio('telEffect', 'music/teleport.mp3');
        this.load.audio('healEffect', 'music/healsound.mp3');
        this.load.audio('wrongEffect1', 'music/Aww.mp3');
        this.load.audio('wrongEffect2', 'music/torture.mp3');
        this.load.audio('monDieEffect', 'music/monsterDied.mp3');
        this.load.audio('treeDamage', 'music/treeDamage.mp3');
        this.load.audio('sakuraBack', 'music/sakuraMusic.mp3');
        this.load.audio('winterBack', 'music/winterMusic.mp3');
        this.load.audio('sunsetBack', 'music/sunsetMusic.mp3');

    },
    create: function() {
        background = this.scene.launch("spring");
        tree = this.physics.add.staticImage(500, 450, 'tree');
        var menu=this.add.image(500, 230, 'start').setInteractive();
        menu.setScale(0.25);
        menu.on('pointerdown', function() {
            background.pause();
            springMusic.pause();
            this.scene.pause('spring');
            this.scene.launch('christmas');
            this.scene.start('gameStart');
        },this);
        var loopMarker = {
            name: 'loop',
            start: 0,
            duration: 100,
            config: {
                loop: true
            }
        };
        springMusic = this.sound.add('springBack')
        springMusic.addMarker(loopMarker);
        springMusic.play('loop', {
            delay: 0
        });
    }
});