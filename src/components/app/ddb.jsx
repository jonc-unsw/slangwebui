import React from "react";
import { IndependentPanel } from "./independentpanel.jsx";

class DataDependenceBlocks extends React.Component {
  constructor( props ) {
    super( props );
  }

  shouldComponentUpdate( nextProps, _nextState) {
    if( this.props.ddbid === nextProps.ddbid )
      return false;
    return true;
  }

  render() {

    let ddb = this.props.ddbdata && this.props.ddbdata[ this.props.ddbid ];

    let ddbblock = ddb ?
      <ul>{Object.keys( ddb ).map( ( k, v ) => { return ( <li key={v} >{k} {ddb[ k ]}</li> ); } )}</ul> :
      <div>Nothing selected</div>;

    return (
      <IndependentPanel {...this.props} header="Data Dependence Blocks" expanded={this.props.expanded} >
        {ddbblock}
      </IndependentPanel>
    );
  }


}

export { DataDependenceBlocks };
