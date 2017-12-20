import React, { Component } from "react";

import Map from "./Map";
import "./App.css";
import { connect } from "react-redux";
import { getLocation } from "./actions";
import TileLayer from "./TileLayer";
import "./App.css";
// import data from "./data";
import "./hexmap.css";

class App extends Component {
  componentDidMount() {
    this.props.getLocation();
  }

  render() {
    return (
      <div id="tile-map-container" style={{ height: "100vh", width: "100vw" }}>
        <Map />
        <TileLayer />
      </div>
    );
  }
}

export default connect(null, { getLocation })(App);
// <TileLayer />
