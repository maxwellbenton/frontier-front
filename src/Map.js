import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { connect } from "react-redux";

class Map extends Component {
  onMapChange({ center, zoom, bounds, marginBounds }) {
    debugger;
  }

  render() {
    console.log(this.props);
    return (
      <div style={{ width: "400px", height: "400px", backgroundColor: "blue" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyAnOUVfPIPpr32lSGuHzQLIdZf2jAfmKuU",
            language: "en"
          }}
          options={{ mapTypeId: "satellite" }}
          onChange={this.onMapChange.bind(this)}
          center={[this.props.location.latitude, this.props.location.longitude]}
          defaultZoom={17}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ tileData, location }) => ({ tileData, location });

export default connect(mapStateToProps)(Map);

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
