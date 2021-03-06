import "./styles/App.css";
import "./styles/tilemap.css";

import React, { Component } from "react";
import Map from "./Map";
import { connect } from "react-redux";
import { getLocation } from "./actions";
import TileLayer from "./TileLayer";
import IDBAdapter from "./adapters/idb.js";
class App extends Component {
  componentDidMount() {
    this.props.getLocation();
  }

  render() {
    console.log("tile height", this.props.tileHeight);
    return (
      <div id="tile-map-container">
        <Map />
        {this.props.tileHeight !== null ? <TileLayer /> : null}
        <div id="loading-screen" />
      </div>
    );
  }
}

const mapStateToProps = ({ tileData, location }) => ({ ...tileData, location });

export default connect(mapStateToProps, { getLocation })(App);
