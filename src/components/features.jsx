import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { FeaturesStore } from '../stores/Store.js';
import { FeaturesActions } from '../actions/Actions.js';
import { Input } from 'react-bootstrap';
import { IndependentPanel } from './independentpanel.jsx';
import TreeView from 'react-treeview';

@connectToStores class Features extends React.Component {
  constructor( props ) {
    super( props );
    FeaturesActions.loadFeatures( "./projects/fib/features.json" );
  }

  static getStores() {
    return [ FeaturesStore ];
  }

  static getPropsFromStores() {
    return FeaturesStore.getState();
  }

  componentDidMount() {
  }

  handleChange = ( e ) => {
    FeaturesActions.selectOptimisation( e.target.getAttribute( 'data-id' ) );
  }

  render() {
    return (
      <IndependentPanel {...this.props} header="Features" expanded={this.props.expanded} >
        <form>
          {
            this.props.optimisations.map( ( v, k ) => {
              const label = <Input groupClassName="featureslabel" checked={v.checked} type='checkbox'
                                   label={v.title} key={k} data-id={v.id} onChange={this.handleChange} />;

              return (
                <TreeView nodeLabel={label} defaultCollapsed={false} >
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
