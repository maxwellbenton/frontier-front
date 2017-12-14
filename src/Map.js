import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "semantic-ui-react";

class Map extends Component {
  state = {
    positionArray: []
  };

  onMapChange({ center, zoom, bounds, marginBounds }) {
    //store lat/long for upper left corner of map
    console.log("width", window.innerWidth);
    console.log("height", window.innerHeight);
    console.log("bounds", bounds);
    let cornerLat = Math.round(bounds.nw.lat * 10000) / 10000;
    let cornerLong = Math.round(bounds.nw.lng * 10000) / 10000;

    //calculate the lat/long difference between the upper left and lower right
    //* 1000 = 0.001 degrees between lat/long points, * 2000 = 0.0005 degrees (smaller tiles)
    let latBoundCount = Math.abs((bounds.nw.lat - bounds.se.lat) * 2000);
    let longBoundCount = Math.abs((bounds.nw.lng - bounds.se.lng) * 2000);

    //set width of tile divs, as vh/vw %
    let wWidth = Math.round(1 / longBoundCount * 100) + 0.3;
    let wHeight = Math.round(1 / latBoundCount * 100) + 0.35;
    let pArray = [];
    for (let i = 0; i < latBoundCount + 1; i += 1) {
      for (let n = 0; n < longBoundCount + 1; n += 1) {
        let r = Math.floor(Math.random() * 16);
        let color;
        let opacity = "0.8";
        switch (r) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
            color = "black";
            break;
          case 10:
          case 11:
          case 12:
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
          wWidth,
          color,
          wHeight,
          opacity: 1
        });
      }
    }
    this.setState({ positionArray: pArray });
  }

  render() {
    console.log(this.props);
    console.log("state", this.state);

    let gridPoints = this.state.positionArray.map((position, key) => {
      //for testing div content - remove later:
      let name;
      Math.random() < 0.6
        ? (name = "")
        : Math.random() < 0.5
          ? (name = "empty star")
          : Math.random() < 0.8
            ? (name = "pagelines")
            : (name = "angle double up");

      return (
        <div
          key={key}
          lat={position.latitude}
          lng={position.longitude}
          style={{
            width: position.wWidth + position.wWidth / 3 + "vw",
            height: position.wHeight + "vh",
            clipPath:
              "polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0)",
            backgroundColor: position.color,
            lineHeight: position.wHeight + "vh",
            textAlign: "center",
            opacity: 0.8,
            transform: "translateX(-50%) translateY(-50%)"
          }}
        />
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
          onChange={this.onMapChange.bind(this)}
          center={[this.props.latitude, this.props.longitude]}
          defaultZoom={17}
        >
          {gridPoints}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
