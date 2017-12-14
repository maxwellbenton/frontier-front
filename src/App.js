import React, { Component } from "react";
import Map from "./Map";
import "./App.css";
import { connect } from "react-redux";
import { getLocation } from "./actions";

class App extends Component {
  state = {
    latitude: null,
    longitude: null
  };

  componentDidMount() {
    this.props.getLocation();
  }

  render() {
    return (
      <div style={{ width: "100vw", height: "100vh", backgroundColor: "blue" }}>
        <Map {...this.state} />
      </div>
    );
  }
}

export default connect(null, { getLocation })(App);
