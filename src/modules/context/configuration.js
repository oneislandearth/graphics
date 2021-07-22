// Describe the global configuration object
export const configuration = {
  context: null,
  canvas: null
};

// Bind the context and canvas
export const bindContext = (context) => (configuration.context = context);
export const bindCanvas = (canvas) => (configuration.canvas = canvas);

// Select the context and canvas
export const context = Object.freeze(configuration.context);
export const canvas = Object.freeze(configuration.canvas);