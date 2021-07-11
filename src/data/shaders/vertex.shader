// Define the position, normal and color fiekds
attribute vec4 position;
attribute vec3 normal;

// The transformation matrices
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform mat3 normalMatrix;

// Pass the normal down to the fragment shader
varying vec3 vNormal;

void main() {
  
  // Compute the normal as a vector3
  vNormal = normalMatrix * normal;

  // Compute the position
  gl_Position = projection * model * view * position;
}