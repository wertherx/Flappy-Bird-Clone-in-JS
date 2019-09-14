

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


document.addEventListener("keydown", keyDown);



var rPressed = false;

function keyDown(e){

	if(e.keyCode == 32){
		spacePressed = true;
		console.log("asd")
		jump();
	}
	
}

var background = new Image();
background.src = "Sprites/background-day.png"



var baseSpeed = -1;
var baseX = 0;


var base = new Image();
base.src = "Sprites/base.png"

var xPipe = canvas.width - 100;
var pipeGap = 40;


var pipeUp = new Image();
pipeUp.src = "Sprites/pipe-up.png"


var pipeDown = new Image();
pipeDown.src = "Sprites/tube1.png"

var gameOverImg = new Image();
gameOverImg.src = "Sprites/sheet.png"


var bufferSpace = 100;

var xPos = canvas.width-100;
var yPos = -100;

var state = [4];

var b = new Image();
var z = 0;

state[0] = "Sprites/stage1.png";

state[1] = " Sprites/stage2.png" ;

state[2] =  "Sprites/stage3.png" ;

state[3] = " Sprites/stage2.png" ;


var pipes = [];
pipes[0] = {

	x: canvas.width,
	y: -200

}

var q = 0;

function changeState(){

	q++;

	if(q == 10){
		q = 0;
		if(z == 3){
			z = 0;
		}else{
			z++;
		}
	}
}

var birdY = canvas.height/2 - 75;
var birdX = canvas.width/2;
var gravity = 0.1;
var velocity = 0;

var gameOver = false;

var score = 0;

function jump(){
	velocity = -3.5;
}
 
function gameOverScreen(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(background, 0, 0);
	ctx.drawImage(base, 0, canvas.height - base.height);

	ctx.drawImage(gameOverImg, canvas.width/2, 200, 95, 20, canvas.width/2-145, canvas.height/2 - 170, 95*3, 60 );

	ctx.font = "20px Arial";
	ctx.fillText("Score: "  + score, canvas.width/2 - 40, canvas.height/2 - 60 );

}


function draw(){

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	// Draws Static Background
	ctx.drawImage(background, 0, 0);



	//Draws Pipes
	for(var i = 0; i< pipes.length; i ++){
		ctx.drawImage(pipeDown,pipes[i].x ,pipes[i].y);
		ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y + pipeDown.height + bufferSpace );
	
		pipes[i].x += baseSpeed;

		if(pipes[i].x == canvas.width/2 - 100){
			pipes.push({
				x: canvas.width,
				y: Math.floor(Math.random()*pipeUp.height) - pipeUp.height
			});
			
		}

		if(birdY < pipes[i].y+ pipeDown.height && birdX > pipes[i].x && birdX < pipes[i].x + pipeDown.width){
			gameOver = true;
		}
		if(birdX + b.width > pipes[i].x && birdY < pipes[i].y+ pipeDown.height && birdX< pipes[i].x + pipeDown.width ){
			gameOver = true;
		}

		if(birdY + b.height > pipes[i].y + pipeDown.height + bufferSpace  && birdX > pipes[i].x && birdX < pipes[i].x + pipeDown.width){
			gameOver = true;
		}

		if(birdX + b.width > pipes[i].x && birdY + b.height > pipes[i].y + pipeDown.height + bufferSpace && birdX + b.width < pipes[i].x + pipeUp.width ){
			gameOver = true;
		}

		if(pipes[i].x == 100){
			score ++;
		}
	}



	// Draws moving ground
	ctx.drawImage(base, baseX, canvas.height - base.height);
	ctx.drawImage(base, baseX + base.width, canvas.height - base.height);
		
	baseX += baseSpeed;

	if(baseX + base.width < 0){
		baseX = baseX+base.width;
	}

	b.src = state[z];
	changeState();


	ctx.drawImage(b,birdX, birdY);

	
	

	if(birdY + b.height < canvas.height - base.height){
		velocity += gravity;

	}

	birdY += velocity;

	if(birdY + b.height > canvas.height - base.height ){
		gameOver = true;
		
	}

	ctx.font = "20px Arial";
	ctx.fillText("Score: " + score, 10, canvas.height - 50 );
	
	if(!gameOver){
		requestAnimationFrame(draw);
	}else{

		gameOverScreen();
	}
}


requestAnimationFrame(draw);