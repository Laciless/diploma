function addImageFromUlr(imageURL) {
    const image = new Image();
    document.getElementById("test").src = imageURL;
    image.src = imageURL;
    var imgInstance = new fabric.Image(image, {
        left: 100,
        top: 100
    });
    FabricCanvas.add(imgInstance);
}