const copyButton = document.getElementById('copyBtn');
const pasteButton = document.getElementById('pasteBtn');
const removeButton = document.getElementById('removeBtn');
const addTextButton = document.getElementById('addTextBtn');
const fontSizeInput = document.getElementById('fontSizeInput');
const fontSelect = document.getElementById('fontFamily');
const posterFillColor = document.getElementById('posterFillColor');
const posterStrokeColor = document.getElementById('posterStrokeColor');
const posterBackgroundColorInput = document.getElementById('posterBackgroundColor');
const addCircleBtn = document.getElementById('addCircle');
const addSquareBtn = document.getElementById('addSquare');
const addTriangleBtn = document.getElementById('addTriangle');
const toBackBtn = document.getElementById('toBack');
const toFrontBtn = document.getElementById('toFront');

let _clipboard;

copyButton.addEventListener('click', () => {
    FabricCanvas.getActiveObject().clone(function(cloned) {
		_clipboard = cloned;
	});
});

posterBackgroundColorInput.addEventListener('change', () => {
    FabricCanvas.setBackgroundColor(posterBackgroundColorInput.value, () => {
        FabricCanvas.renderAll();
    });
});

toBackBtn.addEventListener('click', () => {
    const el = FabricCanvas.getActiveObject();
    if (el) {
        FabricCanvas.sendToBack(el);
    }
});
toFrontBtn.addEventListener('click', () => {
    const el = FabricCanvas.getActiveObject();
    if (el) {
        FabricCanvas.bringToFront(el);
    }
});

addCircleBtn.addEventListener('click', () => {
    const circle = new fabric.Circle({
        radius: 50,
        fill: posterFillColor.value,
        stroke: posterStrokeColor.value,
    })
    FabricCanvas.add(circle);
})

addTriangleBtn.addEventListener('click', () => {
    const triangle = new fabric.Triangle({
        fill: posterFillColor.value,
        stroke: posterStrokeColor.value,
    })
    FabricCanvas.add(triangle);
})

addSquareBtn.addEventListener('click', () => {
    const square = new fabric.Rect({
        fill: posterFillColor.value,
        stroke: posterStrokeColor.value,
        height: 50,
        width: 50
    })
    FabricCanvas.add(square);
})

pasteButton.addEventListener('click', () => {
    _clipboard.clone(function(clonedObj) {
		FabricCanvas.discardActiveObject();
		clonedObj.set({
			left: clonedObj.left + 10,
			top: clonedObj.top + 10,
			evented: true,
		});
        FabricCanvas.add(clonedObj);
		FabricCanvas.setActiveObject(clonedObj);
	});
});

removeButton.addEventListener('click', removeSelected);

addTextButton.addEventListener('click', () => {
    addText();
})

function removeSelected() {
    const selection = FabricCanvas.getActiveObject();
    FabricCanvas.remove(selection)
}

function addImageFromUlr(imageURL, data) {
    fabric.Image.fromURL(imageURL, function(oImg) {
        oImg.fractalDescription = data;
        FabricCanvas.add(oImg);
      });
}

function getFractalDescription() {
    const selection = FabricCanvas.getActiveObject();
    return selection && selection.fractalDescription;
}

function addText() {
    const fontSize = +fontSizeInput.value;
    const fontFamily = fontSelect.value;
    const textbox = new fabric.Textbox('text', {
        fontSize,
        fontFamily,
        fill: posterFillColor.value,
        stroke: posterStrokeColor.value,
    });
    FabricCanvas.add(textbox).setActiveObject(textbox);
}