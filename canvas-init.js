const fractalCanvas = document.getElementById('fractalCanvas');
const posterCanvas = document.getElementById('posterCanvas');

const canvasHeight = Math.floor(window.innerHeight * 0.65);
fractalCanvas.height = posterCanvas.height = canvasHeight;
fractalCanvas.width = posterCanvas.width = canvasHeight / 1.4;

let FabricCanvas = new fabric.Canvas('posterCanvas');

FabricCanvas.setBackgroundColor('white', () => {
    FabricCanvas.renderAll();
})