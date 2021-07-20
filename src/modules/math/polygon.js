// Import the require core functions
import { half, mapKeys } from './core';

// Import the vec3 functions
import { vec3 } from './vec3';

// Compute the area of a triangle
export const polygon = {};

// Compute the normal of a polygon
polygon.normal = ([a, b, c]) => (
  vec3.unit(
    vec3.cross(
      vec3.subtract(a, c),
      vec3.subtract(b, c)
    )
  )
);

// Compute the area of a triangle
polygon.area = ([a, b, c]) => (
  half(
    vec3.magnitude(
      vec3.cross(
        vec3.subtract(a, b), 
        vec3.subtract(a, c)
      )
    )
  )
);