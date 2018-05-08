var potatoNum = 20;
var bonusStage = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    
    function bonusStage() {
        Phaser.Scene.call(this, {key: 'bonusStage'});
    },
    preload: function() {
    },
    create: function ()
    {
        this.add.image(400, 300, 'sky');
        
        platform = this.physics.add.staticImage(192, 600, 'ground');
        
        player = this.physics.add.sprite(200, 450, 'box');
        player.setScale(0.5);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platform);
        
        potatos = this.time.addEvent({delay: 300, callback: bonusScore, callbackScope: this, repeat: 19});
        scoreText = this.add.text(16,16,'Score: ' + score, { fontSize: '32px', fill: '#000'});
        hp = this.add.text(16,550,'HP: ' + health, {fontSize: '32px', fill: 'red'});
        
    },
    update: function () {
        this.input.on('pointermove', function (pointer) {
            if(player.x>0 && player.x<400) {
            player.x=pointer.x;
            player.y=515;
            }
        });
        this.physics.add.overlap(player, potatos, bonusPoints, null, this);
        this.physics.add.overlap(platform, potatos, bonusCollission, null, this);
        if (potatoNum===0) {
            potatoStage = false;
            potatoNum=20;
            this.scene.start('mainScene')   
        }
    }
});    
function bonusScore() {
    potatos = this.physics.add.sprite(Phaser.Math.FloatBetween(0, 400), 0, 'potato');
    potatos.body.gravity.y = 600;
    potatos.setScale(0.05);
    potatos.setCollideWorldBounds(true);
}
function bonusPoints(player, potato) {
    potato.disableBody(true,true);
    potatoNum--;
    score += 50;
    scoreText.setText('Score: ' + score);
}
function bonusCollission (ground, foodWaste) {
    //make it invisible
    foodWaste.disableBody(true, true);
    potatoNum--;
    damage = true;
    hp.setText('HP: ' + health);
} 