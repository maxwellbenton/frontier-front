import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class Map extends Component {
  render() {
    console.log(this.props);
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyAnOUVfPIPpr32lSGuHzQLIdZf2jAfmKuU",
            language: "en"
          }}
          options={{ mapTypeId: "satellite" }}
          center={[this.props.latitude, this.props.longitude]}
          defaultZoom={16}
        >
          <div
            lat={this.props.latitude}
            lng={this.props.longitude}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: "black"
            }}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
