

// Define the graphic engine

export class Engine {
  
  // Define the engine
  constructor(canvas, scene) {

    // Bind the name
    this.name = `@oneisland/graphics`;

    // Bind the canvas
    this.canvas = document.querySelector(canvas);

    // Bind the width and height
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Dynamically resize the canvas if the window changes size
    window.addEventListener('resize', () => {

      // Bind the width and height
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;

      // Resize the viewport
      this.context.viewport(0, 0, window.innerWidth, window.innerHeight);
    });
    
    // Create the context
    this.context = this.canvas.getContext('webgl2');

    // Throw an error if there is no context
    if (!this.context) throw new Error('WebGL2 is not supported by your browser');

    // Initialise the scene
    this.scene = scene({ canvas: this.canvas, context: this.context });

    // Define the fps
    this.fps = 0;

    // Define the past time
    let past = 0;

    // Run the render loop
    const render = async(now) => {

      // Compute present in seconds
      now *= 0.001;

      // Compute the difference in time
      const delta = (now - past);

      // Update the past
      past = now;

      // Update the fps
      this.fps = (1 / delta);

      // Await the scene
      const scene = await this.scene;
      
      // Render the scene
      scene.render(delta);

      // Run the render loop
      requestAnimationFrame(render);
    };

    // Run the render loop
    requestAnimationFrame(render);
  }

  // Show the fps
  showFPS() {

    // Create the DOM element
    const element = document.createElement('small');

    // Define the fps styles
    const styles = {
      'position': 'fixed',
      'top': '10px',
      'left': '10px', 
      'font-family': '\'Lato\', sans-serif', 
      'padding': '5px',
      'color': 'rgb(240, 240, 240)',
      'background-color': 'rgb(20, 20, 20, 0.5)'
    };

    // Apply the styles
    Object.assign(element.style, styles);

    // Append the element after the canvas
    this.canvas.parentNode.insertBefore(element, this.canvas);

    // Set the interval to update the fps every 200ms
    setInterval(() => {
      
      // Update the text content
      element.textContent = `FPS: ${this.fps.toFixed()}`;
    }, 100);
  }
}