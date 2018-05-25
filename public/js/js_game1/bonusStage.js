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
        this.scene.launch('space');
        
        hpImage = this.physics.add.group({
            key: 'heart',
            repeat: health-1,
            setXY: {x: 380, y: 580, stepX: -20}
        });
        hpImage.children.iterate(function (child) {
           child.setScale(0.25);
           child.setCollideWorldBounds(true);
        });
        music = this.sound.add('bonusMusic');
        music.play();
        potatos = this.time.addEvent({delay: 300, callback: bonusScore, callbackScope: this, repeat: 19});
        scoreText = this.add.text(16,16,'Score: ' + score, { fontSize: '32px', fill: '#000'});
        this.input.on('pointermove', function (pointer) {
            if(player.x>0 && player.x<400) {
            player.x=pointer.x;
            player.y=515;
            }
        });
    },

    update: function () {
        

        
        if (potatoNum===0) {
            potatoStage = false;
            potatoNum=20;
            music.pause();
            this.scene.stop('space');
            this.scene.start('mainScene')   
        }
    }
});    
function bonusScore() {
    potatos = this.physics.add.sprite(Phaser.Math.FloatBetween(0, 400), 0, 'potato');
    potatos.body.gravity.y = 600;
    potatos.setScale(0.05);
    potatos.setCollideWorldBounds(true);
    this.physics.add.overlap(player, potatos, bonusPoints, null, this);
    this.physics.add.overlap(platform, potatos, bonusCollission, null, this);
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
} 