"use strict";
import React from 'react';
import connectToStores from '../../../node_modules/alt/utils/connectToStores';
import { ProjectStore } from '../../stores/Store.js';
import { ProjectActions, SourceCodeActions } from '../../actions/Actions.js';
import { IndependentPanel } from './independentpanel.jsx';
import TreeView from 'react-treeview';

@connectToStores class Project extends React.Component {
  constructor( props ) {
    super( props );
    ProjectActions.loadProject( { root: this.props.root, url: this.props.url } );
  }

  static getStores() {
    return [ ProjectStore ];
  }

  static getPropsFromStores() {
    return ProjectStore.getState();
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
      )
    }

    if( src.type === "directory" )
      return (
        <TreeView nodeLabel={src.name} defaultCollapsed={false} key={key} >
          {src.children.map( (newsrc, key) => { return this.generatePath(newsrc, key) } )}
        </TreeView>
      );

  }

  render() {

    if( this.props.source ) {

      let files = this.generatePath( this.props.source, 0 );

      return (
        <IndependentPanel {...this.props} header="Project" expanded={this.props.expanded} >
          <TreeView nodeLabel={this.props.name} defaultCollapsed={false} >
            {files}
          </TreeView>
        </IndependentPanel>
      )
    }
    else {
      return (<div>Loading</div>)
    }


  }
}

export { Project }
