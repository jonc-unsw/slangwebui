import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { ProjectStore } from '../stores/Store.js';
import { ProjectActions, SourceCodeActions } from '../actions/Actions.js';
import { IndependentPanel } from './independentpanel.jsx';
import TreeView from 'react-treeview';

@connectToStores class Project extends React.Component {
  constructor( props ) {
    super( props );
    ProjectActions.loadProject( this.props.project );
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

  render() {
    return (
      <IndependentPanel {...this.props} header="Project" expanded={this.props.expanded} >
        <TreeView nodeLabel={"Project Fib"} defaultCollapsed={false} >
          <TreeView nodeLabel={"src"} defaultCollapsed={false} >
            <div><a href="#" className="info" onClick={ () => this.handleClick("src/fac.c") } >fac.c</a>
            </div>
            <div><a href="#" className="info" onClick={ () => this.handleClick("src/fac.h") } >fac.h</a>
            </div>
            <div><a href="#" className="info" onClick={ () => this.handleClick("src/fib.c") } >fib.c</a>
            </div>
            <div><a href="#" className="info" onClick={ () => this.handleClick("src/fib.h") } >fib.h</a>
            </div>
            <div><a href="#" className="info" onClick={ () => this.handleClick("src/main.c") } >main.c</a>
            </div>
          </TreeView>
        </TreeView>
      </IndependentPanel>
    )
  }
}

export { Project }
