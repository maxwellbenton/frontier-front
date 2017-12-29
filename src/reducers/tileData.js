export default function tileData(
  state = {
    tileData: [],
    tileHeight: null,
    tileWidth: null,
    xTiles: 25,
    yTiles: 25,
    latPerPix: 0.0005,
    lngPerPix: 0.0005,
    tilesLoaded: false
  },
  action
) {
  switch (action.type) {
    case "SET_LOCAL_DATA":
      return {
        ...state,
        tileData: action.payload.tiles,
        tileHeight: action.payload.divHeight,
        tileWidth: action.payload.divWidth,
        xTiles: action.payload.xTiles,
        yTiles: action.payload.yTiles,
        yOffset: action.payload.yOffset,
        xOffset: action.payload.xOffset,
        latPerPix: action.payload.latPerPix,
        lngPerPix: action.payload.lngPerPix
      };
    case "SET_TILES_LOADED":
      return {
        tilesLoaded: true
      };
    default:
      return state;
  }
}
