import React from "react"

const TileData = ({width, height, latitude, longitude, data}) => {

  return (
    <div className="tile-data">
      <div>{data}</div>
      <div>{latitude}</div>
      <div>{longitude}</div>
    </div>
  )

}

export default TileData
