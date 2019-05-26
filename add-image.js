// const posterCanvas = document.getElementById("posterCanvas");
const useOnPosterBtn = document.getElementById("useOnPoster");

useOnPosterBtn.addEventListener('click', (e) => {
    addImageFromUlr(canvas.toDataURL('image/png'));
})
