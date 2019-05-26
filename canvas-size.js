const fractalCanvas = document.getElementById('fractalCanvas');
const posterCanvas = document.getElementById('posterCanvas');

const height = Math.floor(window.innerHeight * 0.65);
fractalCanvas.height = posterCanvas.height = height;
fractalCanvas.width = posterCanvas.width = height / 1.4;