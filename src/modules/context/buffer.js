// Define the constants
const FLOAT = 0x1406;
const VERTEX_ARRAY = 0x8892;
const INDICES_ARRAY = 0x8893;
const STATIC_DRAW = 0x88E4;

// Define the engine buffer handler
export const BufferManager = (context) => {

  // Define the buffers
  const buffers = {
    positions: null,
    normals: null,
    uvs: null,
    colors: null,
    indices: null
  };

  // Create a vertex buffer with a set of values
  const createVertexBuffer = (values) => {
  
    // Create the buffer
    const buffer = context.createBuffer();
    
    // Bind the buffer to the context
    context.bindBuffer(VERTEX_ARRAY, buffer);
      
    // Add the data to the buffer
    context.bufferData(VERTEX_ARRAY, new Float32Array(values.flat()), STATIC_DRAW);
  
    // Return the buffer
    return buffer;
  };

  // Create a vertex buffer with a set of values
  const createIndicesBuffer = (values) => {

    // Create the buffer
    const buffer = context.createBuffer();
    
    // Bind the buffer to the context
    context.bindBuffer(INDICES_ARRAY, buffer);
      
    // Add the data to the buffer
    context.bufferData(INDICES_ARRAY, new Uint16Array(values.flat()), STATIC_DRAW);
  
    // Return the buffer
    return buffer;
  };

  // Bind the vertex buffer
  const bindVertexBuffer = (buffer, location, options) => {

    // Define the default options
    const size = options.size || 3;
    const type = options.type || FLOAT;
    const normalize = options.normalize || false;
    const stride = options.stride || 0;
    const offset = options.offset || 0;

    // Bind the buffer
    context.bindBuffer(VERTEX_ARRAY, buffer);

    // Select the vertex attribute
    context.enableVertexAttribArray(location);

    // Configure the vertex pointer
    context.vertexAttribPointer(location, size, type, normalize, stride, offset);
  };


  // Bind the indices
  const bindIndicesBuffer = (buffer) => {

    // Bind the buffer
    context.bindBuffer(INDICES_ARRAY, buffer);
  };

  // Create all of the buffers
  const createBuffers = ({ positions, normals, uvs, colors, indices }) => {

    // Check if there is positions and create the buffer
    if (positions) buffers.positions = createVertexBuffer(positions);

    // Check if there is normals and create the buffer
    if (normals) buffers.normals = createVertexBuffer(normals);

    // Check if there is uvs and create the buffer
    if (uvs) buffers.uvs = createVertexBuffer(uvs);

    // Check if there is colors and create the buffer
    if (colors) buffers.colors = createVertexBuffer(colors);

    // Check if there is indices and create the buffer
    if (indices) buffers.indices = createIndicesBuffer(indices);
    
    // Return the buffers
    return buffers;
  };

  // Return the functions
  return {
    createBuffers
  };
};