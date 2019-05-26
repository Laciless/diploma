//"use strict";

const context = fractalCanvas.getContext("2d");
const firstColorPicker = document.getElementById("colorStart");
const endColorPicker = document.getElementById("colorEnd");
const iterationsInput = document.getElementById("iterations");
const lengthInput = document.getElementById("length");
const drawButton = document.getElementById("draw");

drawButton.addEventListener('click', draw);

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
  
function draw() {  

    const startColor = hexToRgb(firstColorPicker.value);
    const endColor = hexToRgb(endColorPicker.value);
    const iterations = iterationsInput.value; 
    const length = lengthInput.value; 

    const rStep = Math.floor((startColor.r - endColor.r) / iterations);
    const gStep = Math.floor((startColor.g - endColor.g) / iterations);
    const bStep = Math.floor((startColor.b - endColor.b) / iterations);

    context.save(); // Сохраняем текущее состояние системы координат
    context.clearRect(0, 0, context.canvas.width, context.canvas.height) //Очищаем холст
    context.translate(fractalCanvas.clientWidth / 2, 0); // Центрируем дерево

    branch(length, 2, 0.4, 0.7, 0.75, iterations, startColor, {
        r: rStep,
        g: gStep,
        b: bStep
    });

    context.restore(); // Восстанавливаем начальное состояние системы координат
}

function branch(length, width, angleAll, angleBranch, scale, iteration, color, colorStep) {
    context.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
    context.fillRect(0, 0, width, length); // Рисуем "ствол-корень" дерева
    if (!iteration) // Обрываем рекурсию, когда проходят все итерации
        return;

   
    context.save(); // Сохраняем текущее состояние системы координат

    const nextColor = {
        r: color.r - colorStep.r,
        g: color.g - colorStep.g,
        b: color.b - colorStep.b,
    }

    // context.translate(0, length); // Сдвигаем "курсор" в конец "ствола-корня"
    // for( i = 0; i < branches; i++)
    // {
    //     context.rotate(i*angleBranch); // Поворачиваем систему координат на какой-то угол влево
    //     branch(branches, length * scale, width, angleAll, angleBranch, scale, iteration-1, nextColor, colorStep); // Рекурсивно рисуем левую ветвь
    // }
 	
    context.translate(0, length); // Сдвигаем "курсор" в конец "ствола-корня"
    context.rotate(0.5*angleAll);
    context.rotate(-angleBranch); // Поворачиваем систему координат на какой-то угол влево
    branch(length * scale, width, angleAll, angleBranch, scale, iteration-1, nextColor, colorStep); // Рекурсивно рисуем левую ветвь
	
    context.rotate(2 * angleBranch); // Поворачиваем систему координат на симметричный угол вправо
    branch(length * scale, width, angleAll, angleBranch, scale, iteration-1, nextColor, colorStep); // Рекурсивно рисуем правую ветвь

    context.restore(); // Восстанавливаем начальное состояние системы координат
}