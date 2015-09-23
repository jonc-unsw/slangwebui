"use strict";
import React from "react";

class Index extends React.Component {
  render () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export { Index };