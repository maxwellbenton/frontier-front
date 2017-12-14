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
        loadingLocation: false
      };
    default:
      return state;
  }
}
