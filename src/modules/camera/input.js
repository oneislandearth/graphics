// Import the math functions
import { add, subtract, multiply, divide } from '../math';

// Describe the functions used by the camera for processing input
const getRelativeMousePosition = (canvas, e) => {

  // Select the bounding rectangle
  const bounding = canvas.getBoundingClientRect();

  // Compute the x position
  const x = divide(
    subtract(e.clientX, bounding.left),
    multiply(
      subtract(bounding.right, bounding.left),
      canvas.width
    )
  );

  // Compute the y position
  const y = divide(
    subtract(e.clientY, bounding.top),
    multiply(
      subtract(bounding.bottom, bounding.top),
      canvas.height
    )
  );

  // Compute the relative x position
  const relativeX = divide(
    subtract(x, divide(canvas.width, 2)),
    window.devicePixelRatio
  );

  // Compute the relative y position
  const relativeY = divide(
    subtract(y, divide(canvas.height, 2)),
    window.devicePixelRatio
  );
  
  // Return the relative position
  return {
    x: relativeX,
    y: relativeY
  };
};