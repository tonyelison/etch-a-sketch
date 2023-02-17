const grid = document.querySelector(".grid");

function drawGrid(sideLength) {
  grid.style.setProperty("--grid-length", sideLength);
  
  const area = sideLength * sideLength;
  for (let i = 0; i < area; i++) {
    const box = document.createElement("div");
    box.classList.add("box");
    grid.appendChild(box);
  }
}

drawGrid(16);