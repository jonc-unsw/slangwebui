import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { FeaturesStore } from '../stores/Store.js';
import { FeaturesActions } from '../actions/Actions.js';
import { Input } from 'react-bootstrap';
import { IndependentPanel } from './independentpanel.jsx';

@connectToStores
class Features extends React.Component {
  constructor(props){
    super(props);
    FeaturesActions.loadFeatures("./projects/fib/features.json");
  }
  
  static getStores() {
    return [FeaturesStore];
  }

  static getPropsFromStores() {
    return FeaturesStore.getState();
  }
  
  componentDidMount() {
  }

  handleChange = (e) => {
    FeaturesActions.selectOptimisation(e.target.getAttribute('data-id'));
  }

  render() {
    return (
      <IndependentPanel {...this.props} header="Features" expanded={this.props.expanded}>
        <form>
        {
          this.props.optimisations.map( (v,k) => {
            return (
              <Input type='checkbox' label={v.title} key={k} data-id={k} onChange={this.handleChange} />
            )
          })
        }
        </form>
      </IndependentPanel>
    )
  }
}

export { Features }
