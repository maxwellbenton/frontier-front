// import { LocationAdapter } from "../adapter";

export function getLocation() {
  //runs at App.js componentDidMount to get current location.  Map will render once lat/long are set
  return dispatch => {
    dispatch(gettingLocation());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        dispatch(
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        );
      });
    } else {
      console.log("geolocation error");
    }
  };
}

export function setReadyState() {
  return {
    type: "SET_TILES_LOADED"
  };
}

export function getLocationData({ center, zoom, bounds, marginBounds }) {
  //fired after any map change

  //finds width and height of map in lat/long degrees
  //uses window pixel height and width to calculate pixel to degree ratios
  const latDiff = bounds.nw.lat - bounds.se.lat;
  const lngDiff = bounds.nw.lng - bounds.se.lng;
  const latPixelsPerDegree = window.innerHeight / latDiff;
  const lngPixelsPerDegree = window.innerWidth / lngDiff;

  //offsetLng & Lat are the hex tile coords closest to where we start the tile layer
  // Math.round(bounds.nw.lng * 1000) / 1000; ==> starts are top left corner of map at closest tile
  const offsetLng = Math.round((bounds.nw.lng + lngDiff / 4) * 1000) / 1000;
  let latHexOffset = (offsetLng * 2000) % 2 === 0 ? 0 : 0.00025;
  const offsetLat =
    Math.round((bounds.nw.lat + latDiff / 4) * 1000) / 1000 + latHexOffset;

  //calculate pixel difference between top left map corner and offset hex tile
  //this offset is used to adjust position of the tile layer
  const xOffset = (bounds.nw.lng - offsetLng) * lngPixelsPerDegree;
  const yOffset = (bounds.nw.lat - offsetLat) * latPixelsPerDegree;

  //calculates tile size in relation to pixels per degree (tiles are 0.0005 wide and tall)
  const tileHeight = Math.ceil(0.0005 * Math.abs(latPixelsPerDegree));
  const tileWidth = Math.ceil(0.0005 * Math.abs(lngPixelsPerDegree));

  //number of tiles needed for map
  // Math.ceil(window.innerWidth / tileWidth) only renders enough to cover most of the screen
  const xTiles = Math.ceil(window.innerWidth * 1.5 / tileWidth);
  const yTiles = Math.ceil(window.innerHeight * 1.5 / tileHeight);

  return dispatch => {
    let tiles = [];
    for (let colIdx = 0; colIdx < xTiles; colIdx++) {
      tiles[colIdx] = [];

      //offsets added in both lat degrees and y pixels for every other column of tiles
      const offset = colIdx % 2 === 0 ? 0 : 0.00025;
      const yOff = colIdx % 2 === 0 ? 0 : tileHeight / 2;

      for (let rowIdx = 0; rowIdx < yTiles; rowIdx++) {
        //for display only.  Actual position on screen is calculated based on pixels converted from pixel/degree ratio
        const longitude = (offsetLng + colIdx * 0.0005).toFixed(4);
        const latitude = (offsetLat - rowIdx * 0.0005 - offset).toFixed(5);

        //xPos & yPos used as left and top styling. all other data is visual
        tiles[colIdx].push({
          longitude,
          latitude,
          data: `[${rowIdx}, ${colIdx}]`,
          xPos: colIdx * tileWidth,
          yPos: rowIdx * tileHeight + yOff
        });
      }
    }

    //once tileHeight is set here, TileLayer will render tile overlay
    dispatch(
      setLocalData({
        tiles,
        tileWidth,
        tileHeight,
        xTiles,
        yTiles,
        xOffset,
        yOffset,
        latPixelsPerDegree,
        lngPixelsPerDegree
      })
    );
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
      longitude: location.lng
    }
  };
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
