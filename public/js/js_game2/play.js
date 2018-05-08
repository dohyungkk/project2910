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
        diff = 1;
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
        
        genItemNeeded();

        //the difficulty level
        


        this.add.image(400,500, 'floor');
        this.add.image(400,200, 'shelf');
        this.add.image(700,500, 'list');

        //Generate random number of items needed
        /*
        numDairyNeeded = Phaser.Math.Between(1,diff);
        numFruitNeeded = Phaser.Math.Between(1,diff);
        numVeggiesNeeded = Phaser.Math.Between(1,diff);
        numMeatNeeded = Phaser.Math.Between(1,diff);
        */
        
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

        //Making the invisble shelves
        fruitPlatform = this.physics.add.staticGroup();
        fruitPlatform.create(100, 175, 'smallPlatform');
        dairyPlatform = this.physics.add.staticGroup();
        dairyPlatform.create(100, 375, 'smallPlatform');
        veggiePlatform = this.physics.add.staticGroup();
        veggiePlatform.create(700, 175, 'smallPlatform');
        meatPlatform = this.physics.add.staticGroup();
        meatPlatform.create(700, 375, 'smallPlatform');
        


        //makes the first timer
        diffTimeText = this.add.text(15, 40, "Time Left: ");
        diffTimer = this.time.addEvent({delay: 60000, callback: function() {
            gameOver();

        }, callbackScope: this, loop: true});

        //adds the cart
        cart = this.physics.add.staticGroup();
        cart.create(400,500, 'cartBottom');
        this.add.sprite(400,440, 'cartTop');

        //Spawns the items
        fullSpawner();

    },

    update: function() {

        //Check if you meet the requirements
        if(numDairy == numDairyNeeded && numFruit == numFruitNeeded &&
            numVeggies == numVeggiesNeeded && numMeat == numMeatNeeded) {
            
            toNextLevel();

            //Reset Timer
            diffText.setText("Difficulty Level: " + diff);
            diffTimer.remove(false);
            diffTimer = this.time.addEvent({delay: 60000, callback: function() { //Game overif you run out of time
                //insert gameover here
                gameOver();


            }, callbackScope: this, loop: true});
            
            //delete old children
            deleteAllChilds();
            fullSpawner();
        }
        

        if((numDairy < numDairyNeeded || numFruit < numFruitNeeded||
            numVeggies < numVeggiesNeeded || numMeat < numMeatNeeded) && lose == 0) {
            gameOver();
        }

        /*
        //Automatically lose if you get one extra of an item
        if((numDairy > numDairyNeeded || numFruit > numFruitNeeded ||
            numVeggies > numVeggiesNeeded || numMeat > numMeatNeeded) && lose == 0) {
            gameOver(); 
        }
        */

        //update the time left
        diffTimeText.setText("Time Left: " + (60 - Math.floor(60 * diffTimer.getProgress())));
    }

    

});

/*generates a random amount of items needed and number amount of items */
function genItemNeeded() {
    numFruitNeeded = Phaser.Math.Between(1,diff);
    numDairyNeeded = Phaser.Math.Between(1,diff);
    numVeggiesNeeded = Phaser.Math.Between(1,diff);
    numMeatNeeded = Phaser.Math.Between(1,diff);
    
    numFruit = Phaser.Math.Between(2,diff*1.5);
    numDairy = Phaser.Math.Between(2,diff*1.5);
    numVeggies = Phaser.Math.Between(2,diff*1.5);
    numMeat =  Phaser.Math.Between(2,diff*1.5);
    
}

function fullSpawner() {
    spawner(fruit, 'fruit', fruitText, numFruit);
    spawner(dairy, 'dairy', dairyText, numDairy);
    spawner(veggie, 'veggies', veggiesText, numVeggies);
    spawner(meat, 'meat', meatText, numMeat);
    addItemColliders();
}

//Adds 
function addItemColliders() {
    reference.physics.add.collider(fruit, fruit);
    reference.physics.add.collider(fruit, dairy);
    reference.physics.add.collider(fruit, veggie);
    reference.physics.add.collider(fruit, meat);

    reference.physics.add.collider(dairy, dairy);
    reference.physics.add.collider(dairy, veggie);
    reference.physics.add.collider(dairy, meat);
    
    reference.physics.add.collider(veggie, veggie);
    reference.physics.add.collider(veggie, meat);

    reference.physics.add.collider(meat, meat);

    //Adding specific colliders for moving to the shelves and places it on the shelf and is unmovable again
    reference.physics.add.overlap(fruit, fruitPlatform, function(fruit){
        fruit.disableBody(true, true);
        numFruit--;
        fruitText.setText("Fruit: " + numFruit + " / " + numFruitNeeded);
        reference.add.sprite(Phaser.Math.Between(50,150), Phaser.Math.Between(150,160), 'fruit');
    }, null, reference);

    reference.physics.add.overlap(dairy, dairyPlatform, function(dairy){
        dairy.disableBody(true, true);
        numDairy--;
        dairyText.setText("Dairy: " + numDairy + " / " + numDairyNeeded);
        reference.add.sprite(Phaser.Math.Between(50,150), Phaser.Math.Between(340,355), 'dairy');
    }, null, reference);

    reference.physics.add.overlap(veggie, veggiePlatform, function(veggie){
        veggie.disableBody(true, true);
        numVeggies--;
        veggiesText.setText("Veggies: " + numVeggies + " / " + numVeggiesNeeded);
        reference.add.sprite(Phaser.Math.Between(650,750), Phaser.Math.Between(100,150), 'veggies');
    }, null, reference);

    reference.physics.add.overlap(meat, meatPlatform, function(meat){
        meat.disableBody(true, true);
        numMeat--;
        meatText.setText("Meat: " + numMeat + " / " + numMeatNeeded);
        reference.add.sprite(Phaser.Math.Between(650,750), Phaser.Math.Between(350,375), 'meat');
    }, null, reference);
}

//Function to spawn an item
function spawner(toSpawn, key, textChange, numOfItems) {

    toSpawn = reference.physics.add.group();
    for(i = 0; i < numOfItems; i++) {
        toSpawn.create(Phaser.Math.Between(300,500), Phaser.Math.Between(0,375), key);
    }

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
    /*
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
    */

    //Setting the items to the toSpawn it corresponds to to setup for collisions
    switch(key) {
        case 'fruit':
            fruit = toSpawn;
            break;
        case 'dairy':
            dairy = toSpawn;
            break;
        case 'veggies':
            veggie = toSpawn;
            break;
        default: //for meat
            meat = toSpawn;
    }

    //Adding basic colliders
    reference.physics.add.collider(toSpawn, cart);
    //reference.physics.add.collider(toSpawn, toSpawn);
    

    switch(key) {
        case 'fruit':
            reference.physics.add.collider(toSpawn, fruitPlatform);
            break;
        case 'dairy':
            reference.physics.add.collider(toSpawn, dairyPlatform);
            break;
        case 'veggies':
            reference.physics.add.collider(toSpawn, veggiePlatform);
            break;
        default: //for meat
            reference.physics.add.collider(toSpawn, meatPlatform);
    }
}

function deleteAllChilds() {
    deleteChild(fruit);
    deleteChild(dairy);
    deleteChild(veggie);
    deleteChild(meat);
}

function deleteChild(toDelete) {
    toDelete.children.iterate(function(child) {
        child.disableBody(true,true);
    });
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
    genItemNeeded();

    dairyText.setText("Dairy: " + numDairy + " / " + numDairyNeeded);
    fruitText.setText("Fruit: " + numFruit + " / " + numFruitNeeded);
    veggiesText.setText("Veggies: " + numVeggies + " / " + numVeggiesNeeded);
    meatText.setText("Meat: " + numMeat + " / " + numMeatNeeded);
}
