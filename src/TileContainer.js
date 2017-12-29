import React from "react"
import TileBorder from "./TileBorder.js"
import TileData from "./TileData.js"

const TileContainer = ({rowIdx, colIdx, tileHeight, tileWidth, offset, tileData}) => {

  return (
    <div className="tile-container"
         style={{
            top: rowIdx * tileHeight + offset,
            left: colIdx * tileWidth,
            width: tileWidth,
            height: tileHeight,
          }}>
      <TileBorder color={(Math.round(Math.random())) ? '#faa' : '#373'}/>
      <TileData {...tileData}/>
    </div>
  )

}

export default TileContainer
