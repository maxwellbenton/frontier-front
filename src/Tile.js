import React from "react";
import TileBorder from "./TileBorder.js";

const Tile = ({
  rowIdx,
  colIdx,
  tileHeight,
  tileWidth,
  xPos,
  yPos,
  latitude,
  longitude,
  data
}) => {
  return (
    <div
      rowidx={rowIdx}
      colidx={colIdx}
      className="tile"
      style={{
        position: "absolute",
        top: yPos,
        left: xPos,
        width: tileWidth,
        height: tileHeight,
        opacity: 0.3
      }}
    >
      <div>{data}</div>
      <div>{latitude}</div>
      <div>{longitude}</div>
    </div>
  );
};

export default Tile;
