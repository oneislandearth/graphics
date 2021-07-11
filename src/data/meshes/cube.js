// Define the vertices for the mesh
export const vertices = [
  [-1, -1, 1],
  [ 1, -1, 1],
  [ 1, -1, -1],
  [-1, -1, -1],
  [-1, 1, 1],
  [ 1, 1, 1],
  [ 1, 1, -1],
  [-1, 1, -1]
];

// Define the faces for the mesh
export const faces = [
  [2, 3, 0],
  [0, 1, 2],
  [7, 3, 0],
  [0, 4, 7],
  [4, 0, 1],
  [1, 5, 4],
  [6, 2, 3],
  [3, 7, 6],
  [5, 1, 2],
  [2, 6, 5],
  [7, 4, 5],
  [5, 6, 7]
];