var canv, ctx, piece;
var objDrops = [];
var health = 10;
var score, score, soundEff, backMusic;
window.onload = function gameInit() {
	canv=document.getElementById("catchGame");
	ctx = canv.getContext("2d");
	
	//sound effect when object hits ground.
	soundEff = document.createElement("audio");
	soundEff.src = "effect.mp3";
	soundEff.setAttribute("preload", "auto");
    soundEff.setAttribute("controls", "none");
    soundEff.style.display = "none";
    document.body.appendChild(soundEff);
	
	//background music.
	backMusic= document.createElement("audio");
	backMusic.src = "background.mp3";
	backMusic.setAttribute("preload", "auto");
    backMusic.setAttribute("controls", "none");
    backMusic.style.display = "none";
    document.body.appendChild(backMusic);
	
	//backgground music play.
	backMusic.play();
	
	//for computer.
	document.addEventListener('mousemove', function (e) {
		mx=e.pageX;
		}
	)
	
	//for mobile.
	document.addEventListener('touchmove', function (e) {
		mx = e.touches[0].screenX;//first touch.
		}
	)
	
	//frame.
	interval = setInterval(game,10);
}

frameNo =0;
//dropping speed.
gravity = 1;
speed = 0;
//initial position of game piece.
oy=ox=0;
objW=objH=0;
px=mx=200;
py=557;
score=0;
objNum = 150;
function game() {
	if (health == 0) {
		clearInterval(interval);
		backMusic.pause();
		return;
	}
	
	for (var i =0; i<objDrops.length; i++) {
		if(hit(objDrops[i])) {
			objDrops.slice(i);
			score+=25;
		}
		if(droped(objDrops[i])) {
			objDrops.slice(i);
			soundEff.play();
			health--;
		}
	}
	if(gravity<11) {
		if((frameNo/200)%1==0) {
			gravity+=0.1
			if(objNum>50){
				objNum-=10;
			}
		}
	}
	frameNo++;
	//moving piece position.
	px=mx;
	if(px>360) {
		px=360;
	}
	
	//canvas.
	ctx.fillStyle="#f1f1f1";
	ctx.fillRect(0,0,canv.width,canv.height);
	
	//score.
	ctx.font = "15px Consolas";
	ctx.fillStyle="black";
	ctx.fillText("SCORE: " + score, 250, 20);
	
	//piece to move.
	ctx.fillStyle="Lime";
	ctx.fillRect(px,py,40,40);
	
	//multiple dropping.
	ctx.fillStyle="blue";
	if(frameNo==1 || createObj(objNum)) {
		oy=0;
		ox=Math.floor(Math.random()*390);
		objW=Math.floor(Math.random()*30)+10;
		objH=Math.floor(Math.random()*30)+10;
		ctx.fillRect(ox,oy,objW,objH);
		//arraylist with properties.
		objDrops.push({x:ox,y:oy,width:objW,height:objH});
	}
	for(var i=0; i<objDrops.length; i++) {
		objDrops[i].y+=gravity;
		ctx.fillRect(objDrops[i].x,objDrops[i].y,objDrops[i].width,objDrops[i].height);
	}
}
function createObj(n) {
	if((frameNo/n)%1==0) {
	return true;
	}
	return false;
}

function hit(obj) {
	var pleft = px;
	var pright = px+40;
	var ptop = py;
	var pbottom = py+40;
	var objLeft = obj.x;
	var objRight = obj.x + obj.width;
	var objTop = obj.y;
	var objBottom = obj.y + obj.height;
	var crash = false;
	if ((pleft==objRight) || (pright==objLeft) || (ptop==objBottom) || (pbottom==objTop)) {
		crash = true;
	}
	return crash;
}

function droped(obj) {
	if(canv.height==(obj.y+obj.height)) {
		return true;
	}
	return false;
}
