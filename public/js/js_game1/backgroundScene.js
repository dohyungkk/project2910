var backgroundScene = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    
    function backgroundScene() {
        Phaser.Scene.call(this, {key: "backgroundScene", active: true});
    },
        
    preload: function ()
    {   
        this.load.image("ground", "platform3.png");
        this.load.image("sky", "sky.png");
        this.load.image("box", "greenBin.png");
    },

    create: function ()
    {
        this.add.image(400, 300, "sky");
        
        platform = this.physics.add.staticImage(192, 600, "ground");
        
        player = this.physics.add.sprite(200, 450, "box");
        player.setScale(0.5);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platform);
        
    }
});