import React from "react";
import { GraphActions } from "../../actions/Actions.js";
import { Input } from "react-bootstrap";
import { IndependentPanel } from "./independentpanel.jsx";
import TreeView from "react-treeview";

class Features extends React.Component {
  constructor( props ) {
    super( props );
  }

  handleChange = ( e ) => {
    GraphActions.selectOptimisation( e.target.getAttribute( "data-id" ) );
  }

  render() {
    let features = this.props.optimisations ? (
      <form>
        {
          this.props.optimisations.map( ( v, k ) => {
            const label = <Input groupClassName="featureslabel" checked={v.checked} type='checkbox'
                                 label={v.title} data-id={v.id} onChange={this.handleChange} />;

            return (
              <TreeView nodeLabel={label} defaultCollapsed={false} key={k} >
                <div className="featuresmessage" >{v.message}</div>
              </TreeView>
            );
          } )
        }
      </form>
    ) : (<div>There are no features for this project</div>);

    return (
      <IndependentPanel {...this.props} header="Features" expanded={this.props.expanded} >
        {features}
      </IndependentPanel>
    );

  }
}

export { Features };
