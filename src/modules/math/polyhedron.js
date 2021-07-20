import { multiply, dot, divide3, sum, map, polygon } from './core';

// Define a polyhedron logic
const polyhedron = {};

// Compute the volume of a polyhedron
polyhedron.volume = ({ vertices, faces }) => (
  divide3(
    sum(
      map(faces, ([a, b, c]) => (
        multiply(
          dot(a, polygon.normal([a, b, c])),
          polygon.area([a, b, c])
        )
      ))
    )
  )
);

//   // Compute all of the face normals

// }

//   // 
//   divide(this.faces.reduce((sum, face) => add(sum, multiply(dot(face.a, face.normal), Number(face.area))), 0), 3);
// }