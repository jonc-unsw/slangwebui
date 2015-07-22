import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { ProjectStore } from '../stores/Store.js';
import { ProjectActions } from '../actions/Actions.js';
import { IndependentPanel } from './independentpanel.jsx';
import TreeView from 'react-treeview';

@connectToStores
class Project extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      path: undefined
    };
  }
  
  static getStores() {
    return [ProjectStore];
  }

  static getPropsFromStores() {
    return ProjectStore.getState();
  }
  
  rec = ( path ) => {
    path.children && path.children.forEach( this.rec );
    return <div>{path.name}</div>
  }

  render() {

    return (
      <IndependentPanel {...this.props} header="Project" expanded={this.props.expanded}>
        <TreeView nodeLabel={"Project Foo"} defaultCollapsed={false}>
          <TreeView nodeLabel={"src"} defaultCollapsed={false}>
              <div><a href="#" className="info">main.c</a></div>
          </TreeView>
        </TreeView>
      </IndependentPanel>
    )
  }
}

export { Project }
