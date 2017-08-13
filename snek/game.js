// TODO remove console logs
// TODO only execute code if canvas is supported by browser
// TODO prevent 180 turns
// TODO game win conditions
// FIXME apple spawns in Snek
// TODO snake collision detection

var currentDirection;
var previousDirection;
var gameCanvas = document.getElementById("gameCanvas");
var context = gameCanvas.getContext("2d");
var gameHeight = 400;
var gameWidth = 400;
var verticalPixels = 10;
var horizontalPixels = 10;
var pixelHeight = gameHeight / verticalPixels;
var pixelWidth = gameWidth / horizontalPixels;
var applePos;
var snakeArray = [];

function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

function rndPoint() {
  return (new Point(Math.floor(Math.random()*10), Math.floor(Math.random()*10)));
}

function move(event) {
  if (event.keyCode == 37) {
    currentDirection = "left";
    console.log(currentDirection);
  } else if (event.keyCode == 38) {
    currentDirection = "up";
    console.log(currentDirection);
  } else if (event.keyCode == 39) {
    currentDirection = "right";
    console.log(currentDirection);
  } else if (event.keyCode == 40) {
    currentDirection = "down";
    console.log(currentDirection);
  }
}

function paintContext() {
  context.fillStyle = "white";
  context.fillRect(0, 0, gameWidth, gameHeight);
  context.fillStyle = "red";
  context.fillRect(applePos.x * pixelWidth, applePos.y * pixelHeight, pixelWidth, pixelHeight);
  context.fillStyle = "green";
  for (let index in snakeArray) {
    context.fillRect(snakeArray[index].x * pixelWidth, snakeArray[index].y * pixelHeight, pixelWidth, pixelHeight);
  }
}

function game() {
  //Move Snek head
  if (currentDirection == "left" && snakeArray[0].x != 0) {
    snakeArray[0].x--;
  } else if (currentDirection == "right" && snakeArray[0].x != horizontalPixels - 1) {
    snakeArray[0].x++;
  } else if (currentDirection == "up" && snakeArray[0].y != 0) {
    snakeArray[0].y--;
  } else if (currentDirection == "down" && snakeArray[0].y != verticalPixels - 1) {
    snakeArray[0].y++;
  }

  //Move Snek tail
  for (let i = snakeArray.length - 1; i > 0; i--) {
    snakeArray[i] = new Point(snakeArray[i-1].x, snakeArray[i-1].y);
  }

  //If Snek touches apple...
  if (snakeArray[0].x == applePos.x && snakeArray[0].y == applePos.y) {
    snakeArray.push(snakeArray[snakeArray.length - 1]);
    applePos = rndPoint();
    console.log(snakeArray.length);

  }

  //Paint everything
  paintContext();
}

document.addEventListener("keydown", move);

gameCanvas.setAttribute("height", gameHeight + "px");
gameCanvas.setAttribute("width", gameWidth + "px");

//Initialize
applePos = rndPoint();
snakeArray[0] = rndPoint();

window.setInterval(game, 300);
