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
          center={[this.props.latitude, this.props.longitude]}
          defaultZoom={16}
        />
      </div>
    );
  }
}

export default Map;
