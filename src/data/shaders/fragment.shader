precision mediump float;

varying vec3 vNormal;

void main() {

  // Normals are ranged -1 to 1. Transform it to 0 to 1
  vec3 adjustedNormal = normalize(vNormal) * 0.5;

  gl_FragColor = vec4(adjustedNormal, 1.0);
}