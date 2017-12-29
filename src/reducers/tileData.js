export default function tileData(
  state = { tileData: [], tileHeight: 100, tileWidth: 100, xTiles: 25, yTiles: 25, loadingTiles: false },
  action
) {
  switch (action.type) {
    case "GETTING_LOCAL_DATA":
      return { ...state, loadingTiles: true };
    case "SET_LOCAL_DATA":
      console.log(action.payload);

      return {
        ...state,
        tileData: action.payload.tiles,
        tileHeight: action.payload.divHeight,
        tileWidth: action.payload.divWidth,
        xTiles: action.payload.xTiles,
        yTiles: action.payload.yTiles,
        loadingTiles: false
      };
    default:
      return state;
  }
}