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
        tileHeight: action.payload.tileHeight,
        tileWidth: action.payload.tileWidth,
        yTiles: action.payload.yTiles,
        xTiles: action.payload.xTiles,
        yOffset: action.payload.yOffset,
        xOffset: action.payload.xOffset,
        latPerPix: action.payload.latPerPix,
        lngPerPix: action.payload.lngPerPix
      };
    case "SET_TILES_LOADED":
      return {
        ...state,
        tilesLoaded: true
      };
    default:
      return state;
  }
}
