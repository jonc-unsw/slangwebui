import React from 'react';
import { IndependentPanel } from './independentpanel.jsx';
import TreeView from 'react-treeview';

class Project extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      path: undefined
    };
  }
  
  componentDidMount() {
    $.get("path.json", (data) => {
      console.log(data);
      this.setState( {path: data} );
    });
  }

  rec = ( path ) => {
    path.children && path.children.forEach( this.rec );
    return <div>{path.name}</div>
  }

  render() {

    return (
      <IndependentPanel {...this.props} header="Project" expanded={true}>
        <TreeView nodeLabel={"Project Foo"} defaultCollapsed={false}>
          <TreeView nodeLabel={"src"} defaultCollapsed={false}>
              <div><a href="#" className="info">main.c</a></div>
              <div><a href="#" className="info">foo.c</a></div>
          </TreeView>
        </TreeView>
      </IndependentPanel>
    )
  }
}

export { Project }
