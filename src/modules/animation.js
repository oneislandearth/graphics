// Describe the animation loop
export class Animation {

  // Desribe the constructor
  constructor(name, handler) {

    // Bind the name
    this.name = name;

    // Bind the animation loop
    this.handler = handler;
  }

  // Run the animaton
  animate(model, delta) {

    // Return the animation
    return this.handler(model, delta);
  }
}