const useOnPosterBtn = document.getElementById("useOnPoster");
const saveFractal = document.getElementById("saveFractal");
const savePoster = document.getElementById("savePoster");
const modifyFractal = document.getElementById("modifyFractal");

useOnPosterBtn.addEventListener('click', (e) => {
    addImageFromUlr(fractalCanvas.toDataURL('image/png'));
});

saveFractal.addEventListener('click', () => {
    saveFractal.href = fractalCanvas.toDataURL('image/png');
});

savePoster.addEventListener('click', () => {
    savePoster.href = posterCanvas.toDataURL('image/png');
})