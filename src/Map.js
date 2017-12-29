import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import { getLocationData } from "./actions";

class Map extends Component {
  onMapChange({ center, zoom, bounds, marginBounds }) {
    const latDiff = bounds.nw.lat - bounds.se.lat;
    const lngDiff = bounds.nw.lng - bounds.se.lng;
    const latPixelsPerDegree = window.innerHeight / latDiff;
    const lngPixelsPerDegree = window.innerWidth / lngDiff;

    const offsetLng = Math.round(bounds.nw.lng * 1000) / 1000;
    let latHexOffset = (offsetLng * 2000) % 2 === 0 ? 0 : 0.00025;
    const offsetLat = Math.round(bounds.nw.lat * 1000) / 1000 + latHexOffset;

    const xOffset = (bounds.nw.lng - offsetLng) * lngPixelsPerDegree;
    const yOffset = (bounds.nw.lat - offsetLat) * latPixelsPerDegree;

    console.log("bounds", bounds.nw.lat, bounds.nw.lng);
    console.log("center", center.lat, center.lng);
    console.log("offSetLatLong", offsetLat, offsetLng);
    console.log("offsetYX", yOffset, xOffset);

    this.props.getLocationData({
      zoom,
      latPixelsPerDegree,
      lngPixelsPerDegree,
      offsetLat,
      offsetLng,
      yOffset,
      xOffset,
      center,
      bounds
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
      zoomControl: false,
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      panControl: false
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
        />
      </div>
    );
  }
}

const mapStateToProps = ({ tileData, location }) => ({ tileData, location });

export default connect(mapStateToProps, { getLocationData })(Map);
