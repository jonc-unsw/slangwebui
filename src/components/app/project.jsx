"use strict";
import React from "react";
import { SourceCodeActions } from "../../actions/Actions.js";
import { IndependentPanel } from "./independentpanel.jsx";
import TreeView from "react-treeview";

class Project extends React.Component {
  constructor( props ) {
    super( props );
  }

  shouldComponentUpdate( nextProps, _nextState) {
    if( this.props.source === nextProps.source )
      return false;
    return true;
  }

  handleClick = ( source ) => {
    SourceCodeActions.loadSource( { file: source } );
  }

  /*
  * Recursively generate the file/dirs for the project panel
  * */
  generatePath( src, key ) {
    if( src.type === "file" ) {
      return (
        <div key={key}>
          <a href="#" className="info" onClick={ () => this.handleClick( src.path ) } >{src.name}</a>
        </div>
      );
    }

    if( src.type === "directory" )
      return (
        <TreeView nodeLabel={src.name} defaultCollapsed={false} key={key} >
          {src.children.map( (newsrc, key) => { return this.generatePath(newsrc, key); } )}
        </TreeView>
      );

  }

  render() {

    let files = this.props.source && this.generatePath( this.props.source, 0 );

    return (
      <IndependentPanel {...this.props} header="Project" expanded={this.props.expanded} >
        <TreeView nodeLabel={this.props.name} defaultCollapsed={false} >
          {files}
        </TreeView>
      </IndependentPanel>
    );
  }
}

export { Project };
