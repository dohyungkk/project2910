var sakura = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    
    function sakura() {
        Phaser.Scene.call(this, {key: 'sakura'});
    },
        
    preload: function ()
    {   
        this.load.image('sakura', 'back1/sakura.png');
        this.load.image('sakurasky', 'back1/skysakura.png');
        this.load.image('mCircle5', 'mcircle2/mCircle2.png');
        this.load.image('mCircle4', 'mcircle1/mCircle5.png');
        this.load.image('sakuraGround', 'back1/grass3.png')

    },
    create: function() {
        this.add.image(500,305, 'sakurasky').setScale(1.3);
        this.add.image(500,350, 'sakura').setScale(1.3);

        this.physics.add.staticImage(500,75,'mCircle4').setBlendMode(Phaser.BlendModes.DIFFERENCE).setScale(0.35);
        this.physics.add.staticImage(500, 75, 'mCircle5').setBlendMode(Phaser.BlendModes.ADD).setScale(0.21);
        

        var ground1 = this.physics.add.staticGroup();
        var ground2 = this.physics.add.staticGroup();
        var x =30
        for (var i=0; i<16; i++) {
            ground2.create(x, 620, 'sakuraGround');
            ground1.create(x, 668, 'ground');
            x += 64;
        }
    }
});