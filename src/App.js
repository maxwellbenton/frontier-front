import React, { Component } from "react";
import TileLayer from "./TileLayer";
import "./App.css";
import "./hexmap.css";

class App extends Component {
  state = {
    latitude: null,
    longitude: null
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  render() {
    return (
      <div id="tile-map-container" className="dragscroll">
        <TileLayer {...this.state} />
      </div>
    );
  }
}

export default App;
// <Map {...this.state} />
