// Import the required core functions;
import { add, subtract, multiply, divide, sum, sqrt, square, map, acos } from './core';

// Vectorizes an operation
const vectorize = (operation) => (a, b) => ([
  operation(a[0], b[0]),
  operation(a[1], b[1]),
  operation(a[2], b[2])
]); 

// Define the vec3 functions
export const vec3 = (x, y, z) => ([x || 0, y || 0, z || 0]);

// Define the zeroes function
vec3.zeros = [0, 0, 0];

// Define the ones function
vec3.ones = [1, 1, 1];

// Define the right function
vec3.right = [1, 0, 0];

// Define the left function
vec3.left = [-1, 0, 0];

// Define the up function
vec3.up = [0, 1, 0];

// Define the down function
vec3.down = [0, -1, 0];

// Define the back function
vec3.back = [0, 0, 1];

// Define the forward function
vec3.forward = [0, 0, -1];

// Define the add function
vec3.add = (a, b) => vectorize(add)(a, b);

// Define the subtract function
vec3.subtract = (a, b) => vectorize(subtract)(a, b);

// Define the multiply function
vec3.multiply = (a, b) => vectorize(multiply)(a, b);

// Define the divide function
vec3.divide = (a, b) => vectorize(divide)(a, b);

// Define the function to expand a scalar value to a vec3
vec3.expand = (scalar) => [scalar, scalar, scalar];

// Define the magnitude / norm of a vector
vec3.magnitude = (a) => (
  sqrt(
    sum(
      map(a, v => square(v))
    )
  )
);

// Define the unit of a vector
vec3.unit = (a) => (
  vec3.divide(
    a,
    vec3.expand(
      vec3.magnitude(a)
    )
  )
);

// Define the dot product function
vec3.dot = (a, b) => (
  sum(
    vec3.multiply(a, b)
  )
);

// Define the cross product function
vec3.cross = (a, b) => (
  ([ax, ay, az], [bx, by, bz]) => (
    [
      subtract(
        multiply(ay, bz), 
        multiply(az, by)
      ),
      subtract(
        multiply(az, bx), 
        multiply(ax, bz)
      ),
      subtract(
        multiply(ax, by), 
        multiply(ay, bx)
      )
    ]
  )
)(a, b);

// Compute the angles between two vectors
vec3.angle = (a, b) => (
  acos(
    divide(
      vec3.dot(a, b),
      multiply(
        vec3.magnitude(a),
        vec3.magnitude(b)
      )
    )
  )
);