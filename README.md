<p align="center">
  <a href="https://github.com/oneislandearth/graphics" target="_blank">
    <img src="https://i.imgur.com/ykr34Oc.png">
  </a>
</p>

***

A fast and lightweight 3D graphics engine for the web

## Overview

- [Installation](#installation)
- [Usage](#usage)
- [Documentation](#documentation)
- [License](#license)

## Installation

[@oneisland/graphics](https://github.com/oneislandearth/graphics) is available through the [npm registry](https://www.npmjs.com/package/@oneisland/graphics):

```bash
$ npm install @onesland/graphics
```

## Usage

Creating a simple animation of a rotating cube:<br>

###### cube.js

```js
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
```

###### engine.js

```js
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
});

// Show the frames per second
engine.showFPS();
```

###### index.html

```html
<!doctype html>
<html lang="en">
  <head>    
    <meta charset="utf-8">
    <title>@oneisland/graphics</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Load the dependencies -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js" defer></script>

    <!-- Load the engine  -->
    <script src="./dist/bundle.js" defer></script>

    <!-- Define the cube data -->
    <script src="./cube.js" defer></script>

    <!-- Create an engine -->
    <script src="./engine.js" defer></script>

    <!-- Define the styling -->
    <style>
      html, body {
        width: 100vw;
        height: 100vh;
        padding: 0;
        margin: 0;
      }
      canvas {
        padding: 0;
        margin: 0;
      }
    </style>
  </head>
  <body>

    <!-- Define the element to bind the engine to -->
    <canvas id="engine"></canvas>
  </body>
</html>
```

[View this example live](https://oneislandearth.github.io/graphics/example/)

## Documentation

[Check out the full documentation](https://github.com/oneislandearth/graphics/blob/master/docs/README.md)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2021-present, OneIsland Limited