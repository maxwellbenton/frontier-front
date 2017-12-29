import React from "react"
import TileBorder from "./TileBorder.js"

const Tile = ({rowIdx, colIdx, tileHeight, tileWidth, offset, latitude, longitude, data}) => {

  return (
    <div
      rowidx={rowIdx}
      colidx={colIdx}
      className="tile"
      style={{
        top: rowIdx * tileHeight + offset,
        left: colIdx * tileWidth,
        width: tileWidth,
        height: tileHeight,
        opacity: 0.7
      }}
    >
      <div>{data}</div>
      <div>{latitude}</div>
      <div>{longitude}</div>
      <TileBorder width={tileWidth*1.2} height={tileHeight*1.2} color={(Math.round(Math.random())) ? '#faa' : '#373'}/>
    </div>
  )

}

export default Tile
