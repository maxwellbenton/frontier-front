import React, { Component } from "react";
import { connect } from "react-redux";

class TileLayer extends Component {
  state = {
    tileArray: [],
    divWidth: 100,
    spacing: 75,
    divHeight: 100,
    xTiles: 25,
    yTiles: 25
  };

  render() {
    console.log(this.props);

    const tileDivs = Object.keys(this.props.tileData).map((tile, index) => {
      return (
        <div
          key={index}
          rowidx={this.props.tileData[tile].rowIdx}
          colidx={this.props.tileData[tile].colIdx}
          className="tile"
          data-id={tile}
          style={{
            top: this.props.tileData[tile].y,
            left: this.props.tileData[tile].x,
            width: this.state.divWidth,
            height: this.state.divHeight,
            lineHeight: this.state.divHeight
          }}
        >
          <h5>{tile}</h5>
        </div>
      );
    });
    const width =
      this.state.divWidth * 0.75 * this.state.xTiles + this.state.divWidth / 4;
    const height =
      this.state.divHeight * this.state.yTiles + this.state.divHeight / 2;
    return (
      <div
        id="tile-map"
        style={{ width: `${width}px`, height: `${height}px` }}
        className="dragscroll"
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
