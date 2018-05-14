var pops = [];
var space = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    
    function space() {
        Phaser.Scene.call(this, {key: 'space'});
    },
        
    preload: function ()
    {   
        // this.load.image('ground', 'ground.png');
        this.load.image('space', 'space4.png');
        this.load.image('box', 'greenBin.png');
        this.load.image('bubble', 'blue.png');
        this.load.image('planet', 'blue-planet.png');
    },

    create: function ()
    {
        
        this.add.image(200, 300, 'space').setBlendMode(Phaser.BlendModes.DIFFERENCE);
        // platform = this.physics.add.staticImage(200, 597, 'ground');
        // platform.setScale(0.5);
        this.add.image(200, 675, 'planet').setScale(0.5);
        
        for (var i = 0; i < 45; i++)
        {
        var x = Phaser.Math.Between(-30, 500);
        var y = Phaser.Math.Between(-30, 500);

        var bubbles = this.add.image(x, y, 'bubble');
        bubbles.setBlendMode(Phaser.BlendModes.OVERLAY);
        bubbles.setBlendMode(Phaser.BlendModes.ADD);

        pops.push({ s: bubbles, r: 2 + Math.random() * 7 });
        }
//        player = this.physics.add.sprite(200, 500, 'box').setBlendMode(Phaser.BlendModes.MULTIPLY);
         // player = this.physics.add.sprite(200, 500, 'box').setBlendMode(Phaser.BlendModes.ADD);
//         player = this.physics.add.sprite(200, 500, 'box').setBlendMode(Phaser.BlendModes.SCREEN);
        player = this.physics.add.sprite(200, 500, 'box').setBlendMode(Phaser.BlendModes.DIFFERENCE);
        player.setScale(0.5);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platform);

    },

    update: function () {
        this.input.on('pointermove', function (pointer) {
            if(player.x>0 && player.x<400) {
            player.x=pointer.x;
            player.y=515;
            }
        });
        for (var i = 0; i < pops.length; i++)
        {
        var sprite = pops[i].s;

        sprite.y -= pops[i].r;

            if (sprite.y < -100)
            {
                sprite.y = 650;
            }
        }
    }
});
    
