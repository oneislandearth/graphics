// Import the required core functions
import { add, subtract, multiply, divide, sum } from './core';

// Vectorizes an operation
const vectorize = (operation) => (a, b) => ([
  operation(a[0], b[0]),
  operation(a[1], b[1]),
  operation(a[2], b[2])
]); 

// Define the vec3 functions
export const vec3 = {};

// Define the add function
vec3.add = (a, b) => vectorize(add)(a, b);

// Define the subtract function
vec3.subtract = (a, b) => vectorize(subtract)(a, b);

// Define the multiply function
vec3.multiply = (a, b) => vectorize(multiply)(a, b);

// Define the divide function
vec3.divide = (a, b) => vectorize(divide)(a, b);

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

vec3.cross([10, 10, 10], [10, 10, 5]);