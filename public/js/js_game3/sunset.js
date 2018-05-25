var pops = [];
var sunset = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    
    function sunset() {
        Phaser.Scene.call(this, {key: 'sunset'});
    },
        
    preload: function ()
    {   
        this.load.image('sunsetGround', 'back3/grass2.png');
        this.load.image('sunlight', 'back3/yellow.png');
        this.load.image('sky1', 'back3/fire.png');
        this.load.image('mCircle8', 'mcircle2/mCircle3.png');
        this.load.image('mCircle7', 'mcircle1/mCircle6.png');
    },
    create: function() {
        music.pause();
        this.add.image(500,225, 'sky1').setScale(1.3);
        for (var i = 0; i < 77; i++)
        {
        var x = Phaser.Math.Between(-30, 1000);
        var y = Phaser.Math.Between(-30, 700);

        var bubbles = this.add.image(x, y, 'sunlight').setScale(0.7);
        bubbles.setBlendMode(Phaser.BlendModes.OVERLAY);
        bubbles.setBlendMode(Phaser.BlendModes.ADD);

        pops.push({ s: bubbles, r: 2 + Math.random() * 7 });
        }
        this.physics.add.staticImage(500,75,'mCircle7').setBlendMode(Phaser.BlendModes.DIFFERENCE).setScale(0.35);
        this.physics.add.staticImage(500, 75, 'mCircle8').setBlendMode(Phaser.BlendModes.ADD).setScale(0.21);
        
        var ground1 = this.physics.add.staticGroup();
        var ground2 = this.physics.add.staticGroup();
        var x =30
        for (var i=0; i<16; i++) {
            ground2.create(x, 620, 'sunsetGround');
            ground1.create(x, 668, 'ground');
            x += 64;
        }

        var sun = this.add.particles('flares');
        sun.createEmitter({
            frame: 'yellow',
            x: 850, y: 150,
            lifespan: { min: 600, max: 800 },
            angle: { start: 0, end: 360, steps: 64 },
            speed: 200,
            quantity: 64,
            scale: { start: 0.2, end: 0.1 },
            frequency: 32,
            blendMode: 'ADD'
        });
        var loopMarker = {
            name: 'loop',
            start: 0,
            duration: 100,
            config: {
                loop: true
            }
        };
        music = this.sound.add('sunsetBack');
        music.addMarker(loopMarker);
        music.play('loop', {
            delay: 0
        });
        
    },
    update: function () {
        for (var i = 0; i < pops.length; i++)
        {
            var sprite = pops[i].s;

            sprite.y += pops[i].r;
            sprite.x -= 2;
            sprite.x += Math.random();

            if (sprite.y > 650 && sprite.x < 550)
            {
                sprite.y = -30;
                sprite.x = Phaser.Math.Between(-30, 1400);
            }
        }
    }
});