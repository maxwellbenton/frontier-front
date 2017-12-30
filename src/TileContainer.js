import React from "react";
import TileBorder from "./TileBorder.js";
import TileData from "./TileData.js";

const TileContainer = ({
  rowIdx,
  colIdx,
  tileHeight,
  tileWidth,
  offset,
  tileData
}) => {
  let bColor = tileData.playerTile ? "#faa" : "#000";
  let tileOpacity = tileData.playerTile ? 0 : 1;
  return (
    <div
      className="tile-container"
      style={{
        top: tileData.yPos,
        left: tileData.xPos,
        width: tileWidth * 1.4,
        height: tileHeight * 1.05,
        opacity: tileOpacity
      }}
    >
      <TileBorder color={bColor} />
      <TileData {...tileData} />
    </div>
  );
};

export default TileContainer;
