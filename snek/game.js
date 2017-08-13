// TODO (2) only execute code if canvas is supported by browser
// TODO (2) buttons for manual steering
// TODO (2) mobile version

// TODO (3) set delay
// TODO (3) remove console logs

var currentDirection;
var previousDirection;
var gameCanvas = document.getElementById("gameCanvas");
var context = gameCanvas.getContext("2d");
var gameHeight = Math.min(window.innerHeight, window.innerWidth) * 0.8;
var gameWidth = gameHeight;
var verticalPixels = 10;
var horizontalPixels = 10;
var pixelHeight = gameHeight / verticalPixels;
var pixelWidth = gameWidth / horizontalPixels;
var applePos;
var snakeArray = [];
var gameLost = false;
var delay;
var scoreDisplay = document.getElementById("scoreDisplay");

function initialize() {
  console.log("Initialize");
  delay = 300;
  gameLost = false;
  scoreDisplay.innerHTML = "Score: 1";
  currentDirection = null;
  previousDirection = null;
  snakeArray = [];
  snakeArray[0] = rndPoint();
  setApplePos();
  paintContext();
  game();
}

function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}
Point.prototype.imitate = function(point) {
  this.x = point.x;
  this.y = point.y;
  return this;
};
Point.prototype.equals = function(point) {
  return (this.x == point.x && this.y == point.y);
};

function rndPoint() {
  return (new Point(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)));
}

function setApplePos() {
  applePos = rndPoint();
  //var appleFlag = false;
  for (let index in snakeArray) {
    if (snakeArray[index].equals(applePos)) {
      setApplePos();
      break;
    }
  }
}

function move(event) {
  if (event.keyCode == 37) {
    currentDirection = "left";
  } else if (event.keyCode == 38) {
    currentDirection = "up";
  } else if (event.keyCode == 39) {
    currentDirection = "right";
  } else if (event.keyCode == 40) {
    currentDirection = "down";
  }
}

function paintContext() {
  context.fillStyle = "black";
  context.fillRect(0, 0, gameWidth, gameHeight);
  context.fillStyle = "red";
  context.fillRect(Math.floor(applePos.x * pixelWidth + pixelWidth * 0.02), Math.floor(applePos.y * pixelHeight + pixelWidth * 0.02), Math.floor(pixelWidth * 0.96), Math.floor(pixelHeight * 0.96));
  context.fillStyle = "lime";
  for (let index in snakeArray) {
    context.fillRect(Math.floor(snakeArray[index].x * pixelWidth + pixelWidth * 0.02), Math.floor(snakeArray[index].y * pixelHeight + pixelWidth * 0.02), Math.floor(pixelWidth * 0.96), Math.floor(pixelHeight * 0.96));
  }
  //Paint Snek eyes
  context.fillStyle = "black";
  if (currentDirection == "down") {
    context.fillRect(Math.floor(snakeArray[0].x * pixelWidth + pixelWidth * 0.2), Math.floor(snakeArray[0].y * pixelHeight + pixelHeight * 0.7), Math.floor(pixelWidth * 0.1), Math.floor(pixelHeight * 0.1));
    context.fillRect(Math.floor(snakeArray[0].x * pixelWidth + pixelWidth * 0.7), Math.floor(snakeArray[0].y * pixelHeight + pixelHeight * 0.7), Math.floor(pixelWidth * 0.1), Math.floor(pixelHeight * 0.1));
  } else if (currentDirection == "up") {
    context.fillRect(Math.floor(snakeArray[0].x * pixelWidth + pixelWidth * 0.2), Math.floor(snakeArray[0].y * pixelHeight + pixelHeight * 0.2), Math.floor(pixelWidth * 0.1), Math.floor(pixelHeight * 0.1));
    context.fillRect(Math.floor(snakeArray[0].x * pixelWidth + pixelWidth * 0.7), Math.floor(snakeArray[0].y * pixelHeight + pixelHeight * 0.2), Math.floor(pixelWidth * 0.1), Math.floor(pixelHeight * 0.1));
  } else if (currentDirection == "left") {
    context.fillRect(Math.floor(snakeArray[0].x * pixelWidth + pixelWidth * 0.2), Math.floor(snakeArray[0].y * pixelHeight + pixelHeight * 0.2), Math.floor(pixelWidth * 0.1), Math.floor(pixelHeight * 0.1));
    context.fillRect(Math.floor(snakeArray[0].x * pixelWidth + pixelWidth * 0.2), Math.floor(snakeArray[0].y * pixelHeight + pixelHeight * 0.7), Math.floor(pixelWidth * 0.1), Math.floor(pixelHeight * 0.1));
  } else if (currentDirection == "right") {
    context.fillRect(Math.floor(snakeArray[0].x * pixelWidth + pixelWidth * 0.7), Math.floor(snakeArray[0].y * pixelHeight + pixelHeight * 0.2), Math.floor(pixelWidth * 0.1), Math.floor(pixelHeight * 0.1));
    context.fillRect(Math.floor(snakeArray[0].x * pixelWidth + pixelWidth * 0.7), Math.floor(snakeArray[0].y * pixelHeight + pixelHeight * 0.7), Math.floor(pixelWidth * 0.1), Math.floor(pixelHeight * 0.1));
  }
}

function setGameSize() {
  gameHeight = Math.min(window.innerHeight, window.innerWidth) * 0.7;
  gameWidth = gameHeight;
  pixelHeight = gameHeight / verticalPixels;
  pixelWidth = gameWidth / horizontalPixels;
  gameCanvas.setAttribute("height", gameHeight + "px");
  gameCanvas.setAttribute("width", gameWidth + "px");
  paintContext();

}

function game() {
  //Move Snek tail
  console.log("game");
  for (let i = snakeArray.length - 1; i > 0; i--) {
    snakeArray[i] = new Point(snakeArray[i - 1].x, snakeArray[i - 1].y);
  }

  //Prevent Snek from turning 180 degrees
  if (currentDirection == "down" && previousDirection == "up" || currentDirection == "up" && previousDirection == "down" || currentDirection == "left" && previousDirection == "right" || currentDirection == "right" && previousDirection == "left") {
    currentDirection = previousDirection;
  }

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
  previousDirection = currentDirection;

  //Check if Snek touches itself
  if (snakeArray.length > 1) {
    let snakeSubArray = snakeArray.slice(1);
    for (let index in snakeSubArray) {
      if (snakeArray[0].equals(snakeSubArray[index])) {
        gameLost = true;
      }
    }
  }

  //If Snek touches apple...
  if (snakeArray[0].x == applePos.x && snakeArray[0].y == applePos.y) {
    snakeArray.push(new Point().imitate(snakeArray[snakeArray.length - 1]));
    scoreDisplay.innerHTML = "Score: " + snakeArray.length;
    setApplePos();
    delay = delay * 0.95;
  }

  //Update canvas context or end game
  if (!gameLost) {
    paintContext();
    window.setTimeout(game, delay);
  } else {
    alert("You lost! \n Final Score: " + snakeArray.length);
    initialize();
  }
} //end game()


function swipeDetect(swipeArea, callback) {
  var swipedir,
    startX,
    startY,
    distX,
    distY;

  swipeArea.addEventListener('touchstart', function(e) {
    var touchobj = e.changedTouches[0];
    startX = touchobj.pageX;
    startY = touchobj.pageY;
    e.preventDefault();
  });

  swipeArea.addEventListener('touchmove', function(e) {
    var touchobj = e.changedTouches[0];
    distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
    distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
    if (Math.abs(distX) > 50) {
      scoreDisplay.innerHTML(distX);
    }
    if (Math.abs(distX) > 50 && Math.abs(distX) > Math.abs(distY)) { // 2nd condition for horizontal swipe met
      swipedir = (distX < 0) ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
    } else if (Math.abs(distY) > 50 && Math.abs(distY) > Math.abs(distX)) { // 2nd condition for vertical swipe met
      swipedir = (distY < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
    }
    callback(swipedir);

    e.preventDefault(); // prevent scrolling when inside swipeArea
  });
  /*
  swipeArea.addEventListener('touchend', function(e) {

    var touchobj = e.changedTouches[0];
    distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
    distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
    if (Math.abs(distX) > Math.abs(distY)) { // 2nd condition for horizontal swipe met
      swipedir = (distX < 0) ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
    } else if (Math.abs(distY) > Math.abs(distX)) { // 2nd condition for vertical swipe met
      swipedir = (distY < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
    }
    callback(swipedir);

    e.preventDefault();
  });
  */
}

var swipeArea = document.getElementById('swipeZone');
swipeDetect(swipeArea, function(swipedir) {
  currentDirection = swipedir;
});

document.addEventListener("keydown", move);
gameCanvas.setAttribute("height", gameHeight + "px");
gameCanvas.setAttribute("width", gameWidth + "px");
window.addEventListener("resize", setGameSize);
initialize();
