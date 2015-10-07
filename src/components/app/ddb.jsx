import React from "react";
import { IndependentPanel } from "./independentpanel.jsx";

class DataDependenceBlocks extends React.Component {
  constructor( props ) {
    super( props );
  }

  render() {

    if( this.props.ddbid !== undefined ) {

      var ddblock = this.props.ddbdata[ this.props.ddbid ];

      return (
        <IndependentPanel {...this.props} header="Data Dependence Blocks"
                                          expanded={this.props.expanded}
          >
          <ul>
            {
              Object.keys( ddblock ).map( ( k, v ) => {
                return ( <li key={v} >{k} {ddblock[ k ]}</li> );
              } )
            }
          </ul>
        </IndependentPanel>
      );
    }
    return (
      <IndependentPanel {...this.props} header="Data Dependence Blocks"
                                        expanded={this.props.expanded}
        >
        <div>Nothing selected</div>
      </IndependentPanel>
    );
  }
}

export { DataDependenceBlocks };
