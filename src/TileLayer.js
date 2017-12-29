import React, { Component } from "react";
import { connect } from "react-redux";
import makeMapDraggable from "./scripts/dragger.js";
import TileContainer from "./TileContainer.js";

class TileLayer extends Component {
  componentDidMount() {
    makeMapDraggable(this.props.tileWidth, this.props.tileHeight);
  }

  generateTiles = () =>
    this.props.tileData.reduce((acc, colData, colIdx) => {
      colData.forEach((tileData, rowIdx) => {
        const tileProps = {
          rowIdx: rowIdx,
          colIdx: colIdx,
          tileHeight: this.props.tileHeight,
          tileWidth: this.props.tileWidth,
          offset: colIdx % 2 === 0 ? 0 : this.props.tileHeight / 2,
          tileData: tileData // {latitude, longitude, data}
        };
        acc.push(<TileContainer key={`${rowIdx}-${colIdx}`} {...tileProps} />);
      });
      return acc;
    }, []);

  render() {
    const width =
      this.props.tileWidth * 0.75 * this.props.xTiles +
      this.props.tileWidth / 4;
    const height =
      this.props.tileHeight * this.props.yTiles + this.props.tileHeight / 2;
    return (
      <div id="tile-map" style={{ width: `${width}px`, height: `${height}px` }}>
        {this.props.tileData ? this.generateTiles() : null}
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
