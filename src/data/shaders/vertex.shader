// Define the position, normal and color fiekds
attribute vec4 position;
attribute vec3 normal;

// The transformation matrices
uniform mat4 world;
uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform mat4 normalMatrix;

// Lighting position
uniform vec3 light;

// Pass the brightness to the fragment shader
varying vec3 vertexNormal;
varying vec3 worldNormal;

void main() {

  // Compute the vertex normal
  vertexNormal = normal;
  
  // Compute the world normal
  worldNormal = (normalMatrix * vec4(normal, 1.0)).xyz;

  // Compute the position
  gl_Position = projection * view * model * world * position;
}