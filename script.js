const grid = document.querySelector(".grid");
let mouseDown = false;

function generateGrid(sideLength) {
  if (sideLength === null || sideLength === undefined) {
    return;
  }

  if (parseInt(sideLength) === 0) {
    grid.style.display = "none";
    return;
  }

  grid.style.display = "grid";
  grid.style.setProperty("--grid-length", sideLength);
  
  const boxes = [];
  const area = sideLength * sideLength;

  for (let i = 0; i < area; i++) {
    const box = document.createElement("div");
    box.addEventListener("mousedown", (e) => {
      mouseDown = true;
      draw(e);
    });
    box.addEventListener("mouseover", draw);
    box.addEventListener("mouseup", () => mouseDown = false);
    box.classList.add("box");
    boxes.push(box);
  }

  grid.replaceChildren(...boxes);
}

function setGridSize() {
  generateGrid(prompt("Grid Length:"));
}

function draw(e) {
  if (mouseDown) {
    e.target.classList.add("filled");
  }
}

function clearGrid() {
  grid.childNodes.forEach((box) => box.classList.remove("filled"));
}

generateGrid(32);

const generateGridButton = document.querySelector("button#generate-grid");
generateGridButton.addEventListener("click", setGridSize);

const clearButton = document.querySelector("button#clear-grid");
clearButton.addEventListener("click", clearGrid);