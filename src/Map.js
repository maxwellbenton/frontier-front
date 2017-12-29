import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";
import { getLocationData } from "./actions";

class Map extends Component {
  onMapChange({ center, zoom, bounds, marginBounds }) {
    const offsetLng =
      Math.round((bounds.nw.lng + bounds.nw.lng - center.lng) * 1000) / 1000;
    let latHexOffset = (offsetLng * 2000) % 2 === 0 ? 0 : 0.00025;

    const offsetLat =
      Math.round((bounds.nw.lat + bounds.nw.lat - center.lat) * 2000) / 2000 +
      latHexOffset;
    const latDiff = bounds.nw.lat - bounds.se.lat;
    const lngDiff = bounds.nw.lng - bounds.se.lng;
    const latDegreesPerPixel = latDiff / window.innerHeight;
    const lngDegreesPerPixel = lngDiff / window.innerWidth;
    const yOffset = Math.floor((offsetLat - center.lat) / latDegreesPerPixel);
    const xOffset = Math.floor((offsetLng - center.lng) / lngDegreesPerPixel);

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
      gestureHandling: "none",
      zoomControl: false
    };
  }

  render() {
    console.log(this.props);
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "blue"
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyAnOUVfPIPpr32lSGuHzQLIdZf2jAfmKuU",
            language: "en"
          }}
          options={this.createMapOptions}
          onChange={this.onMapChange.bind(this)}
          center={[
            this.props.location.closestLat,
            this.props.location.closestLng
          ]}
          defaultZoom={17}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ tileData, location }) => ({ tileData, location });

export default connect(mapStateToProps, { getLocationData })(Map);

// {gridPoints}
// return (
//         <div
//           key={key}
//           lat={position.latitude}
//           lng={position.longitude}
//           style={{
//             width: position.wWidth + position.wWidth / 3 + "vw",
//             height: position.wHeight + "vh",
//             clipPath:
//               "polygon(75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%, 25% 0)",
//             backgroundColor: position.color,
//             lineHeight: position.wHeight + "vh",
//             textAlign: "center",
//             opacity: position.opacity,
//             transform: "translateX(-50%) translateY(-50%)"
//           }}
//         />
//       );
//     });
//     console.log(gridPoints);
//
//   }
// }
//
//     //store lat/long for upper left corner of map
//     let cornerLat = Math.round(bounds.nw.lat * 10000) / 10000;
//     let cornerLong = Math.round(bounds.nw.lng * 10000) / 10000;
//
//     //calculate the lat/long difference between the upper left and lower right
//     //* 1000 = 0.001 degrees between lat/long points, * 2000 = 0.0005 degrees (smaller tiles)
//     let latBoundCount = Math.abs((bounds.nw.lat - bounds.se.lat) * 2000);
//     let longBoundCount = Math.abs((bounds.nw.lng - bounds.se.lng) * 2000);
//
//     //set width of tile divs, as vh/vw %
//     let wWidth = Math.round(1 / longBoundCount * 100) + 0.3;
//     let wHeight = Math.round(1 / latBoundCount * 100) + 0.35;
//     let pArray = [];
//     for (let i = 0; i < latBoundCount + 1; i += 1) {
//       for (let n = 0; n < longBoundCount + 1; n += 1) {
//         let r = Math.floor(Math.random() * 16);
//         let color;
//         let opacity = "1";
//         switch (r) {
//           case 0:
//           case 1:
//           case 2:
//           case 3:
//           case 4:
//           case 5:
//           case 6:
//           case 7:
//           case 8:
//           case 9:
//             color = "black";
//             break;
//           case 10:
//           case 11:
//           case 12:
//           case 13:
//           case 14:
//           case 15:
//           default:
//             opacity = "0";
//         }
//
//         pArray.push({
//           latitude:
//             n % 2 === 0 ? cornerLat - i / 2000 : cornerLat - i / 2000 + 0.00025,
//           longitude: cornerLong + n / 2000,
//           wWidth,
//           color,
//           wHeight,
//           opacity: 1
//         });
//       }
//     }
//     this.setState({ positionArray: pArray });
//   }
//
