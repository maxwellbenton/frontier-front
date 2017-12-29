import "./styles/App.css";
import "./styles/tilemap.css";

import React, { Component } from "react";
import Map from "./Map";
import { connect } from "react-redux";
import { getLocation } from "./actions";
import TileLayer from "./TileLayer";

class App extends Component {
  componentDidMount() {
    this.props.getLocation();
  }

  render() {
    return (
      <div id="tile-map-container">
        <Map />
        <TileLayer />
      </div>
    );
  }
}

export default connect(null, { getLocation })(App);
// <TileLayer />
