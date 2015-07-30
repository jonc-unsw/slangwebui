import React from 'react';
import cytoscape from 'cytoscape';

import { DDBActions, SourceCodeActions } from '../actions/Actions.js';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      json: undefined,
      timeout: undefined,
      edges: new Set()
    };
  }
  
  componentDidMount() {
    $( React.findDOMNode(this) ).cytoscape({
      //boxSelectionEnabled: true,
      //selectionType: 'additive',
      style: cytoscape.stylesheet()
        .selector('node')
          .css({
            'content': 'data(id)',
            'text-valign': 'center',
            'color': 'data(color)',
            'background-color': '#428bca',
            'text-outline-width': 1,
            'text-outline-color': '#888'
          })
        .selector('$node > node')
          .css({
            'content': 'data(id)',
            'text-valign': 'center',
            'color': 'data(color)',
            'background-color': '#f5f5f5',
            'border-color': 'black',
            'border-width': 2,
            'text-outline-width': 2,
            'text-outline-color': '#888'
          })
        .selector('edge')
          .css({
            'target-arrow-shape': 'triangle',
            'line-color': 'data(color)',
            'source-arrow-color': 'data(color)',
            'target-arrow-color': 'data(color)',
            'curve-style': 'haystack',
            /*'content' : 'data(label)',*/
            'width': 'mapData(weight, 0, 6400, 1, 10)',
          })
        .selector(':selected')
          .css({
            'background-color': 'black',
            'line-color': 'black',
            'target-arrow-color': 'black',
            'source-arrow-color': 'black'
          })
        .selector('.faded')
          .css({
            'opacity': 0.25,
            'text-opacity': 0
          }),
      
      layout: {
          name: 'dagre',
          nodeSep: undefined, 
          edgeSep: undefined, 
          rankSep: undefined, 
          rankDir: undefined, 
          minLen: function( edge ){ return 1; }, 
          edgeWeight: function( edge ){ return 1; }, 
          
          fit: true, 
          padding: 30, 
          animate: false, 
          animationDuration: 500, 
          boundingBox: undefined, 
          ready: function(){}, 
          stop: function(){} 
      },
      ready: function(){
        //cy.on('tap', 'node', (e) => self.handleClick(e) );
      }
    });
    var cy = $('#cy').cytoscape('get');
    $.get("projects/fib/graph.json", (result) => {
        console.log(result);
        this.setState({json: result});
        cy.load(result);
    });
    cy.on( 'select', 'node', (n) => this.handleSelectNode(n) );
    cy.on( 'unselect', 'node', (n) => this.handleUnSelectNode(n) );
    cy.on( 'select', 'edge', (e) => this.handleSelectEdge(e) );
    cy.on( 'unselect', 'edge', (e) => this.handleUnSelectEdge(e) );
    
    // TODO this is letting cytoscape handle custom function calls itself
    var ddbedges = cy.collection();
    cytoscape('core', 'toggleddb', function( fn ){
      var edges = cy.elements('edge[ddb]')

      if( ddbedges.removed() ) {
        ddbedges.restore();
        // Reset so it still works when we click Reset
        ddbedges = cy.collection();
      }
      else {
        ddbedges = cy.remove( edges );
      }

      return this; // chainability
    });

    var cfedges = cy.collection();
    cytoscape('core', 'togglecontrolflow', function( fn ){
      var edges = cy.elements('edge[^ddb]')

      if( cfedges.removed() ) {
        cfedges.restore();
        // Reset so it still works when we click Reset
        cfedges = cy.collection();
      }
      else {
        cfedges = cy.remove( edges );
      }
      return this; // chainability
    });
    var self = this;
    cytoscape('core', 'reloadJson', function( ){
      ddbedges.restore();
      cfedges.restore();
      return this; // chainability
    });

    // Since react-layout-pane uses relative we need to manually find the size...
    // TODO find a better way to do this
    window.addEventListener("resize", this.handleResize);

    this.handleResize();
  }

  handleResize = () => {
    //$(React.findDOMNode(this)).height($(React.findDOMNode(this)).parent().height() );

    // TODO fix this. Since putting the graph in the tabpane we need to got up the DOM
    // find a better way to do this
    $(React.findDOMNode(this)).height($(React.findDOMNode(this)).closest( ".Flex" ).height() - 100 );
    $(React.findDOMNode(this)).cytoscape('get').resize();
  }

  handleSelectEdge(e) {
    var edge = e.cyTarget; 
    if( edge.data("ddb") !== undefined ) {
      DDBActions.updateCurrentDdb( edge.data("ddb") );
      let source = edge.source();
      let target = edge.target();
      let line0 = source.data("line");
      let line1 = target.data("line");
      let file  = source.data("file");
      SourceCodeActions.highlightLine( {file: file, line: [line0, line1]} );
    }
    else {
      DDBActions.updateCurrentDdb( undefined );
    }
  }

  handleUnSelectEdge(e) {
    DDBActions.updateCurrentDdb( undefined );
    SourceCodeActions.highlightLine( {file: undefined, line: undefined} );
  }
  
  handleSelectNode(n) {
    let node = n.cyTarget; 
    DDBActions.updateCurrentDdb( undefined );
    let file = node.data("file");
    let line = node.data("line");
    SourceCodeActions.highlightLine( {file: file, line: line} );
  }

  handleUnSelectNode(e) {
    DDBActions.updateCurrentDdb( undefined );
    SourceCodeActions.highlightLine( {file: undefined, line: undefined} );
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <div id="cy" />
    )
  }
}

export { Graph }
