// Import the configuration
import { bindCanvas, bindContext } from './context/configuration';

// Define the graphic engine
export const Engine = ((element, scene) => {

  // Select the canvas element
  const canvas = document.querySelector(element);
    
  // Create the context
  const context = canvas.getContext('webgl2');

  // Throw an error if there is no context
  if (!context) throw new Error('WebGL2 is not supported by your browser');

  // Bind the resizer
  const resize = () => {

    // Resize width and height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Dynamically resize the canvas if the window changes size
    window.addEventListener('resize', () => {

      // Bind the width and height
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Resize the viewport
      context.viewport(0, 0, canvas.width, canvas.height);
    });
  };


  // Render an animation frame
  const frame = async(current, past = 0) => {
  
    // Compute the difference in time
    const delta = ((current / 1000) - past);

    // Render the next scene frame
    (await scene({ canvas, context })).render(delta);

    // Render another animation frame
    requestAnimationFrame(next => frame(next, (current / 1000)));
  };          
  
  // Render an animation frame
  requestAnimationFrame(frame);

  // Call the initial functions
  resize();
});