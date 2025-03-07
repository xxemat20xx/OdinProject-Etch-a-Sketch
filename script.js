const container = document.getElementById('grid-container');
const gridSizeInput = document.getElementById('gridSize');
const sizeValue = document.getElementById('sizeValue');
const colorPicker = document.getElementById('colorPicker');
const rainbowModeBtn = document.getElementById('rainbowMode');
const eraserModeBtn = document.getElementById('eraserMode');
const clearButton = document.getElementById('clear');

let isRainbowMode = false;
let isEraserMode = false;
let currentColor = colorPicker.value;

// Function to generate random RGB color
function getRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, 
                ${Math.floor(Math.random() * 256)}, 
                ${Math.floor(Math.random() * 256)})`;
}

// Function to create grid
function createGrid(size) {
    container.innerHTML = ''; // Clear previous grid
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-item');
        cell.addEventListener('mouseover', () => {
            if (isEraserMode) {
                cell.style.backgroundColor = 'white';
            } else if (isRainbowMode) {
                cell.style.backgroundColor = getRandomColor();
            } else {
                cell.style.backgroundColor = currentColor;
            }
        });
        container.appendChild(cell);
    }
}

// Update grid size
gridSizeInput.addEventListener('input', (e) => {
    const size = e.target.value;
    sizeValue.textContent = `${size} x ${size}`;
    createGrid(size);
});

// Color Picker
colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
    isRainbowMode = false;
    isEraserMode = false;
    rainbowModeBtn.classList.remove('active');
    eraserModeBtn.classList.remove('active');
});

// Rainbow Mode
rainbowModeBtn.addEventListener('click', () => {
    isRainbowMode = !isRainbowMode;
    isEraserMode = false;
    rainbowModeBtn.classList.toggle('active');
    eraserModeBtn.classList.remove('active');
});

// Eraser Mode
eraserModeBtn.addEventListener('click', () => {
    isEraserMode = !isEraserMode;
    isRainbowMode = false;
    eraserModeBtn.classList.toggle('active');
    rainbowModeBtn.classList.remove('active');
});

// Clear Grid
clearButton.addEventListener('click', () => {
    document.querySelectorAll('.grid-item').forEach(cell => {
        cell.style.backgroundColor = 'white';
    });
});

// Initialize default grid
createGrid(16);