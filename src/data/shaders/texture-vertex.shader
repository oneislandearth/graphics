#version 300 es

// Define the position, normal, and texture coords
in vec4 position;
in vec3 normal;
in vec2 uv;

// The transformation matrices to compose the view
uniform mat4 world;
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform mat4 normalMatrix;

// Define the lighting position
uniform vec3 light;

// Define the uv
out vec2 uv;

// Define the main function
void main() {

  // Compute the uv

  // Compute the position
  gl_Position = projection * view * model * world * position;
}