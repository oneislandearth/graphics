// Import the require core functions
import { half, norm, cross, unit } from './core';

// Import the vec3 functions
import { vec3 } from './vec3';

// Compute the area of a triangle
export const polygon = {};

// Compute the normal of a polygon
polygon.normal = ([a, b, c]) => (
  unit(
    cross(
      vec3.subtract(a, c),
      vec3.subtract(b, c)
    )
  )
);

// Compute the area of a triangle
polygon.area = ([a, b, c]) => (
  half(
    norm(
      cross(
        vec3.subtract(a, b), 
        vec3.subtract(a, c)
      )
    )
  )
);