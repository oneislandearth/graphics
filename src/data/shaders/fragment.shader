precision mediump float;

// Define the mesh color
uniform vec4 color;

// Define the light position
uniform vec3 light;

// The normal of the vector
varying vec3 vNormal;

void main() {
  
  // Compute the surface brightness
  float surfaceBrightness = max(0.0, dot(normalize(vNormal), light));

  // Bind the color
  gl_FragColor = vec4(color.xyz * surfaceBrightness, color.w);
}