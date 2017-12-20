import React, { Component } from "react";
import { connect } from "react-redux";
import makeMapDraggable from "./scripts/dragger.js"

class TileLayer extends Component {
  state = {
    tileArray: [],
    tileWidth: 100,
    spacing: 75,
    tileHeight: 100,
    xTiles: 25,
    yTiles: 25
  };

  componentDidMount() {
    makeMapDraggable()
    console.log("MAP DRAGGABLE BEBEE SLOPPY JANK DOP!");
  }

  render() {
    const tileDivs = []
    if(this.props.tileData) {

      this.props.tileData.forEach((col, colIdx) => {
        const offset = colIdx % 2 === 0 ? 0 : this.state.tileHeight/2
        col.forEach((tile, rowIdx) => {
          console.log(this.state.tileHeight + offset);
          tileDivs.push(
            <div
              key={`${rowIdx},${colIdx}`}
              rowidx={rowIdx}
              colidx={colIdx}
              className="tile"
              style={{
                top: rowIdx * this.state.tileHeight + offset,
                left: colIdx * this.state.tileWidth,
                width: this.state.tileWidth,
                height: this.state.tileHeight,
              }}
            >
              <h5>{tile.data}</h5>
              <h5>{tile.latitude}</h5>
              <h5>{tile.longitude}</h5>
            </div>
          )
        })
      })
    }
    console.log(tileDivs);
    const width = this.state.tileWidth * 0.75 * this.state.xTiles + this.state.tileWidth / 4;
    const height = this.state.tileHeight * this.state.yTiles + this.state.tileHeight / 2;
    return (
      <div
        id="tile-map"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {tileDivs}
      </div>
    );
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

const mapStateToProps = ({ tileData, location }) => ({ ...tileData, location });

export default connect(mapStateToProps)(TileLayer);
