import React from "react";
import { GraphActions } from "../../actions/Actions.js";
import { Input } from "react-bootstrap";
import { IndependentPanel } from "./independentpanel.jsx";
import TreeView from "react-treeview";
import perf from "react-perf-component";

class Features extends React.Component {
  constructor( props ) {
    super( props );
  }

  shouldComponentUpdate( nextProps, _nextState) {
    if( this.props.optimisations === nextProps.optimisations )
      return false;
    return true;
  }

  handleChange = ( e ) => {
    GraphActions.selectOptimisation( e.target.getAttribute( "data-id" ) );
  }

  render() {
    let features = this.props.optimisations.map( ( v, k ) => {
      const label = <Input groupClassName="featureslabel" checked={v.get("checked")} type='checkbox'
                           label={v.get("title")} data-id={v.get("id")} onChange={this.handleChange} />;
      return (
        <TreeView nodeLabel={label} defaultCollapsed={false} key={k} >
          <div className="featuresmessage" >{v.get("message")}</div>
        </TreeView>
      );
    } ).toList(); // Remove toList when react 0.14 is released. react 0.13 doesnt like maps...

    return (
      <IndependentPanel {...this.props} header="Features" expanded={this.props.expanded} >
        {features}
      </IndependentPanel>
    );

  }
}

export { Features };
