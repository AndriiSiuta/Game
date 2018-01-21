const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;

const ctx = canvas.getContext('2d');

const BALL_RADIUS = 10;
let DX = 2;
let DY = -2;

let x = canvas.width/2;
let y = canvas.height/2;

let moveLeft = false;
let moveRight = false;

const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 100;
let PADDLE_X = (canvas.width - PADDLE_WIDTH) / 2;

document.addEventListener('keyup', popKeyPaddle, false);
document.addEventListener('keydown', pushKeyPaddle, false);

function drawBall(color) {
	ctx.beginPath();
	ctx.arc(x, y, BALL_RADIUS, 0, Math.PI*2);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

function draw() {
	let ballColor = '#00ffdb';
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBall(ballColor);
	drawPaddle();
	if(y + DY > canvas.height - BALL_RADIUS || y + DY < BALL_RADIUS) {
		DY = -DY;
		ballColor = randomColor();
	}

	if(x + DX > canvas.width || x + DX < BALL_RADIUS) {
		DX = -DX;
		ballColor = randomColor();
	}

	if(moveRight && PADDLE_X < (canvas.width - PADDLE_WIDTH)) {
		PADDLE_X += 15;
	}

	else if(moveLeft && PADDLE_X > 0) {
		PADDLE_X -= 15;
	}
	x += DX;
	y += DY;
}

function randomColor() {
	let letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color
}


function drawPaddle() {
	ctx.beginPath();
	ctx.rect(PADDLE_X, canvas.height - PADDLE_HEIGHT, PADDLE_WIDTH, PADDLE_HEIGHT);
	ctx.fillStyle = '#4caf50';
	ctx.fill();
	ctx.closePath();
}

function pushKeyPaddle(e) {
	switch(e.keyCode) {
		case 37:
			moveLeft = true;
			break;
		case 39:
			moveRight = true;
			break;
		default:
			console.warn(`keyCode->${e.keyCode}`);
	}
}

function popKeyPaddle(e) {
	switch(e.keyCode) {
		case 37:
			moveLeft = false;
			break;
		case 39:
			moveRight = false;
			break;
		default:
			console.warn(`keyCode->${e.keyCode}`);
	}
}

setInterval(draw, 10);
