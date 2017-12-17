import React, { Component } from "react";
import TileLayer from "./TileLayer";
import "./App.css";
<<<<<<< HEAD
import data from "./data";
=======
import "./hexmap.css";
>>>>>>> 69957e39004d2307fa78ffe24af09569a54a4d5d

class App extends Component {
  state = {
    latitude: null,
    longitude: null
  };

  componentDidMount() {
    console.log(data);
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

// <TileLayer {...this.state} />
