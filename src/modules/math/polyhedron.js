import { multiply, third, sum, map, mapKeys } from './core';

// Import the vec3 modules
import { vec3 } from './vec3';
import { polygon } from './polygon';

// Define a polyhedron logic
export const polyhedron = {};

// Compute the volume of a polyhedron
polyhedron.volume = (vertices, faces) => (
  third(
    sum(
      map(
        mapKeys(faces, vertices), 
        ([a, b, c]) => (
          multiply(
            vec3.dot(a, polygon.normal([a, b, c])),
            polygon.area([a, b, c])
          )
        )
      )
    )
  )
);

// Define the vertices for the cube
const vertices = [
  [-1, -1, 1],
  [ 1, -1, 1],
  [ 1, -1, -1],
  [-1, -1, -1],
  [-1, 1, 1],
  [ 1, 1, 1],
  [ 1, 1, -1],
  [-1, 1, -1]
];

// Define the faces for the cube
const faces = [
  [2, 3, 0],
  [0, 1, 2],
  [0, 3, 7],
  [7, 4, 0],
  [4, 0, 1],
  [1, 5, 4],
  [3, 2, 6],
  [6, 7, 3],
  [5, 1, 2],
  [2, 6, 5],
  [7, 4, 5],
  [5, 6, 7]
];

polyhedron.volume(vertices, faces);