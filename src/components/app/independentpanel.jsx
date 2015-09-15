import React from 'react';

import { Panel } from 'react-bootstrap';

class IndependentPanel extends React.Component {
  constructor( props ) {
    super( props );
    this.state = { expanded: this.props.expanded }
  }

  componentWillReceiveProps( nextProps ) {
    this.setState( {
      expanded: nextProps.expanded
    } );
  }

  render() {
    return (
      <Panel {...this.props}
        collapsable={true}
        expanded={this.state.expanded}
        onSelect={this._toggleExpand}
        >
        {this.props.children}
      </Panel>
    )
  }

  _toggleExpand = () => {
    this.setState( { expanded: !this.state.expanded } );
  }
}

export { IndependentPanel }
