//Numerical value of what you have in the cart
var score = 0;

var numDairy = 0;
var numFruit = 0;
var numVeggies = 0;
var numMeat = 0;

//Numerical value of what you need
var numDairyNeeded = 0;
var numFruitNeeded = 0;
var numVeggiesNeeded = 0;
var numMeatNeeded = 0;

//the text for what you need
var scoreText;

var dairyText;
var fruitText; 
var veggiesText;
var meatText;

//the variable to store the groups
var fruit;
var dairy;
var veggie;
var meat;


//the difficulty level
var diff;
var diffTimer;
var diffTimeText;
var diffText;

var lose;

var reference;
var cart;

var playScene = new Phaser.Class({
    
    Extends: Phaser.Scene,

    initialize:
    
    function bootScene() {
        Phaser.Scene.call(this, { key: 'playScene'});
    },

    

    preload: function() {
        lose = 0;

        score = 0;

        numDairy = 0;
        numFruit = 0;
        numVeggies = 0;
        numMeat = 0;

        //Numerical value of what you need
        numDairyNeeded = 0;
        numFruitNeeded = 0;
        numVeggiesNeeded = 0;
        numMeatNeeded = 0;

        //the difficulty level
        diff = 1;


        this.add.image(400,500, 'floor');
        this.add.image(400,200, 'shelf');
        this.add.image(700,500, 'list');

        //Generate random number of items needed
        numDairyNeeded = Phaser.Math.Between(1,diff);
        numFruitNeeded = Phaser.Math.Between(1,diff);
        numVeggiesNeeded = Phaser.Math.Between(1,diff);
        numMeatNeeded = Phaser.Math.Between(1,diff);

        //Display texts
        scoreText = this.add.text(15,15, "Score: " + score, {
            font: '20px Arial',
            fill: '#FFFFFF'
        });
        dairyText = this.add.text(620,450, "Dairy: " + numDairy + " / " + numDairyNeeded, {
            font: '20px Arial',
            fill: '#000000'
        });
        fruitText = this.add.text(620,475, "Fruit: " + numFruit + " / " + numFruitNeeded, {
            font: '20px Arial',
            fill: '#000000'
        });
        veggiesText = this.add.text(620,500, "Veggies: " + numVeggies + " / " + numVeggiesNeeded, {
            font: '20px Arial',
            fill: '#000000'
        });
        meatText = this.add.text(620,525, "Meat: " + numMeat + " / " + numMeatNeeded, {
            font: '20px Arial',
            fill: '#000000'
        });

        diffText = this.add.text(15,60, "Difficulty Level: " + diff, {
            font: '20px Arial',
            fill: '#ffffff'
        });
    },

    create: function () {

        //save a reference of this so I can use it when iterating
        reference = this;



        diffTimeText = this.add.text(15, 40, "Time Left: ");
        diffTimer = this.time.addEvent({delay: 60000, callback: function() {
            gameOver();

        }, callbackScope: this, loop: true});

        //invisiPlatform = this.physics.add.staticGroup();
        //invisiPlatform.create(400,600, 'invisiPlatform');

        cart = this.physics.add.staticGroup();
        cart.create(400,500, 'cartBottom');

        spawner(fruit, 'fruit', fruitText);
        spawner(dairy, 'dairy', dairyText);
        spawner(veggie, 'veggies', veggiesText);
        spawner(meat, 'meat', meatText);

    },

    update: function() {

        //Check if you meet the requirements
        if(numDairy == numDairyNeeded && numFruit == numFruitNeeded &&
            numVeggies == numVeggiesNeeded && numMeat == numMeatNeeded) {
            /*
            diff = diff + 1;
            numDairyNeeded = Phaser.Math.Between(1,diff);
            numFruitNeeded = Phaser.Math.Between(1,diff);
            numVeggiesNeeded = Phaser.Math.Between(1,diff);
            numMeatNeeded = Phaser.Math.Between(1,diff);

            numDairy = 0;
            numFruit = 0;
            numVeggies = 0;
            numMeat = 0;

            dairyText.setText("Dairy: " + numDairy + " / " + numDairyNeeded);
            fruitText.setText("Fruit: " + numFruit + " / " + numFruitNeeded);
            veggiesText.setText("Veggies: " + numVeggies + " / " + numVeggiesNeeded);
            meatText.setText("Meat: " + numMeat + " / " + numMeatNeeded);
            */
            toNextLevel();

            //Reset Timer
            diffText.setText("Difficulty Level: " + diff);
            diffTimer.remove(false);
            diffTimer = this.time.addEvent({delay: 60000, callback: function() { //Game overif you run out of time
                //insert gameover here
                gameOver();


            }, callbackScope: this, loop: true});

            spawner(fruit, 'fruit', fruitText, numFruit, numFruitNeeded);
            spawner(dairy, 'dairy', dairyText, numDairy, numDairyNeeded);
            spawner(veggie, 'veggies', veggiesText, numVeggies, numVeggiesNeeded);
            spawner(meat, 'meat', meatText, numMeat, numMeatNeeded);
        }
        
        //Automatically lose if you get one extra of an item
        if((numDairy > numDairyNeeded || numFruit > numFruitNeeded ||
            numVeggies > numVeggiesNeeded || numMeat > numMeatNeeded) && lose == 0) {
            gameOver(); 
        }

        //update the time left
        diffTimeText.setText("Time Left: " + (60 - Math.floor(60 * diffTimer.getProgress())));
    }

    

});


//Function to spawn the items
function spawner(toSpawn, key, textChange) {
    toSpawn = reference.physics.add.group({
        key: key,
        repeat: numFruitNeeded * diff - 1,
        setXY: {x:30, y:0, stepX: 2}
    });      

    toSpawn.children.iterate(function(child) {
        child.setCollideWorldBounds(true);
        child.setInteractive();
        child.on('pointerover', function() {
            this.setTint(0xAAAAAA);
        });
        child.on('pointerout', function() {
            this.clearTint();
        });
        
        reference.input.setDraggable(child);
        reference.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

    });

    //Adds the check if it touches the cart
    reference.physics.add.collider(toSpawn, cart, function(toSpawn) {
        var have;
        var need;
        switch(key) {
            case 'fruit':
                numFruit++;
                have = numFruit;
                need = numFruitNeeded;
                break;
            case 'dairy':
                numDairy++;
                have = numDairy;
                need = numDairyNeeded;
                break;
            case 'veggies':
                numVeggies++;
                have = numVeggies;
                need = numVeggiesNeeded;
                break;
            default: //for meat
                numMeat++;
                have = numMeat;
                need = numMeatNeeded;
        }
        textChange.setText(key.substr(0,1).toUpperCase() + key.substr(1) + ": " + have + " / " + need);
        toSpawn.disableBody(true,true);
        score++;
        scoreText.setText('Score: ' + score);
    }, null, reference);
}


function gameOver() {
    lose = 1;
    diffTimer.remove(false);
    reference.physics.pause();
    reference.add.image(400,275, 'gameover');
    reference.add.text(300, 90, 'Game Over',{
        font: '40px Arial',
        fill: '#ffffff'
    });

    reference.add.text(60, 200, 'You bought too much food and it became rotten',{
        font: '30px Arial',
        fill: '#FFFFFF'
    });
    reference.add.text(60,230,'because you didn\'t use it all.', {
        font: '30px Arial',
        fill: '#ffffff'
    });

    reference.add.text(300, 300, 'Score: ' + score, {
        font: '30px Arial',
        fill: '#ffffff'
    });

    var retryBtn = reference.add.sprite(500,400, 'retry').setInteractive();
    retryBtn.on('pointerover', function() {
        this.setTint(0xCCCCCC);
    });
    retryBtn.on('pointerout', function() {
        this.clearTint();
    });
    retryBtn.on('pointerdown', function() {
        this.setTint(0x999999);
        reference.scene.start('playScene');
    });
    retryBtn.on('pointerup', function() {
        this.setTint(0xCCCCCC);
    });

    var backBtn = reference.add.sprite(300,400, 'back').setInteractive();
    backBtn.on('pointerover', function() {
        this.setTint(0xCCCCCC);
    });
    backBtn.on('pointerout', function() {
        this.clearTint();
    });
    backBtn.on('pointerdown', function() {
        this.setTint(0x999999);
        reference.scene.start('mainMenuScene');
    });
    backBtn.on('pointerup', function() {
        this.setTint(0xCCCCCC);
    });
    
    

}

function toNextLevel() {
    diff = diff + 1;
    numDairyNeeded = Phaser.Math.Between(1,diff);
    numFruitNeeded = Phaser.Math.Between(1,diff);
    numVeggiesNeeded = Phaser.Math.Between(1,diff);
    numMeatNeeded = Phaser.Math.Between(1,diff);

    numDairy = 0;
    numFruit = 0;
    numVeggies = 0;
    numMeat = 0;

    dairyText.setText("Dairy: " + numDairy + " / " + numDairyNeeded);
    fruitText.setText("Fruit: " + numFruit + " / " + numFruitNeeded);
    veggiesText.setText("Veggies: " + numVeggies + " / " + numVeggiesNeeded);
    meatText.setText("Meat: " + numMeat + " / " + numMeatNeeded);
}
