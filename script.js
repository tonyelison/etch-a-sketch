const grid = document.querySelector(".grid");

function drawGrid(sideLength) {
  grid.style.setProperty("--grid-length", sideLength);
  
  const area = sideLength * sideLength;
  for (let i = 0; i < area; i++) {
    const box = document.createElement("div");
    box.addEventListener("mouseover", fillBox);
    box.classList.add("box");
    grid.appendChild(box);
  }
}

drawGrid(16);

function fillBox() {
  this.classList.add("filled");
}

const clearButton = document.querySelector("button");
clearButton.addEventListener("click", clearGrid);

function clearGrid() {
  grid.childNodes.forEach((box) => box.classList.remove("filled"));
}