function makeMapDraggable(tileWidth, tileHeight) {
  const tileMap = document.getElementById("tile-map");
  // const startX = tileMap.offsetLeft;
  // const startY = tileMap.offsetTop;
  window.addEventListener("mousedown", mouseDown, false);
  window.addEventListener("mouseup", mouseUp, false);
  let xMouseOffset = null;
  let yMouseOffset = null;
  let xMouseDown = null;
  let yMouseDown = null;
  // let lastXShift = 0;
  // let lastYShift = 0;

  function move(e) {
    tileMap.style.top = e.clientY - yMouseOffset + "px";
    tileMap.style.left = e.clientX - xMouseOffset + "px";
  }

  function mouseUp(e) {
    // Daniel, this was causing tiles to appear with the wrong data/location briefly.
    // tiles still move imperceptibly!
    // const xMoved = e.clientX - xMouseDown + lastXShift;
    // const yMoved = e.clientY - yMouseDown + lastYShift;
    // const xJaunt = (lastXShift = xMoved % (tileWidth * 2)); // because they are hexagons
    // const yJaunt = (lastYShift = yMoved % tileHeight);
    //
    // tileMap.style.left = startX + xJaunt + "px";
    // tileMap.style.top = startY + yJaunt + "px";
    window.removeEventListener("mousemove", move, true);
  }

  function mouseDown(e) {
    xMouseDown = e.clientX;
    yMouseDown = e.clientY;
    xMouseOffset = e.clientX - tileMap.offsetLeft;
    yMouseOffset = e.clientY - tileMap.offsetTop;
    window.addEventListener("mousemove", move, true);
  }
}

export default makeMapDraggable;
