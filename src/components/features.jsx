import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { GraphStore } from '../stores/Store.js';
import { GraphActions } from '../actions/Actions.js';
import { Input } from 'react-bootstrap';
import { IndependentPanel } from './independentpanel.jsx';
import TreeView from 'react-treeview';

@connectToStores class Features extends React.Component {
  constructor( props ) {
    super( props );
    GraphActions.loadFeatures( "./projects/fib/features.json" );
  }

  static getStores() {
    return [ GraphStore ];
  }

  static getPropsFromStores() {
    return GraphStore.getState();
  }

  handleChange = ( e ) => {
    GraphActions.selectOptimisation( e.target.getAttribute( 'data-id' ) );
  }

  render() {
    return (
      <IndependentPanel {...this.props} header="Features" expanded={this.props.expanded} >
        <form>
          {
            this.props.optimisations.map( ( v, k ) => {
              const label = <Input groupClassName="featureslabel" checked={v.checked} type='checkbox'
                                   label={v.title} data-id={v.id} onChange={this.handleChange} />;

              return (
                <TreeView nodeLabel={label} defaultCollapsed={false} key={k} >
                  <div className="featuresmessage" >{v.message}</div>
                </TreeView>
              )
            } )
          }
        </form>
      </IndependentPanel>
    )
  }
}

export { Features }
