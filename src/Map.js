import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import { getLocationData } from "./actions";

class Map extends Component {
  createMapOptions(maps) {
    return {
      disableDefaultUI: true,
      mapTypeId: "satellite",
      zoomControl: false,
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      minZoom: 17,
      backgroundColor: "#000"
    };
  }

  render() {
    return (
      <div className="map">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyAnOUVfPIPpr32lSGuHzQLIdZf2jAfmKuU",
            language: "en"
          }}
          options={this.createMapOptions}
          onChange={this.props.getLocationData}
          center={[this.props.location.latitude, this.props.location.longitude]}
          defaultZoom={17}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ tileData, location }) => ({ tileData, location });

export default connect(mapStateToProps, { getLocationData })(Map);
