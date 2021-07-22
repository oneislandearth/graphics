// Import the color material
import { Material } from './material/material';

// Import the buffers
import { BufferManager } from './context/buffer';

// Import the required math functions
import { unit, cross, equal, vec3, polyhedron } from './math';

// Define the mesh
export class Mesh {

  constructor(name, { vertices, faces, scene, ...options }) {

    // Bind the name
    this.name = name;

    // Bind the scene
    this.scene = scene;

    // Create the default material
    this.material = new Material(`${name}-material`, this.scene);

    // Define the position
    this.position = (options.position ? options.position : [0, 0, 0]);

    // Define the rotation
    this.angle = 1;

    // Define the meshes
    this.animations = [];

    // Update the data
    this.update({ vertices, faces });
    
    // Store this mesh in the scene meshes
    this.scene.meshes.push(this);
  }

  // Rotate the y axis
  rotate() {
    this.angle += (((Math.PI * 2) / 360) * 1);
  }

  // Return model matrix for transforms
  get model() {

    // Create an identity matrix
    const model = mat4.create();

    // Translate the position to the model position
    mat4.translate(model, model, this.position);

    // Return the model matrix
    return model;
  }

  // Bind the data for the faces
  update({ vertices, faces }) {

    // Bind the vertices
    this.vertices = vertices;

    // Bind the faces
    this.faces = faces;

    // Define the positions
    this.positions = [];

    // Define the normals
    this.normals = [];

    // Define the indices
    this.indices = [];

    // Add the position and normal
    const addPosition = (vertex, normal) => {

      // Extract the vertex components
      const [vx, vy, vz] = vertex;

      // Extract the normal components
      const [nx, ny, nz] = normal;
      
      // Iterate through the existing positions
      for (let i = 0; i < this.positions.length; i++) {

        // Extract the position components
        const [px, py, pz] = this.positions[i];

        // Check if the vertex matches the position
        if (equal(px, vx) && equal(py, vy) && equal(pz, vz)) {

          // Extract the components of the normal of the stored position
          const [vnx, vny, vnz] = this.normals[i];

          // Check if the planes match for the vertex
          if (equal(vnx, nx) && equal(vny, ny) && equal(vnz, nz)) {

            // Return the index of this vertex as it has already been computed for this plane
            return i;
          }
        }
      }

      // Store the normal
      this.normals.push(normal);

      // Store the vertex and return the index
      return (this.positions.push(vertex) - 1);
    };

    // Iterate through the faces extracting the face indexes
    for (const [f0, f1, f2] of this.faces) {

      // Extract the vertices
      const v0 = this.vertices[f0];
      const v1 = this.vertices[f1];
      const v2 = this.vertices[f2];

      // Compute the new vectors
      const v0v2 = vec3.subtract(v0, v2); 
      const v1v2 = vec3.subtract(v1, v2);

      // Compute the unit vector using the unit of the cross product of the new vectors
      const normal = unit(cross(v0v2, v1v2));

      if (normal.find(v => v == -1)) continue;

      // Add the vertices to the positions (one for each face)
      const iv0 = addPosition(v0, normal);
      const iv1 = addPosition(v1, normal);
      const iv2 = addPosition(v2, normal);

      // Add the position indexes to the indices
      this.indices.push(iv0, iv1, iv2);
    }
  }

  // Generate the face from vertex data
  static fromVertexData({ positions, normals, indices }) {

    // Bind the positions
    this.positions = positions;

    // Bind the normals
    this.normals = normals;

    // Bind the indices
    this.indices = indices;
  }

  // Define the buffers
  get buffers() {

    // Create the buffer manager
    return BufferManager(this.scene.context).createBuffers({
      positions: this.positions,
      normals: this.normals,
      indices: this.indices
    });
  }

  // Define the add material class
  addMaterial(material) {

    // Bind the material
    this.material = material;
  }

  // Add the animation
  addAnimation(animation) {

    // Bind the animation
    this.animations.push(animation);
  }

  // Define the render function which is called on the animation event
  render(delta) {

    // Select the context from the scene
    const context = this.scene.context;

    // Apply all the animations
    for (const animation of this.animations) {

      // Run the animation on the mesh
      animation.animate(this, delta);
    }

    // Define the model view matrix
    const modelView = mat4.create();

    // Compute the model view matrix
    mat4.multiply(modelView, this.scene.camera.view, this.model);

    // Define the normal matrix
    const normalMatrix = mat4.create();

    // Compute the normal matrix
    mat4.invert(normalMatrix, modelView);
    mat4.transpose(normalMatrix, normalMatrix);

    // Update the world transforms
    context.uniformMatrix4fv(this.material.locations.world, false, this.scene.world);

    // Update the mesh model transforms
    context.uniformMatrix4fv(this.material.locations.model, false, this.model);

    // Update the camera view
    context.uniformMatrix4fv(this.material.locations.view, false, this.scene.camera.view);

    // Update the camera projection
    context.uniformMatrix4fv(this.material.locations.projection, false, this.scene.camera.projection);

    // Update the normal matrix
    context.uniformMatrix4fv(this.material.locations.normalMatrix, false, normalMatrix); 

    // Update the mesh source lighting
    context.uniform3fv(this.material.locations.light, unit([0, 2, 2]));

    // Update the mesh color
    context.uniform4fv(this.material.locations.color, [0.8, 0.8, 0.8, 1]);

    // Bind the positions from the buffer
    context.bindBuffer(context.ARRAY_BUFFER, this.buffers.positions);
    context.enableVertexAttribArray(this.material.locations.position);
    context.vertexAttribPointer(this.material.locations.position, 3, context.FLOAT, false, 0, 0);

    // Bind the normals from the buffer
    context.bindBuffer(context.ARRAY_BUFFER, this.buffers.normals);
    context.enableVertexAttribArray(this.material.locations.normal);
    context.vertexAttribPointer(this.material.locations.normal, 3, context.FLOAT, false, 0, 0);

    // Bind the indices from the buffer
    context.bindBuffer(context.ELEMENT_ARRAY_BUFFER, this.buffers.indices);

    // Draw each of the faces within the mesh
    context.drawElements(context.TRIANGLES, this.indices.length, context.UNSIGNED_SHORT, 0);
  }
}