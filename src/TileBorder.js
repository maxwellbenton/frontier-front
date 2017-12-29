import React from "react"

const TileBorder = ({width, height, color}) => {

  const divStyle = {
    backgroundColor: color,
    width: width,
    height: height,
  }

  return (
    <div className="tile-border" style={divStyle}></div>
  )

}

export default TileBorder
