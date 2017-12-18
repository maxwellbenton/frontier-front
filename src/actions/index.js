import { RestfulAdapter, LocationAdapter } from "../adapter";

export function getLocation() {
  return dispatch => {
    dispatch(gettingLocation());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let closestLong = Math.round(position.coords.longitude * 20000) / 20000;
        let latHexOffset = (closestLong * 20000) % 2 === 0 ? 0 : 0.00025;
        let closestLat =
          Math.round(position.coords.latitude * 20000) / 20000 + latHexOffset;
        let latStart = closestLat - 0.006;
        let longStart = closestLong - 0.006;
        let divWidth = 100;
        let spacing = 75;
        let divHeight = 100;
        let xTiles = 25; //keep odd for 'center' hex tile
        let yTiles = 25; //keep odd for 'center' hex tile

        let tiles = {};
        dispatch(
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            cLat: closestLat,
            cLng: closestLong
          })
        );

        for (let colIdx = 0; colIdx < xTiles; colIdx++) {
          for (let rowIdx = 0; rowIdx < yTiles; rowIdx++) {
            let longitude = longStart + colIdx * 0.0005;
            let latitude = latStart + rowIdx * 0.0005;
            tiles[
              `${Math.round(latitude * 20000) / 20000},${Math.round(
                longitude * 20000
              ) / 20000}`
            ] = {
              x: colIdx * spacing,
              y:
                colIdx % 2 === 0
                  ? rowIdx * divHeight
                  : rowIdx * divHeight + divHeight / 2,
              colIdx,
              rowIdx,
              longitude: Math.round(longitude * 20000) / 20000,
              latitude: Math.round(latitude * 20000) / 20000
            };
          }
        }
        dispatch(setLocalData(tiles));
      });
    } else {
      console.log("geolocation error");
    }
  };
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
