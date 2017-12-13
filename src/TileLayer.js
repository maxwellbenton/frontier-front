import React, { Component } from "react";


class TileLayer extends Component {
  state = {
    tileArray: [],
    divWidth: 100,
    spacing: 75,
    divHeight: 100,
    xTiles: 10,
    yTiles: 8
  };

  componentDidMount() {
    const tiles = []
    for (let colIdx = 0; colIdx < this.state.xTiles; colIdx++) {
      for (let rowIdx = 0; rowIdx < this.state.yTiles; rowIdx++) {
        tiles.push({
          x: colIdx * this.state.spacing,
          y:
            colIdx % 2 === 0
              ? rowIdx * this.state.divHeight
              : rowIdx * this.state.divHeight + this.state.divHeight / 2,
					colIdx,
					rowIdx,
					color: "black",
          opacity: 1
        })
      }
    }
    this.setState({
      tileArray: tiles
    });
  }

  render() {
    const tileDivs = this.state.tileArray.map((tile, index) => (
      <div
        key={index}
				rowidx={tile.rowIdx}
				colidx={tile.colIdx}

        className="tile"
        style={{
          top:
            tile.y,
          left:
            tile.x,
          width: this.state.divWidth,
          height: this.state.divHeight,
          clipPath: "polygon(75% 0%, 99% 50%, 75% 99%, 25% 99%, 1% 50%, 25% 0%)",
          backgroundColor: tile.color,
          lineHeight: this.state.divHeight,
          textAlign: "center",
          opacity: 0.9,
        }}
      />
    ))
		const width = (this.state.divWidth * 0.75) * this.state.xTiles + this.state.divWidth/4
		const height = this.state.divHeight * this.state.yTiles + this.state.divHeight/2
    return <div id="tile-map" style={{width: `${width}px`, height: `${height}px`}}
		className="dragscroll">{tileDivs}</div>;
  }

  handleMouseDown = e => {
    console.log(e);
  };

  handleMouseUp = e => {
    console.log(e);
  };

  handleMouseMove = e => {
    console.log(e);
  };
}

export default TileLayer;
