// Create the engine
const engine = new Engine('#engine', async({ canvas, context }) => {

  // Create a scene
  const scene = new Scene('scene', { canvas, context });

  // Create a cube
  const cube = new Mesh('cube', { vertices, faces, scene });

  // Create an animation to rotate the mesh
  const animation = new Animation('rotate', (mesh, delta) => mesh.rotate());

  // Add the animation to the cube
  cube.addAnimation(animation);

  // Return the scene
  return scene;
  
}, { fps: true });