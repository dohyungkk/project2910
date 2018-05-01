var startButton = document.createElement("Button");
startButton.innerHTML = "Start Game";

var fullscreen = 0;
var fulScrnBtn = document.getElementById("fulscrnBtn");


var gameStarted = 0; //use to prevent the start of more timers after clicking the game once

var difficulty = 1;
var gameTime = 60; //The game time per round until difficulty increases
var timer; //used as the variable for the time counter

// JH = canvos info.
var canvas = document.getElementById("gameSpace");
var cs = getComputedStyle(gameSpace);
var timerWords = canvas.getContext("2d");

// JH - Calculating the current canvas width.
function curCanWidth(){
    return parseInt(cs.getPropertyValue('width'), 10);
}
// JH - Calculating the current canvas height.
function curCanHeight(){
    return parseInt(cs.getPropertyValue('height'),10);
}

// JH - create the title in front page.
var startTitle = canvas.getContext("2d");
function createTitle(){
    startTitle.font ="50px arial";
    startTitle.textAlign="center";
    startTitle.textBaseLine="middle";
    startTitle.fillText("SHOPPING GAME", canvas.width/2, canvas.height/2);
}

// JH - clears the context.
function clearContext(){
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// JH - create the start Button in front page.
var startBtn = canvas.getContext("2d");
function createStartBtn(){    
    startBtn.beginPath();
    startBtn.rect((canvas.width/2 - 100),(canvas.height/2 +50), 200, 100);
    startBtn.fillStyle= '#0000FF';
    startBtn.fill();
    startBtn.lineWidth=2;
    startBtn.stroke();
    startBtn.font ="20px arial";
    startBtn.fillStyle= '#000000';
    startBtn.fillText("START", canvas.width/2, canvas.height/2 + 110);
}

// JH - loads the food Containers to the canvas.
var vegeCont = canvas.getContext("2d");
var meatCont = canvas.getContext("2d");
var milkCont = canvas.getContext("2d");
var fruitCont = canvas.getContext("2d");

function initGame(){
    // JH - init. the vegetable container
    vegeCont.beginPath();
    vegeCont.rect(0, 100, 300, 200);
    vegeCont.fillStyle='#008000';
    vegeCont.fill();
    vegeCont.lineWidth=2;
    vegeCont.stroke();

    // JH - init. the meat container.
    meatCont.beginPath();
    meatCont.rect(0, 350, 300, 200);
    meatCont.fillStyle='#FF0000';
    meatCont.fill();
    meatCont.lineWidth=2;
    meatCont.stroke();

    // JH - init. the milk Container.
    milkCont.beginPath();
    milkCont.rect(980, 100, 300, 200);
    milkCont.fillStyle='#FFFFFF';
    milkCont.fill();
    milkCont.lineWidth=2;
    milkCont.stroke();

    // JH - init. the fruit container.
    fruitCont.beginPath();
    fruitCont.rect(980, 350, 300, 200);
    fruitCont.fillStyle='#FFA500';
    fruitCont.fill();
    fruitCont.lineWidth=2;
    fruitCont.stroke();
}

// var vegetable = canvas.getContext("2d");
// var meat = canvas.getContext("2d");
// var milk = canvas.getContext("2d");
// var fruit = canvas.getContext("2d");

// var milk = canvas.getContext('2d');
// function putMilk(){
//     milk = canvas.getContext('2d');
//     var milkImg = new Image(0.05, 0.05);
//     milkImg.onload = function() {
//         milk.drawImage(milkImg, 0, 0);
//     };

//     milkImg.src = 'milk.png';
// }


// JH - falling
var ctx = canvas.getContext("2d");
var milk = new Image();
milk.src = "milk.png";
var fruit = new Image();
fruit.src= "banana.png";
var noOfMilk = 10;
var fallingObjArr = [];

for (var i = 0; i < noOfMilk; i++){
    var x = Math.floor(Math.random() * 300) + 500;
    var y = 0;
    var y = Math.floor(Math.random() * 100);
    var image = Math.random()*2 > 1 ? milk:fruit;
    fallingObjArr[i] = new FallingObj(x,y,image);
}
// JH - constructs the falling obj.
function FallingObj(x,y,image){
    this.x = x;
    this.y = y;
    this.image = image;

    this.fall = function(){
        this.y = this.y+1;
        if(this.y > 550){
            this.y = 550;
        }
    }

    this.show = function(){
        ctx.drawImage(image, this.x, this.y, 50, 50);
    }
}
// JH
function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(400, 0, 500, 600);
    ctx.fillStyle = "blue";
    ctx.fillRect(500, 600, 300, 100);
    for(var i = 0; i<noOfMilk; i++){
        fallingObjArr[i].show();
        fallingObjArr[i].fall();
    }    
}

// JH
function update(){
    draw();
    window.requestAnimationFrame(update);
}

// JH - records the current start button.
var rect = {
    x: calWidth(),
    y: calHeight(),
    width: 200,
    height: 100
}

// JH - calculates the canvas width
function calWidth(){
    return (canvas.width/2 -100) * curCanWidth() / canvas.width;
}

// JH - calculates the canvas height
function calHeight(){
    return (canvas.height/2 +50) * curCanHeight() / canvas.height;
}

// JH - get the mouse pos.
function getMousePos(canvas, event){
    var rect = canvas.getBoundingClientRect();
    return{
        x: event.clientX - rect.left,
        y: event.clientY - rect.top};
}

// JH - check if it is inside.
function isInside(pos, rect){
    rect.x = calWidth();
    rect.y = calHeight();
    return pos.x > rect.x && pos.x < (rect.x + rect.width) &&
            pos.y < (rect.y + rect.height) && pos.y > rect.y
}

// JH - click event on the canvas
var begin = false;
canvas.addEventListener('click', function(event){
    var mousePos = getMousePos(canvas, event);

    if (!begin && isInside(mousePos, rect)){
        //alert("inside");
        clearContext();
        timerStart();
        begin = true;
        initGame();
        update();
        //putMilk();
    }
    //  else{
    //     alert("outside" + mousePos.x + " " + mousePos.y);
    // }
}, false);



function goFullscreen() {
    if(fullscreen == 0) {
        var docElm = document.documentElement;
        if(docElm.requestFullscreen) {
            docElm.requestFullscreen();
        }
        else if(docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        }
        else if(docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
        else if(docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        }
        fulScrnBtn.innerHTML = "Exit Fullscreen";
        fullscreen = 1;
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        fulScrnBtn.innerHTML = "Enter Fullscreen";
        fullscreen = 0;
    }
}

function timerStart() { //used to start the timer when the canvas is clicked
    if(gameStarted == 0) {
        gameStarted = 1;
        timer = setInterval(timerFunc, 1000);
    }  
}

function timerFunc() { //is the timer
    timerWords.clearRect(0,0,150,25);  
    if(gameTime == -1) {
        gameTime = 60;
        difficulty++;
    }
    timerWords.font = "25px arial";
    timerWords.strokeText("Time Left: " + gameTime,10,30);
    gameTime--;
}

// JH - load the page.
createTitle();
createStartBtn();

