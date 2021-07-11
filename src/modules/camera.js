// Describe the basic field of view camera
export class Camera {

  // Desribe the constructor
  constructor(name, { scene, ...options }) {

    // Bind the name
    this.name = name;

    // Bind the scence
    this.scene = scene;

    // Bind the field of view
    this.fov = options.fov ? options.fov : Math.PI * 0.5;

    // Bind the near clipping plane distance
    this.near = options.near | 1;

    // Bind the far clipping plane distance
    this.far = options.far | 200;

    // Bind the zoom scale
    this.scale = 1;

    // Define the min zoom range
    this.min = (this.scale / 2);

    // Define the max zoom range
    this.max = (this.scale * 2);  

    // Define the camera position
    this.position = [0, 0, 0];

    // Handle mousewheel zoom
    this.scene.canvas.addEventListener('wheel', (e) => this.zoom(e.wheelDelta * 0.0001));
  }

  // Define the aspect ratio
  get aspectRatio() {

    // Return the aspect ratio of the canvas
    return (this.scene.context.drawingBufferWidth / this.scene.context.drawingBufferHeight);
  }

  // Return the view matrix
  get view() {

    // Select the zoom scale
    const s = this.scale;

    // Select the position
    const [x, y, z] = this.position;

    return new Float32Array([
      s, 0, 0, 0,
      0, s, 0, 0,
      0, 0, s, 0,
      x, y, z, 1
    ]);
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