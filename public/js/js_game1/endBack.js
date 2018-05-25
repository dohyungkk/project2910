var pops = [];
var endBack = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:

    function endBack() {
        Phaser.Scene.call(this, {key: 'endBack' });
    },

    preload: function ()
    {
        // this.load.image('bubble', 'lantern.png');
   
        // this.load.image('planet', 'blue-planet.png');
    },

    create: function ()
    {
        // platform = this.physics.add.staticImage(200, 619, 'endGround');
        // platform.setScale(0.5);
        this.add.image(200,400, 'black').setBlendMode(Phaser.BlendModes.DIFFERENCE).setScale(2);
        this.add.image(200, 400, 'sunsetSky').setBlendMode(Phaser.BlendModes.DIFFERENCE);

        // this.add.image(200, 675, 'planet').setScale(0.5);

        for (var i = 0; i < 77; i++)
        {
        var x = Phaser.Math.Between(-30, 500);
        var y = Phaser.Math.Between(-30, 600);

        var bubbles = this.add.image(x, y, 'sunlight').setScale(0.7);
        bubbles.setBlendMode(Phaser.BlendModes.OVERLAY);
        bubbles.setBlendMode(Phaser.BlendModes.ADD);

        pops.push({ s: bubbles, r: 2 + Math.random() * 7 });
        }
//        player = this.physics.add.sprite(200, 500, 'box').setBlendMode(Phaser.BlendModes.MULTIPLY);
         player = this.physics.add.sprite(200, 500, 'box').setBlendMode(Phaser.BlendModes.ADD);
//         player = this.physics.add.sprite(200, 500, 'box').setBlendMode(Phaser.BlendModes.SCREEN);
        // player = this.physics.add.sprite(200, 500, 'box').setBlendMode(Phaser.BlendModes.DIFFERENCE);
        player.setScale(0.5);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platform);

    },

    update: function () {
        for (var i = 0; i < pops.length; i++)
        {
            var sprite = pops[i].s;

            sprite.y -= pops[i].r;
            sprite.x += 2;
            sprite.x -= Math.random();

            if (sprite.y < -100 && sprite.x > 250)
            {
                sprite.y = 650;
                sprite.x = Phaser.Math.Between(-300, 350);
            }
        }
    }
});