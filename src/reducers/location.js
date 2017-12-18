export default function location(
  state = { latitude: null, longitude: null, loadingLocation: false },
  action
) {
  switch (action.type) {
    case "GETTING_LOCATION":
      return { ...state, loadingLocation: true };
    case "SET_LOCATION":
      console.log(action.payload);
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        closeLat: action.payload.cLat,
        closeLng: action.payload.cLng
        loadingLocation: false
      };
    default:
      return state;
  }
}
