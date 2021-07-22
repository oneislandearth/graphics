#version 300 es
precision highp float;

// Define the texture coordinates
in vec2 uv;

// Define the texture sampler
uniform sampler2D sampler;

// Define the texture output
out vec4 color;

// Define the main function
void main() {

  // Compute the colour
  color = texture(sampler, uv);
}