// import { LocationAdapter } from "../adapter";

export function getLocation() {
  return dispatch => {
    dispatch(gettingLocation());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let closestLong = Math.round(position.coords.longitude * 2000) / 2000;
        let latHexOffset = (closestLong * 2000) % 2 === 0 ? 0 : 0.00025;
        let closestLat =
          Math.round(position.coords.latitude * 2000) / 2000 + latHexOffset;
        dispatch(
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            cLat: closestLat,
            cLng: closestLong
          })
        );
      });
    } else {
      console.log("geolocation error");
    }
  };
}

export function getLocationData(mapData) {
  return dispatch => {
    dispatch(gettingLocation());

    // let closestLong = Math.round(mapData.offScreenStart.lng * 2000) / 2000;
    // let latHexOffset = (closestLong * 2000) % 2 === 0 ? 0 : 0.00025;
    // let closestLat =
    //   Math.round(mapData.offScreenStart.lat * 2000) / 2000 + latHexOffset;
    // let spacing = 75;
    let divHeight = Math.ceil(0.0005 / Math.abs(mapData.latDegreesPerPixel));
    let divWidth = Math.ceil(0.0005 / Math.abs(mapData.lngDegreesPerPixel));
    let xTiles = Math.ceil(window.innerWidth / divWidth);
    let yTiles = Math.ceil(window.innerHeight / divHeight);
    let tiles = [];

    for (let colIdx = 0; colIdx < xTiles; colIdx++) {
      tiles[colIdx] = [];
      const offset = colIdx % 2 === 0 ? 0 : 0.00025;
      const yOff = colIdx % 2 === 0 ? 0 : divHeight / 2;
      for (let rowIdx = 0; rowIdx < yTiles; rowIdx++) {
        const longitude = (mapData.offsetLng + colIdx * 0.0005).toFixed(4);
        const latitude = (mapData.offsetLat - rowIdx * 0.0005 - offset).toFixed(
          5
        );

        tiles[colIdx].push({
          longitude,
          latitude,
          data: `[${rowIdx}, ${colIdx}]`,
          xPos: -mapData.xOffset + colIdx * divWidth,
          yPos: -mapData.yOffset + rowIdx * divHeight + yOff
        });
      }
    }
    dispatch(
      setLocalData({
        tiles,
        divWidth,
        divHeight,
        xTiles,
        yTiles,
        latPerPix: mapData.latDegreesPerPixel,
        lngPerPix: mapData.lngDegreesPerPixel
      })
    );
  };
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(position => {
  //       let closestLong = Math.round(position.coords.longitude * 2000) / 2000;
  //       let latHexOffset = (closestLong * 2000) % 2 === 0 ? 0 : 0.00025;
  //       let closestLat =
  //         Math.round(position.coords.latitude * 2000) / 2000 + latHexOffset;
  //       let latStart = closestLat - 0.006;
  //       let longStart = closestLong - 0.006;
  //       //let divWidth = 100;
  //       let spacing = 75;
  //       let divHeight = 100;
  //       let xTiles = 25; //keep odd for 'center' hex tile
  //       let yTiles = 25; //keep odd for 'center' hex tile
  //       let tiles = [];
  //       dispatch(
  //         setLocation({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //           cLat: closestLat,
  //           cLng: closestLong
  //         })
  //       );
  //
  //       for (let colIdx = 0; colIdx < xTiles; colIdx++) {
  //         tiles[colIdx] = []
  //         const offset = colIdx % 2 === 0 ? 0 : 0.00025
  //         for (let rowIdx = 0; rowIdx < yTiles; rowIdx++) {
  //           const longitude = (longStart + (colIdx * 0.0005)).toFixed(4);
  //           const latitude = (latStart + (rowIdx * 0.0005)+offset).toFixed(5)
  //           tiles[colIdx].push({
  //             longitude,
  //             latitude,
  //             data: `[${rowIdx}, ${colIdx}]`
  //           })
  //           // tiles[`${latitude},${longitude}`] = {
  //           //   x: colIdx,
  //           //   y: rowIdx,
  //           //   longitude,
  //           //   latitude
  //           // });
  //         }
  //       }
  //       dispatch(setLocalData(tiles));
  //     });
  //   } else {
  //     console.log("geolocation error");
  //   }
  // };
}

export function gettingLocation() {
  return {
    type: "GETTING_LOCATION"
  };
}

export function setLocation(location) {
  return {
    type: "SET_LOCATION",
    payload: {
      latitude: location.lat,
      longitude: location.lng,
      cLat: location.cLat,
      cLng: location.cLng
    }
  };
}

export function getLocalData(data) {
  // return dispatch => {
  //hook up to server to get data based on closest lat long
  // dispatch(gettingLocalData());
  // LocationAdapter.localData(data).then(data => {
  //   dispatch(setLocalData(data));
  // });
  // };
}

export function gettingLocalData() {
  return {
    type: "GETTING_LOCAL_DATA"
  };
}

export function setLocalData(tileData) {
  return {
    type: "SET_LOCAL_DATA",
    payload: tileData
  };
}

// export function addMoreHot(body) {
//   return dispatch => {
//     RestfulAdapter.createFetch("hot69", body).then(data =>
//       dispatch(setData(data))
//     );
//   };
// }

// export function setData(data) {
//   return {
//     type: "SET_DATA",
//     payload: data
//   };
// }
