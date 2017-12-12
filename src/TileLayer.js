import React, { Component } from "react";
import GoogleReact from "google-map-react";
import { Icon } from "semantic-ui-react";

class TileLayer extends Component {
  state = {
    tileArray: [],
    divWidth: 100,
    spacing: 75,
    divHeight: 100,
    xTiles: 50,
    yTiles: 50
  };

  componentDidMount() {
    for (let i = 0; i < this.state.xTiles + 1; i += 1) {
      for (let n = 0; n < this.state.yTiles + 1; n += 1) {
        let color = "black";
        let opacity = 1;
        // Math.random() >= 0.9 ? (color = "black") : (opacity = 0);
        this.setState(pState => {
          return {
            tileArray: [
              ...pState.tileArray,
              {
                x: i * this.state.spacing,
                y:
                  i % 2 === 0
                    ? n * this.state.divHeight
                    : n * this.state.divHeight + this.state.divHeight / 2,
                color,
                opacity
              }
            ]
          };
        });
      }
    }
  }

  render() {
    console.log(this.props);
    console.log("state", this.state);

    let tileDivs = this.state.tileArray.map((tile, index) => {
      return (
        <div
          key={index}
          className="tile"
          style={{
            top:
              tile.y +
              window.innerHeight -
              this.state.yTiles / 2 * this.state.divHeight,
            left:
              tile.x +
              window.innerWidth -
              this.state.xTiles / 2 * this.state.divWidth,
            width: this.state.divWidth,
            height: this.state.divHeight,
            clipPath:
              "polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0)",
            backgroundColor: tile.color,
            lineHeight: this.state.divHeight,
            textAlign: "center",
            opacity: 0.9,
            transform: "translateX(-50%) translateY(-50%)"
          }}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
        />
      );
    });
    return <div style={{ overflow: "hidden" }}>{tileDivs}</div>;
  }

  handleMouseDown = e => {
    console.log(e);
    // // only left mouse button
    // if (e.button !== 0) return
    // var pos = $(this.getDOMNode()).offset()
    // this.setState({
    //   dragging: true,
    //   rel: {
    //     x: e.pageX - pos.left,
    //     y: e.pageY - pos.top
    //   }
    // })
    // e.stopPropagation()
    // e.preventDefault()
  };

  handleMouseUp = e => {
    console.log(e);
  };

  handleMouseMove = e => {
    console.log(e);
  };
}

export default TileLayer;

// <div
//   key={key}
//   lat={position.latitude}
//   lng={position.longitude}
//   style={{
//     width: position.wWidth + position.wWidth / 3 + "vw",
//     height: position.wHeight + "vh",
//     clipPath:
//       "polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0)",
//     backgroundColor: position.color,
//     lineHeight: position.wHeight + "vh",
//     textAlign: "center",
//     opacity: position.opacity,
//     transform: "translateX(-50%) translateY(-50%)"
//   }}
// />
