import React, { Component } from "react";
import logo from "./logo.svg";
import Map from "./Map";
import TileLayer from "./TileLayer";
import "./App.css";
import data from "./data";

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
      <div style={{ width: "100vw", height: "100vh", backgroundColor: "blue" }}>
        <Map {...this.state} />
      </div>
    );
  }
}

export default App;

// <TileLayer {...this.state} />
