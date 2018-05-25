var christmas = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    
    function christmas() {
        Phaser.Scene.call(this, {key: 'christmas'});
    },
        
    preload: function ()
    {   
        this.load.image('snow', 'back2/snowFlower.png');
        this.load.image('snowsky', 'back2/winter4.png');
        this.load.atlas('flares', 'back2/flares.png', 'back2/flares.json');

        this.load.image('mCircle4', 'mcircle2/mCircle1.png');
        this.load.image('mCircle3', 'mcircle1/mCircle4.png');
        this.load.image('winter', 'back2/grass4.png');

        
    },
    create: function() {
        music.pause();
        this.add.image(500,305, 'snowsky').setScale(0.9);
        this.add.image(500,350, 'snow').setScale(0.7);

        this.physics.add.staticImage(500,75,'mCircle3').setBlendMode(Phaser.BlendModes.DIFFERENCE).setScale(0.35);
        this.physics.add.staticImage(500, 75, 'mCircle4').setBlendMode(Phaser.BlendModes.ADD).setScale(0.21);
        
        var ground1 = this.physics.add.staticGroup();
        var ground2 = this.physics.add.staticGroup();
        var x =30
        for (var i=0; i<16; i++) {
            ground2.create(x, 620, 'winter');
            ground1.create(x, 668, 'ground');
            x += 64;
        }
        
        var tree2 = new Phaser.Geom.Triangle.BuildEquilateral(0, -250, 400);
        var trunk = new Phaser.Geom.Rectangle(0, 0, 80, 140);
        var baubles = new Phaser.Geom.Line(0, 0, 170, 60);
        var baubles2 = new Phaser.Geom.Line(0, 0, 310, 70);

        var particles = this.add.particles('flares');

        particles.createEmitter({
            frame: 'green',
            x: 500, y: 300,
            speed: 0,
            lifespan: 2000,
            delay: 2000,
            quantity: 48,
            frequency: 2000,
            delay: 500,
            scale: { start: 0.4, end: 0.1 },
            blendMode: 'ADD',
            emitZone: { type: 'edge', source: tree2, quantity: 48 }
        });

        particles.createEmitter({
            frame: 'blue',
            x: 460, y: 420,
            speed: 0,
            lifespan: 500,
            delay: 500,
            frequency: 0,
            quantity: 1,
            scale: 0.2,
            blendMode: 'ADD',
            emitZone: { type: 'edge', source: trunk, quantity: 48 }
        });

        particles.createEmitter({
            frame: 'red',
            x: 500, y: 300,
            lifespan: 500,
            quantity: 1,
            frequency: 200,
            scale: 0.6,
            blendMode: 'ADD',
            emitZone: { type: 'edge', source: tree2, quantity: 12 }
        });

        particles.createEmitter({
            frame: { frames: [ 'red', 'yellow', 'blue' ], cycle: true },
            x: 440, y: 200,
            lifespan: 200,
            quantity: 1,
            frequency: 50,
            scale: 0.4,
            blendMode: 'ADD',
            emitZone: { type: 'edge', source: baubles, quantity: 10 }
        });

        particles.createEmitter({
            frame: { frames: [ 'red', 'yellow', 'blue' ], cycle: true },
            x: 380, y: 300,
            lifespan: 200,
            quantity: 1,
            frequency: 50,
            scale: 0.4,
            blendMode: 'ADD',
            emitZone: { type: 'edge', source: baubles2, quantity: 16 }
        });
        var loopMarker = {
            name: 'loop',
            start: 0,
            duration: 100,
            config: {
                loop: true
            }
        };
        music = this.sound.add('winterBack');
        music.addMarker(loopMarker);
        music.play('loop', {
            delay: 0
        });
        
    }
});