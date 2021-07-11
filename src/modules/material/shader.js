

// Define the fragement shader
export class Shader {

  // Define the constructor
  constructor(source, type) {

    // Bind the shader source
    this.source = source;

    // Bind the shader type
    this.type = type;
  }

  // Compile the shader
  compile(context) {

    // Create the shader context
    const shader = context.createShader(this.type);
      
    // Bind the source to the shader object
    context.shaderSource(shader, this.source);
      
    // Compile the shader program
    context.compileShader(shader);
      
    // Check if the shader compiled correctly
    if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
  
      // Delete the shader
      // context.deleteShader(shader);
  
      // Throw an error as the shader failed to compile
      throw new Error(`Shader failed to compile: ${context.getShaderInfoLog(shader)}`);
    }
      
    // Return the compiled shader
    return shader;
  }
}