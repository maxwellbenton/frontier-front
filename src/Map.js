import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class Map extends Component {
  state = {
    positionArray: []
  };

  onMapChange(center, zoom, bounds, marginBounds) {
    //store lat/long for upper left corner of map
    let cornerLat = Math.round(bounds[0] * 1000) / 1000;
    let cornerLong = Math.round(bounds[1] * 1000) / 1000;

    //calculate the lat/long difference between the upper left and lower right
    //* 1000 = 0.001 degrees between lat/long points, * 2000 = 0.0005 degrees (smaller tiles)
    let latBoundCount = Math.abs((bounds[0] - bounds[2]) * 2000);
    let longBoundCount = Math.abs((bounds[1] - bounds[3]) * 2000);

    //set width of tile divs, as vh/vw %
    let wWidth = Math.round(1 / longBoundCount * 100) + 0.3;
    let wHeight = Math.round(1 / latBoundCount * 100) + 0.35;

    let pArray = [];
    for (let i = 0; i < latBoundCount + 1; i += 1) {
      for (let n = 0; n < longBoundCount + 1; n += 1) {
        let r = Math.floor(Math.random() * 16);
        let color;
        let opacity = "0.9";
        switch (r) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
            color = "black";
            break;
          case 8:
          case 9:
          case 10:
            color = "yellow";
            break;
          case 11:
            color = "blue";
            break;
          case 12:
            color = `#${Math.floor(Math.random() * 10)}${Math.floor(
              Math.random() * 10
            )}${Math.floor(Math.random() * 10)}`;
            break;
          case 13:
          case 14:
          case 15:
          default:
            opacity = "0";
        }

        pArray.push({
          latitude:
            n % 2 === 0 ? cornerLat - i / 2000 : cornerLat - i / 2000 + 0.00025,
          longitude: cornerLong + n / 2000,
          width: wWidth,
          color: color,
          height: wHeight,
          opacity: 0.8
        });
      }
    }
    this.setState({ positionArray: pArray });
  }

  render() {
    console.log(this.props);
    console.log("state", this.state);

    let gridPoints = this.state.positionArray.map(position => {
      return (
        <div
          lat={position.latitude}
          lng={position.longitude}
          style={{
            width: position.width + position.width / 3 + "vw",
            height: position.height + "vh",
            clipPath:
              "polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0)",
            backgroundColor: position.color,

            opacity: position.opacity,
            transform: "translateX(-50%) translateY(-50%)"
          }}
        >
          [{position.latitude}, {position.longitude}]
        </div>
      );
    });
    console.log(gridPoints);
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyAnOUVfPIPpr32lSGuHzQLIdZf2jAfmKuU",
            language: "en"
          }}
          options={{ mapTypeId: "satellite" }}
          onBoundsChange={this.onMapChange.bind(this)}
          center={[this.props.latitude, this.props.longitude]}
          defaultZoom={18}
        >
          {gridPoints}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
