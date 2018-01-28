const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

canvas.width = 500;
canvas.height = 500;

const ctx = canvas.getContext('2d');

const BALL_RADIUS = 10;
let DX = 2;
let DY = -2;

let x = canvas.width / 2;
let y = canvas.height - 30;

let moveLeft = false;
let moveRight = false;

const PADDLE_HEIGHT = 10;
const PADDLE_WIDTH = 100;
let PADDLE_X = (canvas.width - PADDLE_WIDTH) / 2;

const BRICKS_HEIGHT = 10;
const BRICKS_WIDTH = 25;

document.addEventListener('keyup', popKeyPaddle, false);
document.addEventListener('keydown', pushKeyPaddle, false);

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.closePath();
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
	switch (e.keyCode) {
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
	switch (e.keyCode) {
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

function drawBricks() {
	let xPos = 0;
	let yPos = 0;

	let deltaX = 50;
	let deltaY = 50;

	for(let i = 0; i < 3; i++) {
		for(let j = 0; j < 3; j++) {
			ctx.beginPath();
			ctx.rect(deltaX, deltaY, BRICKS_WIDTH, BRICKS_HEIGHT);
			ctx.fillStyle = 'orange';
			ctx.fill();
			ctx.closePath();
			deltaX += 50;
		}
		deltaY += 50;
		deltaX = 50;
	}

}

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();

	if (y + DY < BALL_RADIUS) {
		DY = -DY;
	} else if (y + DY > canvas.height - BALL_RADIUS - PADDLE_HEIGHT) {
		if (x > PADDLE_X && x < PADDLE_X + PADDLE_WIDTH) {
			DY = -DY;
		}
		// else {
		// 	document.location.reload();
		// }
	}

	if (x + DX > canvas.width - BALL_RADIUS || x + DX < BALL_RADIUS) {
		DX = -DX;
	}

	// PAD CONTROLLER
	if (moveRight && PADDLE_X < (canvas.width - PADDLE_WIDTH)) {
		PADDLE_X += 10;
	}

	else if (moveLeft && PADDLE_X > 0) {
		PADDLE_X -= 10;
	}
	x += DX;
	y += DY;
}

setInterval(gameLoop, 10);

// ToDo Refactor this file, add initialize function with constant
// ToDo change this to module export
