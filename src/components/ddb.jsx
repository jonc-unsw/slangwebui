import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { DDBStore } from '../stores/Store.js';
import { DDBActions } from '../actions/Actions.js';
import { IndependentPanel } from './independentpanel.jsx';

@connectToStores
class DataDependenceBlocks extends React.Component {
  constructor(props) {
    super(props);
    DDBActions.loadDdb(this.props.url);
  }

  static getStores() {
    return [DDBStore];
  }

  static getPropsFromStores() {
    return DDBStore.getState();
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
              Object.keys(ddblock).map( (k,v) => {
                return ( <li key={v}>{k} {ddblock[k]}</li> )  
              })
            }
          </ul>
        </IndependentPanel>
      )
    }
    return (
      <IndependentPanel {...this.props} header="Data Dependence Blocks" 
        expanded={this.props.expanded}
      >
        <div>Nothing selected</div>
      </IndependentPanel>
    )
  }
}

export { DataDependenceBlocks }
