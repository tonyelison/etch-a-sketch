const grid = document.querySelector(".grid");
let mouseDown = false;
let eraserMode = false;
let rainbowMode = false;
let gridLines = true;

function generateGrid(sideLength) {
  if (sideLength === null || sideLength === undefined || sideLength === "") {
    return;
  }

  if (sideLength < 1 || sideLength > 100) {
    return setGridSize("Invalid length.");
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

function setGridSize(errorMsg) {
  const promptMsg = (errorMsg ? `ERROR: ${errorMsg}\n` : "") + "Please enter a grid length between 1 and 100:"
  generateGrid(prompt(promptMsg));
}

function draw(e) {
  if (mouseDown) {
    const box = e.target;
    box.classList.add("filled");

    if (eraserMode) {
      box.style.setProperty("--fill-color", "white");
    } else if (rainbowMode) {
      const hexValue = Math.floor(Math.random()*16777215).toString(16);
      box.style.setProperty("--fill-color", `#${hexValue}`);
    }
  }
}

function clearGrid() {
  grid.childNodes.forEach((box) => {
    box.classList.remove("filled");
    box.style.setProperty("--fill-color", null);
  });
}

generateGrid(32);

const generateGridButton = document.querySelector("button#generate-grid");
generateGridButton.addEventListener("click", () => setGridSize());

const clearButton = document.querySelector("button#clear-grid");
clearButton.addEventListener("click", clearGrid);

function toggleEraserMode() {
  eraserMode = !eraserMode;
  if (rainbowMode && eraserMode) {
    toggleRainbowMode();
  }
  eraserToggle.classList.toggle("toggled");
}

function toggleRainbowMode() {
  rainbowMode = !rainbowMode;
  if (eraserMode && rainbowMode) {
    toggleEraserMode();
  }
  rainbowToggle.classList.toggle("toggled");
}

function toggleGridLines() {
  gridLines = !gridLines;
  if (gridLines) {
    grid.style.setProperty("--box-border", null);
    grid.style.border = null;
  } else {
    grid.style.setProperty("--box-border", "none");
    grid.style.border = "1px solid black";
  }
}

const eraserToggle = document.querySelector("button#eraser-toggle");
eraserToggle.addEventListener("click", toggleEraserMode);

const rainbowToggle = document.querySelector("button#rainbow-toggle");
rainbowToggle.addEventListener("click", toggleRainbowMode);

const gridLineToggle = document.querySelector("button#gridline-toggle");
gridLineToggle.addEventListener("click", toggleGridLines);