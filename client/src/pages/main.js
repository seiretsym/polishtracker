import React, { Component } from "react";
import Card from "../components/Card";
import API from "../utils/api";

class Main extends Component {
  render() {
    return (
      <div className="container content">
        <div className="row">
          {/* {this.state.polishes.map(polish => {
            return <Card {...polish} key={polish._id} />
          })} */}
        </div>
      </div>
    )
  };
}

export default Main;