// Import the shader class
import { Shader } from './shader';

// Import the default shaders
import defaulVertexShader from '../../data/shaders/vertex.shader';
import defaultFragmentShader from '../../data/shaders/fragment.shader';

// Define the material class
export class Material {

  // Define the material path
  constructor(name, scene) {

    // Bind the name
    this.name = name;

    // Bind the scene
    this.scene = scene;

    // Generate a hash 8 characters long
    this.hash = Math.random(Date.now()).toString(16).substring(6, 14);

    // Get the context from the scene
    const context = this.scene.context;

    // Create the vertex shader
    const vertexShader = new Shader(defaulVertexShader, context.VERTEX_SHADER);

    // Create the fragment shader
    const fragmentShader = new Shader(defaultFragmentShader, context.FRAGMENT_SHADER); 

    // Bind the shaders
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;

    // Bind the material to the scene
    this.scene.materials.push(this);

    // Generate the material application
    this.generate();
  }

  // Set the vertex shader
  setVertexShader(shader) {

    // Bind the vertex shader
    this.vertexShader = shader;

    // Generate the program again
    this.generate();
  }

  // Set the fragment shader
  setFragmentShader(shader) {

    // Bind the fragment shader
    this.fragmentShader = shader;

    // Generate the program again
    this.generate();
  }

  // Generate the shader program
  generate() {

    // Select the scene context
    const context = this.scene.context;

    // Create a shader program
    this.shader = context.createProgram();

    // Attach the shaders to the program
    context.attachShader(this.shader, this.vertexShader.compile(context));
    context.attachShader(this.shader, this.fragmentShader.compile(context));

    // Link the shader program
    context.linkProgram(this.shader);

    // Check if the shader program was created correctly    
    if (!context.getProgramParameter(this.shader, context.LINK_STATUS)) {

      // Throw an error if the program failed
      throw new Error(`Shader program failed to created: ${context.getProgramInfoLog(this.shader)}`);
    }
  }

  // Select the shader program locations
  get locations() {

    // Select the scene context
    const context = this.scene.context;

    // Use the shader program
    context.useProgram(this.shader);

    // Define the locations
    return {
      model: context.getUniformLocation(this.shader, `model`),
      view: context.getUniformLocation(this.shader, 'view'),
      projection: context.getUniformLocation(this.shader, `projection`),
      lighting: context.getUniformLocation(this.shader, `lighting`),
      position: context.getAttribLocation(this.shader, `position`),
      normal: context.getAttribLocation(this.shader, `normal`)
    };
  }
}