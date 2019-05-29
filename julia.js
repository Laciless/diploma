var maxIterations; //количество итераций
var width, height; //размеры канвы и контекст
var minX,maxX,minY,maxY,jsX,jsY; //коэффициенты
                          //0.01

function getMapCoeffs (x, t1, t2, s1, s2) {
 var f = (x - t1) / (t2 - t1);
 var g = f * (s2 - s1) + s1;
 return g;
}

function getColor (c) {
   
  const startColor = hexToRgb(document.getElementById("colorStart").value);
  const endColor = hexToRgb(document.getElementById("colorEnd").value);

  const rStep = Math.floor((startColor.r - endColor.r) / 6);
  const gStep = Math.floor((startColor.g - endColor.g) / 6);
  const bStep = Math.floor((startColor.b - endColor.b) / 6);
  var c = "#" + ( "00" + ( ~~( startColor.r - rStep * ( c % 6 )) ).toString( 16 ) ).slice( -2 ) + 
                ( "00" + ( ~~( startColor.g-gStep* ( c % 6 ) ) ).toString( 16 ) ).slice( -2 ) + 
                ( "00" + ( ~~( startColor.b-bStep* ( c % 6 ) ) ).toString( 16 ) ).slice( -2 );
  return (c);
}

function drawFractal() {
 var a, as, za, b, bs, zb, count, clr;
 for (var j = 0; j < height; j++) {
  for (var i = 0; i < width; i++ ) {
   a = getMapCoeffs (i, 0, width, minX, maxX);
   b = getMapCoeffs (j, 0, height, minY, maxY);
   count = 0;
   while (++count < maxIterations) {
      za = a * a; zb = b * b;
      if (za + zb > 4) break;
      as = za - zb; bs = 2 * a * b;
      a = as + jsX; b = bs + jsY;
   }
   if (count < maxIterations) {
    context.fillStyle = getColor (count);
   }
   context.fillRect (i, j, 1, 1); //рисуем точку
  }
 }
}

function init() {
 maxIterations = parseInt(document.juliaForm.maxIterations.value);
 if (maxIterations === 'undefined') maxIterations=450;
 minX = parseFloat(document.juliaForm.minX.value)/100;
 if (minX === 'undefined') minX=-0.5;
 maxX = parseFloat(document.juliaForm.maxX.value)/100;
 if (maxX === 'undefined') maxX=0.5;
 minY = parseFloat(document.juliaForm.minY.value)/100;
 if (minY === 'undefined') minY=-0.5;
 maxY = parseFloat(document.juliaForm.maxY.value)/100;
 if (maxY === 'undefined') maxY=0.5;
 jsX = parseFloat(document.juliaForm.jsX.value)/100;
 if (jsX === 'undefined') jsX=0.285;
 jsY = parseFloat(document.juliaForm.jsY.value)/100;
 if (jsY === 'undefined') jsY=0.01;




 width = fractalCanvas.width;
 height = fractalCanvas.height;
 context.clearRect(0, 0, context.canvas.width, context.canvas.height);
 context.fillStyle = "black"; context.fillRect (0, 0, width, height);
 drawFractal();
}

const drawButton = document.getElementById("drawJulia");

drawButton.addEventListener('click', e => {
  e.preventDefault();
  init()
});
