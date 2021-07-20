// Import the required math
import { add, multiply, sin, cos } from './math';

// Import the input handler
import { cameraInputManager } from './inputs/camera-2';

// Describe the basic field of view camera
export class Camera {

  // Desribe the constructor
  constructor(name, { scene, ...options }) {

    // Bind the name
    this.name = name;

    // Bind the scence
    this.scene = scene;

    // Bind the field of view (60 deg)
    this.fov = options.fov || Math.PI * 0.25;

    // Bind the near clipping plane distance
    this.near = options.near || 0.01;

    // Bind the far clipping plane distance
    this.far = options.far || 1000;

    // Bind the radius
    this.radius = options.radius || 20;

    // Bind the alpha angle
    this.alpha = 0;

    // Bind the beta angle
    this.beta = (Math.PI / 8);

    // Define the min zoom range
    this.min = (this.scale / 2);

    // Define the max zoom range
    this.max = (this.scale * 2);  

    // Define the camera position
    this.origin = [0, 0, 0];

    // Define the camera target
    this.target = [0, 0, 0];

    // Define the current zoom
    this.zoom = 1;

    // Handle mousewheel zoom
    cameraInputManager(this);
  }

  // Define the aspect ratio
  get aspectRatio() {

    // Return the aspect ratio of the canvas
    return (this.scene.context.drawingBufferWidth / this.scene.context.drawingBufferHeight);
  }

  // Compute the eye for the camera
  get eye() {

    // Compute the radius (as an exponential would be faster)
    const radius = this.radius;

    // Compute the new eye values
    return [
      add(this.target[0], multiply(radius, multiply(cos(this.alpha), cos(this.beta)))),
      add(this.target[1], multiply(radius, sin(this.beta))),
      add(this.target[2], multiply(radius, multiply(sin(this.alpha), cos(this.beta))))
    ];
  }

  // Define the camera matrix
  get view() {

    // Compute and return the look at camera matrix
    return mat4.lookAt(new Float32Array(16), this.eye, this.target, [0, 1, 0]);
  }

  // Return the camera projection matrix
  get projection() {

    // Compute the range inverse
    const riv = (1 / (this.near - this.far));

    // Define the computed values
    const f = (1.0 / Math.tan(this.fov / 2));
    const a = (f / this.aspectRatio);
    const k = ((this.near + this.far) * riv);
    const l = -1;
    const o = (this.near * this.far * riv * 2);

    // Return the projection
    return new Float32Array([
      a, 0, 0, 0,
      0, f, 0, 0,
      0, 0, k, l,
      0, 0, o, 0
    ]);
  }

  // Define the zoom function
  zoom(delta) {

    // Adjust the zoom
    const zoom = (this.scale + delta);

    // Compute the zoom out
    if (delta < 0) this.scale = (zoom > this.min) ? zoom : this.min;

    // Compute the zoom in
    if (delta > 0) this.scale = (zoom < this.max) ? zoom : this.max;
  }
}