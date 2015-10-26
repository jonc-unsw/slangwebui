import React from "react";

import { Panel } from "react-bootstrap";

class IndependentPanel extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {
    console.log("ind panel " + this.props.expanded);
    return (
      <Panel {...this.props} collapsable={true}>
        {this.props.children}
      </Panel>
    );
  }

}

export { IndependentPanel };
