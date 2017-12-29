export default function tileData(
  state = {
    tileData: [],
    tileHeight: null,
    tileWidth: null,
    xTiles: 25,
    yTiles: 25,
    latPerPix: 0.0005,
    lngPerPix: 0.0005,
    loadingTiles: false
  },
  action
) {
  switch (action.type) {
    case "GETTING_LOCAL_DATA":
      return { ...state, loadingTiles: true };
    case "SET_LOCAL_DATA":
      return {
        ...state,
        tileData: action.payload.tiles,
        tileHeight: action.payload.divHeight,
        tileWidth: action.payload.divWidth,
        xTiles: action.payload.xTiles,
        yTiles: action.payload.yTiles,
        latPerPix: action.payload.latPerPix,
        lngPerPix: action.payload.lngPerPix,
        loadingTiles: false
      };
    default:
      return state;
  }
}
