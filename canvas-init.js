const fractalCanvas = document.getElementById('fractalCanvas');
const posterCanvas = document.getElementById('posterCanvas');

const canvasHeight = Math.floor(window.innerHeight * 0.65);
fractalCanvas.height = posterCanvas.height = canvasHeight;
fractalCanvas.width = posterCanvas.width = canvasHeight / 1.4;

const fonts = ['Roboto', 'Pacifico', 'Expletus Sans', 'Dancing Script', 'Shadows Into Light'];
const fontfaceObservables = fonts.map(font => new FontFaceObserver(font));
const observe = fontfaceObservables.map(obs => obs.load());
let FabricCanvas;
Promise.all(observe).then(() => {
    FabricCanvas = new fabric.Canvas('posterCanvas');
    FabricCanvas.setBackgroundColor('white', () => {
        FabricCanvas.renderAll();
    })
})
