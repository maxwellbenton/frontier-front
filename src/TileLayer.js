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
    console.log(this.props)
    const tileDivs = []
    if(this.props.tileData) {

      this.props.tileData.forEach((col, colIdx) => {
        const offset = colIdx % 2 === 0 ? 0 : this.props.tileHeight/2
        col.forEach((tile, rowIdx) => {
          console.log(this.props.tileHeight + offset);
          tileDivs.push(
            <div
              key={`${rowIdx},${colIdx}`}
              rowidx={rowIdx}
              colidx={colIdx}
              className="tile"
              style={{
                top: rowIdx * this.props.tileHeight + offset,
                left: colIdx * this.props.tileWidth,
                width: this.props.tileWidth,
                height: this.props.tileHeight,
              }}
            >
              <h5>{tile.data}</h5>
              <div>{tile.latitude}</div>
              <div>{tile.longitude}</div>
            </div>
          )
        })
      })
    }
    console.log(tileDivs);
    const width = this.props.tileWidth * 0.75 * this.props.xTiles + this.props.tileWidth / 4;
    const height = this.props.tileHeight * this.props.yTiles + this.props.tileHeight / 2;
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
