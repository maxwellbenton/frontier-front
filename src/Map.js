import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class Map extends Component {
  state = {
    positionArray: [],
    colors: ["yellow", "black", "red", "blue"]
  };

  onMapChange(center, zoom, bounds, marginBounds) {
    let lat = Math.round(center[0] * 1000) / 1000;
    let long = Math.round(center[1] * 1000) / 1000;
    let latBoundCount = Math.abs((bounds[0] - bounds[2]) * 1000);
    let longBoundCount = Math.abs((bounds[1] - bounds[3]) * 1000);
    let wWidth = Math.round(1 / longBoundCount * 100);
    let wHeight = Math.round(1 / latBoundCount * 100);
    console.log(wWidth * longBoundCount);
    console.log(wHeight * latBoundCount);
    let pArray = [];
    for (let i = -latBoundCount; i < latBoundCount; i += 1) {
      for (let n = -longBoundCount; n < longBoundCount; n += 1) {
        pArray.push({
          latitude: lat + i / 1000,
          longitude: long + n / 1000,
          width: wWidth + "vw",
          height: wHeight + "vh"
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
            width: position.width,
            height: position.height,
            backgroundColor: this.state.colors[
              Math.floor(Math.random() * this.state.colors.length)
            ],
            opacity: "0.5",
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
          onBoundsChange={this.onMapChange.bind(this)}
          center={[this.props.latitude, this.props.longitude]}
          defaultZoom={16}
        >
          {gridPoints}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
