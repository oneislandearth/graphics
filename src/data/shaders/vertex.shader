// The normals are added along with the positions
attribute vec4 position;
attribute vec4 normal;

// The transformation matrices
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

// Pass the normal down to the fragment shader
varying vec3 vNormal;

void main() {
  
  // Compute the normal as a vec3
  vNormal = vec3(normal.xyz);

  // Compute the position
  gl_Position = projection * model * view * position;
}