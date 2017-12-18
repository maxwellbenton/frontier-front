export default function tileData(
  state = { tileData: {}, loadingTiles: false },
  action
) {
  switch (action.type) {
    case "GETTING_LOCAL_DATA":
      return { ...state, loadingTiles: true };
    case "SET_LOCAL_DATA":
      console.log(action.payload);
      return {
        ...state,
        tileData: action.payload,
        loadingTiles: false
      };
    default:
      return state;
  }
}
