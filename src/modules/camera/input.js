// Import the required math
import { add, subtract, multiply, divide, clamp } from '../math/';

// Import the events listeners
import { pointer } from '../core/listeners';

// Describe the handler
export const cameraInputManager = ((camera) => {

  // Use strict  
  
  'use-strict';

  // Define the canvas and context from the scene
  const canvas = camera.scene.canvas;
  const context = camera.scene.context;

  // Define the past pointer positions
  let px = null; 
  let py = null;

  // Define the last change in positions
  let dx = null;
  let dy = null;

  // Define the moving status
  let moving = false;

  // Define the start movement function
  const startMovement = (e) => {

    // Update the start positions
    px = e.clientX;
    py = e.clientY;

    // Update the moving flag to true
    moving = true;
  };

  // Define the on movement function to rotate a camera
  const onMovement = (e) => {

    // Get the current pointer position
    const x = e.clientX;
    const y = e.clientY;

    // Check if the pointer is moving
    if (moving) {

      // Compute the change in positions
      dx = divide(subtract(x, px), context.canvas.width);
      dy = divide(subtract(y, py), context.canvas.height);

      // Compute the change in alpha
      const alphad = multiply(6, dx);

      // Compute the change in beta
      const betad = multiply(6, dy);

      // Update the camera
      updateCameraView(alphad, betad, 0, false);

      // Update the previous positions
      px = x;
      py = y;
    }
  };

  // Stop the movement
  const stopMovement = (e) => {

    // Compute the change in alpha
    const alphad = multiply(30, dx);

    // Compute the change in beta
    const betad = multiply(30, dy);

    // Update the camera
    updateCameraView(alphad, betad, 0, true);
    
    (moving = false);
  };

  // Update the camera view
  const updateCameraView = (alphad = 0, betad = 0, radiusd = 0, quad = false) => {

    // If not quadratic
    if (quad == false) {

      //
      // console.log('non-quadratic');

      return requestAnimationFrame(() => {
        
        // Update the alpha and beta values
        camera.alpha = add(camera.alpha, alphad);
        camera.beta = clamp(add(camera.beta, betad), (-Math.PI / 1.99), (Math.PI / 1.99));
        camera.radius = clamp(add(camera.radius, radiusd), 0, 20);
      });
    }

    // Compute the quadratic steps
    const quadraticSteps = (value, steps) => {

      // Create an empty array
      const values = Array(steps).fill(0);
      
      // Compute a value
      const step = (i) => (-value * (i / steps) * ((i / steps) - 2) + 0);
    
      // Map the values out
      return values.map((v, i) => ((i > 0) ? step(i) - step(i - 1) : 0));
    };

    // Compute the quadratic easing
    const easeAlpha = quadraticSteps(alphad, 20);
    const easeBeta = quadraticSteps(betad, 20);
    const easeRadius = quadraticSteps(radiusd, 20);

    // Run 10 easings
    for (let i = 0; i < 20; i++) {

      setTimeout(() => requestAnimationFrame(() => {
        
        // Update the alpha and beta values
        camera.alpha = add(camera.alpha, easeAlpha[i]);
        camera.beta = clamp(add(camera.beta, easeBeta[i]), (-Math.PI / 1.99), (Math.PI / 1.99));
        camera.radius = clamp(add(camera.radius, easeRadius[i]), 0, 20);
      }), i * 50);
    }
  };

  // Bind the pointer events
  pointer.select(canvas, startMovement);
  pointer.move(canvas, onMovement);
  pointer.release(canvas, stopMovement);
  pointer.scroll(canvas, e => updateCameraView(0, 0, (e.deltaY * 0.001), true));
});