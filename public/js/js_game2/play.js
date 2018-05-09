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
var losetype;

var reference;
var cart;

var easterEgg

var playScene = new Phaser.Class({
    
    Extends: Phaser.Scene,

    initialize:
    
    function bootScene() {
        Phaser.Scene.call(this, { key: 'playScene'});
    },

    

    preload: function() {
        lose = 0;
        losetype = 0;
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
        
        //Randomizes the amount of things you need
        genItemNeeded();

        this.add.image(400,500, 'floor');
        this.add.image(400,200, 'shelf');
        this.add.image(700,500, 'list');
        
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
        fruitPlatform.create(100, 150, 'fruitSign');
        dairyPlatform = this.physics.add.staticGroup();
        dairyPlatform.create(100, 350, 'dairySign');
        veggiePlatform = this.physics.add.staticGroup();
        veggiePlatform.create(700, 150, 'veggieSign');
        meatPlatform = this.physics.add.staticGroup();
        meatPlatform.create(700, 350, 'meatSign');
        


        //makes the first timer
        diffTimeText = this.add.text(15, 40, "Time Left: ");
        diffTimer = this.time.addEvent({delay: 60000, callback: function() {
            losetype = 0;
            gameOver(1);

        }, callbackScope: this, loop: true});

        //adds the cart
        cart = this.physics.add.staticGroup();
        cart.create(400,500, 'cartBottom');
        this.add.sprite(400,440, 'cartTop');

        //Spawns the items
        fullSpawner();

        //one of the easter eggs to display a green bin
        if(eeSign1 == 1 && eeSign2 == 1
        && eeSign3 == 1 && eeSign4 == 1) {
            easterEgg = this.add.sprite(100,500, 'greenBin').setScale(0.5);
        }


    },

    update: function() {

        //Check if you meet the requirements to go to the next level
        if(numDairy == numDairyNeeded && numFruit == numFruitNeeded &&
            numVeggies == numVeggiesNeeded && numMeat == numMeatNeeded) {
            
            toNextLevel();

            //Reset Timer
            diffText.setText("Difficulty Level: " + diff);
            diffTimer.remove(false);
            diffTimer = this.time.addEvent({delay: 60000, callback: function() { //Game overif you run out of time
                losetype = 0;
                gameOver(1);


            }, callbackScope: this, loop: true});
            
            //delete old children (removes old items before the next level)
            deleteAllChilds();
            fullSpawner();
        }
        
        //Lose if you dont have enough in the cart
        if((numDairy < numDairyNeeded || numFruit < numFruitNeeded||
            numVeggies < numVeggiesNeeded || numMeat < numMeatNeeded) && lose == 0) {
            losetype = 1;
            gameOver(0);
        }
        diffTimeText.setText("Time Left: " + (60 - Math.floor(60 * diffTimer.getProgress())));


        if(eeSign1 == 1 && eeSign2 == 1
        && eeSign3 == 1 && eeSign4 == 1) {
            easterEgg.rotation += 0.05;
            Phaser.Actions.Rotate(fruit.getChildren(), 0.01);
            Phaser.Actions.Rotate(dairy.getChildren(), 0.02);
            Phaser.Actions.Rotate(veggie.getChildren(), 0.03);
            Phaser.Actions.Rotate(meat.getChildren(), 0.04);
            
        }    
    }
});

/*generates a random amount of items needed and number amount of items */
function genItemNeeded() {
    numFruitNeeded = Math.floor(Phaser.Math.Between(1,diff));
    numDairyNeeded = Math.floor(Phaser.Math.Between(1,diff));
    numVeggiesNeeded = Math.floor(Phaser.Math.Between(1,diff));
    numMeatNeeded = Math.floor(Phaser.Math.Between(1,diff));
    
    numFruit = Math.floor(Phaser.Math.Between(numFruitNeeded + 1,diff*2));
    numDairy = Math.floor(Phaser.Math.Between(numDairyNeeded + 1,diff*2));
    numVeggies = Math.floor(Phaser.Math.Between(numVeggiesNeeded + 1,diff*2));
    numMeat =  Math.floor(Phaser.Math.Between(numMeatNeeded + 1,diff*2));
    
}

//Used to spawn all 4 types and give them their colliders
function fullSpawner() {
    spawner(fruit, 'fruit', fruitText, numFruit);
    spawner(dairy, 'dairy', dairyText, numDairy);
    spawner(veggie, 'veggies', veggiesText, numVeggies);
    spawner(meat, 'meat', meatText, numMeat);
    addItemColliders();
}

//Adds the colliders (needs to be used after spawning all 4 types)
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
        score++;
        fruitText.setText("Fruit: " + numFruit + " / " + numFruitNeeded);
        scoreText.setText("Score: " + score);
        reference.add.sprite(Phaser.Math.Between(50,150), Phaser.Math.Between(150,160), 'fruit');
    }, null, reference);

    reference.physics.add.overlap(dairy, dairyPlatform, function(dairy){
        dairy.disableBody(true, true);
        numDairy--;
        score++;
        dairyText.setText("Dairy: " + numDairy + " / " + numDairyNeeded);
        scoreText.setText("Score: " + score);
        reference.add.sprite(Phaser.Math.Between(50,150), Phaser.Math.Between(340,355), 'dairy');
    }, null, reference);

    reference.physics.add.overlap(veggie, veggiePlatform, function(veggie){
        veggie.disableBody(true, true);
        numVeggies--;
        score++;
        veggiesText.setText("Veggies: " + numVeggies + " / " + numVeggiesNeeded);
        scoreText.setText("Score: " + score);
        reference.add.sprite(Phaser.Math.Between(650,750), Phaser.Math.Between(100,150), 'veggies');
    }, null, reference);

    reference.physics.add.overlap(meat, meatPlatform, function(meat){
        meat.disableBody(true, true);
        numMeat--;
        score++;
        meatText.setText("Meat: " + numMeat + " / " + numMeatNeeded);
        scoreText.setText("Score: " + score);
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
        child.setBounce(0.5);
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

    //Adding default collider for all of them to collide with the cart
    reference.physics.add.collider(toSpawn, cart);

    //Adding collider for it to collide with it's corresponding platform
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

//Deletes all of the groups' children
function deleteAllChilds() {
    deleteChild(fruit);
    deleteChild(dairy);
    deleteChild(veggie);
    deleteChild(meat);
}

//Deletes the children of a group (eg. removes all the draggable veggie groups)
function deleteChild(toDelete) {
    toDelete.children.iterate(function(child) {
        child.disableBody(true,true);
    });
}

//Displays the gameover message with the chance to restart or go back to the start screen
function gameOver(type) {
    lose = 1;
    diffTimer.remove(false);
    reference.physics.pause();
    reference.add.image(400,275, 'gameover');
    reference.add.text(300, 90, 'Game Over' + type,{
        font: '40px Arial',
        fill: '#ffffff'
    });

    if(type == 0) {
        reference.add.text(60, 200, 'You didn\'t buy enough food on the shopping list.',{
        font: '30px Arial',
        fill: '#FFFFFF'
        });
    } else {
        reference.add.text(60,200,'You bought too much food.', {
        font: '30px Arial',
        fill: '#ffffff'
        });
    }
    
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

//Used to increase the difficulty and adjust text accordingly when increasing the level
function toNextLevel() {
    diff = diff + 1;
    genItemNeeded();

    dairyText.setText("Dairy: " + numDairy + " / " + numDairyNeeded);
    fruitText.setText("Fruit: " + numFruit + " / " + numFruitNeeded);
    veggiesText.setText("Veggies: " + numVeggies + " / " + numVeggiesNeeded);
    meatText.setText("Meat: " + numMeat + " / " + numMeatNeeded);
}
