// Import the camera module
import { Camera } from './camera';

// Define the scene generator
export class Scene {

  constructor(name, { canvas, context }) {

    // Bind the name
    this.name = name;

    // Bind the graphics canvas
    this.canvas = canvas;

    // Bind the grapics context
    this.context = context;

    // Create the materials
    this.materials = [];

    // Create the meshes
    this.meshes = [];

    // Bind the default camera
    this.camera = new Camera('camera', { scene: this });

    // // Define the clear color
    context.clearColor(0.0, 0.0, 1.0, 1);

    // // Clear the depth
    // context.clearDepth(0);

    // // Enable depth testing
    context.enable(context.DEPTH_TEST);
    
    // // Allow close items to obscure far items
    // context.depthFunc(context.LEQUAL);
  
    // // Clear the canvas before use
    // context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT);

    // Render the scene
    this.render();
  }

  // Return the identity matrix for transforms
  get transforms() {
    return new Float32Array([
      1, 0, 0, 0, 
      0, 1, 0, 0, 
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);
  }

  // Add a mesh
  addMesh(mesh) {

    // Bind the mesh
    this.meshes = mesh;
  }

  // Render the scene
  render() {

    // Iterate through each of the meshes
    for (const mesh of this.meshes) {

      // Render the mesh
      mesh.render();
    }
  }
}