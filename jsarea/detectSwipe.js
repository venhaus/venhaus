document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
pDirection = document.getElementById("direction");

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) { /*most significant*/
    if (xDiff > 0) {
      p.innerHTML("left");
    } else {
      p.innerHTML("right");
    }
  } else {
    if (yDiff > 0) {
      p.innerHTML("up");
    } else {
      p.innerHTML("down");
    }
  }
/* reset values */
xDown = null;
yDown = null;
}
