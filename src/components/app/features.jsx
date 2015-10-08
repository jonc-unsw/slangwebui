import React from "react";
import { GraphActions } from "../../actions/Actions.js";
import { Input } from "react-bootstrap";
import { IndependentPanel } from "./independentpanel.jsx";
import TreeView from "react-treeview";

class Features extends React.Component {
  constructor( props ) {
    super( props );
  }

  shouldComponentUpdate( nextProps, _nextState) {

    // we want to render if file is undefined as we will render everything...
    if( this.props.file === undefined || nextProps.file === undefined )
      return true;

    if( this.props.file === nextProps.file )
      return false;

    return true;
  }

  handleChange = ( e ) => {
    GraphActions.selectOptimisation( e.target.getAttribute( "data-id" ) );
  }

  render() {
    let features = this.props.optimisations.filter( (v, k) => { return v.get("files").includes( this.props.file ) || this.props.file === undefined; } ).map( ( v, k ) => {
      const label = <Input groupClassName="featureslabel" checked={v.get("checked")} type='checkbox'
                           label={v.get("title")} data-id={k} onChange={this.handleChange} />;

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
