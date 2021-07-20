precision mediump float;

// Define the mesh color
uniform vec4 color;

// The normals
varying vec3 vertexNormal;
varying vec3 worldNormal;

void main() {

  // Define the light position
  vec3 light = vec3(0, 1, 0);

  // Compute the ambient color
  vec3 ambient = 0.3 * color.xyz;

  // Compute the diffuse colour
  vec3 diffuse = 0.7 * color.xyz * clamp(dot(vertexNormal, light), 0.0, 1.0 );

  // Compute the brightness
  float brightness = clamp(dot(vertexNormal, light), 0.0, 1.0 );

  // Compute the colour
  // gl_FragColor = vec4(ambient + diffuse, color.w);


  // Bind the color
  // gl_FragColor = vec4(color.xyz * brightness, color.w);
  gl_FragColor = vec4(vertexNormal, 1.0);
}