import { RestfulAdapter } from "../adapter";

export function getLocation() {
  return dispatch => {
    dispatch(gettingLocation());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          dispatch(setLocation(position));
        } //add location error handling after comma
      );
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
export function setLocation(locationData) {
  return {
    type: "SET_LOCATION",
    payload: {
      latitude: locationData.coords.latitude,
      longitude: locationData.coords.longitude
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
