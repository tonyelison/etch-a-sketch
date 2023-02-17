const grid = document.querySelector(".grid");

function generateGrid(sideLength) {
  grid.style.setProperty("--grid-length", sideLength);
  
  const boxes = [];
  const area = sideLength * sideLength;

  for (let i = 0; i < area; i++) {
    const box = document.createElement("div");
    box.addEventListener("mouseover", draw);
    box.classList.add("box");
    boxes.push(box);
  }

  grid.replaceChildren(...boxes);
}

function setGridSize() {
  generateGrid(prompt("Grid Length:"));
}

function draw() {
  this.classList.add("filled");
}

function clearGrid() {
  grid.childNodes.forEach((box) => box.classList.remove("filled"));
}

const generateGridButton = document.querySelector("button#generate-grid");
generateGridButton.addEventListener("click", setGridSize);

const clearButton = document.querySelector("button#clear-grid");
clearButton.addEventListener("click", clearGrid);