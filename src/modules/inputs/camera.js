// Import the required math
import { subtract, multiply, divide } from '../math/vec3';


export const cameraInputManager = ((scene) => {

  // Use strict  
  
  'use-strict';

  // Define the canvas and context from the scene
  const canvas = scene.canvas;
  const context = scene.context;

  // Bind the camera from the scene
  const camera = scene.camera;

  // Define the mouse / touch pointer positions
  const pointer = {
    startPosition: null,
    moving: false
  };

  // Define the start movement function
  const startMovement = (e) => {

    // Update the start position of the pointer
    pointer.startPosition = getRelativePointerPosition(e);

    // Update the moving flag to true
    pointer.moving = true;
  };

  // Define the on movement function to rotate a camera
  const onMovement = (e) => {

    // Check if the pointer is moving
    if (pointer.moving) {

      // Get the current pointer position
      const position = getRelativePointerPosition(e);

      // Compute the change in positions
      const xd = multiply(subtract(pointer.startPosition.x, position.x), divide(4, context.canvas.width));
      const yd = multiply(subtract(pointer.startPosition.y, position.y), divide(4, context.canvas.height));

      // Compute the rotation
      const world = scene.world;

      // Define the rotation
      const rotation = [0.7071, 0.7071, 0];

      // Rotate the x axis
      mat4.rotateX(world, world, (yd * 5));

      // Rotate the y axis
      mat4.rotateY(world, world, (xd * 5));

      // Update the world position
      scene.world = world;

      // Update the last pointer position
      pointer.startPosition = position;

      // Force the scene to render
      scene.render();
    }
  };

  // Stop the movement
  const stopMovement = (e) => {

    // Stop
    pointer.moving = false;
  };


  // Describe the function to get the relative pointer position
  const getRelativePointerPosition = (e) => {

    // Select the bounding rectangle
    const bounding = canvas.getBoundingClientRect();

    // Compute the x position
    const x = multiply(
      divide(
        subtract(e.clientX, bounding.left),
        subtract(bounding.right, bounding.left)
      ),
      canvas.width
    );

    // Compute the y position
    const y = multiply(
      divide(
        subtract(e.clientY, bounding.top),
        subtract(bounding.bottom, bounding.top)
      ),
      canvas.height
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

  // Bind the events
  canvas.addEventListener('mousedown', (e) => {
    e.preventDefault(); 
    startMovement(e); 
  });
  canvas.addEventListener('mouseup', (e) => stopMovement(e));
  canvas.addEventListener('mousemove', (e) => onMovement(e));
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    startMovement(e.touches[0]); 
  });
  canvas.addEventListener('touchend', (e) => {
    stopMovement(e.touches[0]); 
  });
  canvas.addEventListener('touchmove', (e) => {
    onMovement(e.touches[0]); 
  });
});