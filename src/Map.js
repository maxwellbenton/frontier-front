import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import { getLocationData } from "./actions";

class Map extends Component {
  onMapChange({ center, zoom, bounds, marginBounds }) {
    const latDiff = bounds.nw.lat - bounds.se.lat;
    const lngDiff = bounds.nw.lng - bounds.se.lng;
    const offsetLng = Math.round(bounds.nw.lng * 1000) / 1000;
    let latHexOffset = (offsetLng * 2000) % 2 === 0 ? 0 : 0.00025;

    const offsetLat = Math.round(bounds.nw.lat * 1000) / 1000 + latHexOffset;

    const latDegreesPerPixel = latDiff / window.innerHeight;
    const lngDegreesPerPixel = lngDiff / window.innerWidth;
    const yOffset = 0; //Math.floor((offsetLat - bounds.nw.lat) / latDegreesPerPixel);
    const xOffset = 0; //Math.floor((offsetLng - bounds.nw.lng) / lngDegreesPerPixel);

    this.props.getLocationData({
      zoom,
      latDegreesPerPixel,
      lngDegreesPerPixel,
      offsetLat,
      offsetLng,
      yOffset,
      xOffset,
      center
    });
  }

  createMapOptions(maps) {
    // next props are exposed at maps
    // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
    // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
    // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
    // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
    // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
    return {
      disableDefaultUI: true,
      mapTypeId: "satellite",
      zoomControl: false
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
          onChange={this.onMapChange.bind(this)}
          center={[this.props.location.latitude, this.props.location.longitude]}
          defaultZoom={17}
        >
          <div
            lat={this.props.location.latitude}
            lng={this.props.location.longitude}
          >
            hey
          </div>
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = ({ tileData, location }) => ({ tileData, location });

export default connect(mapStateToProps, { getLocationData })(Map);
