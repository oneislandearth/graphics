// Create a pointer listener
const pointer = {};

// Create a mouse-down / touch-start listener
pointer.select = (element, handler) => {

  // Bind the mouse listener to the element
  element.addEventListener('mousedown', (e) => handler(e), { passive: true });

  // Bind the touch listener to the element
  element.addEventListener('touchstart', (e) => handler(e.touches[0]), { passive: true });
};

// Create a mouse-up / touch-end listener
pointer.release = (element, handler) => {

  // Bind the mouse listener to the element
  element.addEventListener('mouseup', (e) => handler(e), { passive: true });

  // Bind the touch listener to the element
  element.addEventListener('touchend', (e) => handler(e.touches[0]), { passive: true });

  // Bind the touch listener to the element
  element.addEventListener('touchcancel', (e) => handler(e.touches[0]), { passive: true });
};

// Create a mouse-move / touch-move listener
pointer.move = (element, handler) => {

  // Bind the mouse listener to the element
  element.addEventListener('mousemove', (e) => handler(e), { passive: true });

  // Bind the touch listener to the element
  element.addEventListener('touchmove', (e) => handler(e.touches[0]), { passive: true });
};

// Create a mouse-move / touch-move listener
pointer.scroll = (element, handler) => {

  // Bind the mouse listener to the element
  element.addEventListener('wheel', (e) => handler(e), { passive: true });

  // Bind the touch listener to the element
  // element.addEventListener('touchmove', (e) => handler(e.touches[0]), { passive: true });
};

// Export the pointer handler
export { pointer };