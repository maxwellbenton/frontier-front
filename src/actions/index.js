import { RestfulAdapter, LocationAdapter } from "../adapter";

export function getLocation() {
  return dispatch => {
    dispatch(gettingLocation());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let closestLong = Math.round(position.coords.longitude * 20000);
        let latHexOffset = closestLong % 2 === 0 ? 0 : 0.00025;
        let closestLat =
          Math.round(position.coords.latitude * 20000) / 20000 + latHexOffset;
        dispatch(
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            cLat: closestLat,
            cLng: closestLong / 20000
          })
        );
        //send closest data point to server to get tile data:
        // dispatch(getLocalData({ closestLat, closestLong }));
      });
    } else {
      console.log("geolocation error");
    }
  };
}

export function getLocalData(data) {
  return dispatch => {
    dispatch(gettingLocalData());
    LocationAdapter.localData(data).then(data => {
      dispatch(setLocalData(data));
    });
  };
}

export function gettingLocation() {
  return {
    type: "GETTING_LOCATION"
  };
}
export function gettingLocalData() {
  return {
    type: "GETTING_LOCAL_DATA"
  };
}
export function setLocalData(localData) {
  return {
    type: "SET_LOCAL_DATA",
    payload: localData
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
