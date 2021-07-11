canvas.addEventListener("touchstart", touchHandler, false);
  canvas.addEventListener("touchmove", touchHandler, false);
  canvas.addEventListener("touchend", touchHandler, false);
}

// Handle touchdrag
export const handleTouchDrag = (fingers, handler) => {

  // Bind the listeners
  canvas.addEventListener("touchstart", touchHandler, false);
  canvas.addEventListener("touchmove", touchHandler, false);
  canvas.addEventListener("touchend", touchHandler, false);
}
}


// Handle touch events
const touchHandler = (fingers, event) => {

  // Handle the fingers
  if (event.targetTouches.length == fingers) {

    // Get the touch
    var touch = event.targetTouches[0];

    // Define the drag status
    let drag = false;

    // Define the start positions
    const startX = 0;
    const startY = 0;

    // Check the type
    if (event.type == 'touchstart') {
      rect.startX = touch.pageX;
      rect.startY = touch.pageY;
      drag = true;
    } else if (event.type == "touchmove") {
      if (drag) {
        rect.w = touch.pageX - rect.startX;
        rect.h = touch.pageY - rect.startY ;
        draw();
      }

    // End the drag event
    } else if (event.type == "touchend" || event.type == "touchcancel") drag = false;
  }
}

function draw() {
  ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
}

init();
}
$('button').on('click', rect);
