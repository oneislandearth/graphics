// Describe a function to round the a number (6dp default)
export const round = (number, decimals = 6) => Number(parseFloat(number).toFixed(decimals));

// Describe the add function
export const add = (a, b) => round(a + b);

// Describe the subtract function
export const subtract = (a, b) => round(a - b);

// Describe the multiply function
export const multiply = (a, b) => round(a * b);

// Describe the divide function
export const divide = (a, b) => round(a / b);

// Describe the negate function
export const negate = (value) => multiply(value, -1);

// Describe the absolute function
export const abs = (value) => round(Math.abs(value));

// Describe the min function
export const min = (a, b) => round(Math.min(a, b));

// Describe the max function
export const max = (a, b) => round(Math.max(a, b));

// Describe the square root function
export const sqrt = (value) => round(Math.sqrt(value));

// Describe the power function
export const pow = (value, exponent) => round(Math.pow(value, exponent));

// Describe the square function
export const square = (value) => pow(value, 2);

// Define the cube function
export const cube = (value) => pow(value, 3);

// Define the norm function
export const norm = (value) => sqrt(sum(value.map(v => square(v))));

// Describe the equal function
export const equal = (a, b) => abs(a - b) <= (max(abs(a), abs(b)) * 1e-4);

// Describe the sum function
export const sum = (values) => round(values.reduce((sum, value) => add(sum, value), 0));

// Compute the cross product of two vectors
export const cross = (a, b) => {  
  
  // Extract the vector components
  const [ax, ay, az] = a;
  const [bx, by, bz] = b;

  // Return the cross product
  return [
    subtract(multiply(ay, bz), multiply(az, by)),
    subtract(multiply(az, bx), multiply(ax, bz)),
    subtract(multiply(ax, by), multiply(ay, bx))
  ];
};

// Compute the unit of a vector
export const unit = (value) => {

  // Compute the norm of the vector
  const magnitude = norm(value);

  // Return the unitized vector
  return value.map(v => v / magnitude);
};

// Clamp a value between min and max
export const clamp = (a, min, max) => Math.min(Math.max(a, min), max);

// Define the trig functions
export const cos = (a) => Math.cos(a);
export const sin = (a) => Math.sin(a);