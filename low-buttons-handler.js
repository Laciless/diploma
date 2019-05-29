const useOnPosterBtn = document.getElementById("useOnPoster");
const saveFractal = document.getElementById("saveFractal");
const savePoster = document.getElementById("savePoster");
const modifyFractal = document.getElementById("modifyFractal");

useOnPosterBtn.addEventListener('click', (e) => {
    addImageFromUlr(fractalCanvas.toDataURL('image/png'), serializeForm(fractalTypeSelect.value));
});

saveFractal.addEventListener('click', () => {
    saveFractal.href = fractalCanvas.toDataURL('image/png');
});

savePoster.addEventListener('click', () => {
    savePoster.href = posterCanvas.toDataURL('image/png');
});

modifyFractal.addEventListener('click', () => {
    const fractalDescription = getFractalDescription();
    if (!fractalDescription) {
        return;
    }

    removeSelected();

    fractalTypeSelect.value = fractalDescription.fractalType;
    if ("createEvent" in document) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        fractalTypeSelect.dispatchEvent(evt);
    } else {
        fractalTypeSelect.fireEvent("onchange");
    }

    form = document.forms[fractalDescription.fractalType];
    Object.keys(fractalDescription).forEach(key => {
        if (form.elements[key]) {
            form.elements[key].value = fractalDescription[key];
        }
    });
    switch (fractalDescription.fractalType) {
        case 'tree':
            drawTree();
            break;
        case 'juliaForm':
            drawJulia();
            break;
    }
});

function serializeForm(formName) {
    const form = document.forms[formName];
    const result = {};
    for (let i=0; i < form.length; i++) {
        if (form.elements[i].name) {
            result[form.elements[i].name] = form.elements[i].value
        }
    }
    result['fractalType'] = formName;
    return result;
}