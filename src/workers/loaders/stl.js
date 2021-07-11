// Import the worker module
import { WorkerModule } from '@oneisland/worker-module';

// Define the model loader worker
export class Loader extends WorkerModule {
  
  // Create a model loader
  constructor(path) { 

    // Initiate the model
    super(); 
    
    // Bind the route path for models
    this.path = path;
  }

  // Load a mesh model
  async load(path) {

    // Fetch the model file
    const response = await fetch(`/${this.path}/${path}`);

    // Parse the request as binary buffer
    const data = await response.arrayBuffer();

    // Parse the binary buffer to a buffer
    const buffer = Buffer.from(data);

    // Parse the buffer to mesh data
    const model = this.parse(buffer);

    // Return the model
    return model;
  }

  // Parse a binary stl file
  parse(buffer) {

    // Define the list of face normals
    const normals = [];

    // Define the list of face positions
    const positions = [];
  
    // Define the list of face indices
    const indices = [];
  
    // Define the index
    let index = 0;
  
    // Iterate through the buffer
    for (let i = 0; i < buffer.readUInt32LE(80); i++) {
  
      // Define the normal offset within the buffer
      const normalOffset = (84 + (i * 50));
  
      // Define the normals
      const normalX = buffer.readFloatLE((normalOffset + 0), true);
      const normalY = buffer.readFloatLE((normalOffset + 8), true);
      const normalZ = buffer.readFloatLE((normalOffset + 4), true);
  
      // Iterate through the section of the buffer
      for (let j = 1; j <= 3; j++) {
  
        // Define the position offset within the buffer
        const positionOffset = (normalOffset + j * 12);
  
        // Define the positions
        const positionX = buffer.readFloatLE((positionOffset + 0), true);
        const positionY = buffer.readFloatLE((positionOffset + 8), true);
        const positionZ = buffer.readFloatLE((positionOffset + 4), true);
          
        // Add the normals to the normals set
        normals.push(normalX, normalY, normalZ);
  
        // Add the positions to the positions set
        positions.push(positionX, positionY, positionZ);
  
        // Add the index to the indices set
        indices.push(index++);
      }
    }

    // Return the data
    return { normals, positions, indices };
  }

}