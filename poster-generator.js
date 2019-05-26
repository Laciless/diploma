// const copyButton = document.getElementById('copyBtn');
// const pasteButton = document.getElementById('pasteBtn');
const addTextButton = document.getElementById('addTextBtn');
const fontSizeInput = document.getElementById('fontSizeInput');
const fontSelect = document.getElementById('fontFamily');


// copyButton.addEventListener('click', () => {

// });

// pasteButton.addEventListener('click', () => {

// })

addTextButton.addEventListener('click', () => {
    addText();
})

function addImageFromUlr(imageURL) {
    const image = new Image();
    image.src = imageURL;
    var imgInstance = new fabric.Image(image);
    FabricCanvas.add(imgInstance);
}

function addText() {
    const fontSize = +fontSizeInput.value;
    const fontFamily = fontSelect.value;
    console.log({
        fontSize,
        fontFamily
    });
    const textbox = new fabric.Textbox('text', {
        fontSize,
        fontFamily
    });
    FabricCanvas.add(textbox).setActiveObject(textbox);
}