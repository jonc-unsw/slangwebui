import React from "react";
//import $ from "jquery";

import cytoscape from "cytoscape";
import "cytoscape-qtip/cytoscape-qtip.js";

import { DDBActions, GraphActions, SourceCodeActions } from "../../actions/Actions.js";

const DEFAULT_NODE_COLOR = "#428bca";
//const HIGHLIGHTED_NODE_COLOR = "#ff0000";
const HIGHLIGHTED_NODE_COLOR_PRIORITY = [ "#00ff00", "#ff00ff", "#ffff00", "#00ffff" ];

class Graph extends React.Component {
  constructor( props ) {
    super( props );
  }

  componentWillReceiveProps( nextProps ) {
    // We are not ready yet. Hack
    if( this.props.graph === undefined )
      return;

    // Batch things to make it faster
    this.props.graph.startBatch();

    // This clears the graph of custom styles. It would be better to only remove the ones we are changing but it gets
    // complicated when we need to remove a highlighted node which is part of another optimisation which should be
    // highlighted
    this.props.graph.elements().removeStyle();

    for( let v of nextProps.selected ) {
      let optimisation = this.props.optimisations.get(v);

      let query = "";
      for( let n of optimisation.getIn(["data", "nodes"]) ){
        query += `node[id = "${n}" ], `;
      }
      query = query.substring( 0, query.length - 2 );

      let nodes = this.props.graph.filter( query );

      nodes.forEach( ( ele, _i, _eles ) => {

        // Apply new color
        ele.css( "background-color", HIGHLIGHTED_NODE_COLOR_PRIORITY[ optimisation.get("priority") ] );

        ele.qtip( {
          content: {
            title: optimisation.get("title"),
            text: "Priority: " + optimisation.get("priority") + "<br>" + optimisation.get("message")
          },
          position: {
            my: "top center",
            at: "bottom center"
          },
          show: {
            event: "mouseover"
          },
          hide: {
            event: "mouseout"
          },
          style: {
            classes: "qtip-bootstrap",
            tip: {
              width: 16,
              height: 8
            }
          }
        } );
      } );

      // Highlight the edges which are connected by each node in the collection
      let edges = nodes.edgesWith( nodes );

      edges.forEach( ( ele, _i, _eles ) => {
        ele.css( "line-color", HIGHLIGHTED_NODE_COLOR_PRIORITY[ optimisation.get("priority") ] );
      } );

    }

    this.props.graph.endBatch();

  }

  componentDidMount() {
    //$( React.findDOMNode(this) ).cytoscape({
    //boxSelectionEnabled: true,
    //selectionType: "additive",
    var cy = window.cy = cytoscape( {
      container: document.getElementById( "cy" ),
      style: cytoscape.stylesheet()
        .selector( "node" )
        .css( {
          "content": "data(id)",
          "text-valign": "center",
          "color": "data(color)",
          "background-color": DEFAULT_NODE_COLOR,
          "text-outline-width": 1,
          "text-outline-color": "#888"
        } )
        .selector( "$node > node" )
        .css( {
          "content": "data(id)",
          "text-valign": "center",
          "color": "data(color)",
          "background-color": "#f5f5f5",
          "border-color": "black",
          "border-width": 2,
          "text-outline-width": 2,
          "text-outline-color": "#888"
        } )
        .selector( "edge" )
        .css( {
          "target-arrow-shape": "triangle",
          "line-color": "data(color)",
          "source-arrow-color": "data(color)",
          "target-arrow-color": "data(color)",
          "curve-style": "haystack",
          /*"content" : "data(label)",*/
          "width": "mapData(weight, 0, 6400, 1, 10)"
        } )
        .selector( ":selected" )
        .css( {
          "background-color": "black",
          "line-color": "black",
          "target-arrow-color": "black",
          "source-arrow-color": "black"
        } )
        .selector( ".faded" )
        .css( {
          "opacity": 0.25,
          "text-opacity": 0
        } ),

      layout: {
        name: "dagre",
        nodeSep: undefined,
        edgeSep: undefined,
        rankSep: undefined,
        rankDir: undefined,
        minLen: function( _edge ) {
          return 1;
        },
        edgeWeight: function( _edge ) {
          return 1;
        },

        fit: true,
        padding: 30,
        animate: false,
        animationDuration: 500,
        boundingBox: undefined,
        ready: function() {
        },
        stop: function() {
        }
      },
      ready: function() {
        //cy.on("tap", "node", (e) => self.handleClick(e) );
      }
    } );

    GraphActions.storeGraph( cy );

    //var cy = $("#cy").cytoscape("get");
    $.get( `${this.props.root}/${this.props.url}`, ( result ) => {
      this.setState( { json: result } );
      cy.load( result );
    } );
    cy.on( "select", "node", ( n ) => this.handleSelectNode( n ) );
    cy.on( "unselect", "node", ( n ) => this.handleUnSelectNode( n ) );
    cy.on( "select", "edge", ( e ) => this.handleSelectEdge( e ) );
    cy.on( "unselect", "edge", ( e ) => this.handleUnSelectEdge( e ) );

    // TODO this is letting cytoscape handle custom function calls itself
    var ddbedges = cy.collection();
    cytoscape( "core", "toggleddb", function( _fn ) {
      var edges = cy.elements( "edge[ddb]" );

      if( ddbedges.removed() ) {
        ddbedges.restore();
        // Reset so it still works when we click Reset
        ddbedges = cy.collection();
      }
      else {
        ddbedges = cy.remove( edges );
      }

      return this; // chainability
    } );

    var cfedges = cy.collection();
    cytoscape( "core", "togglecontrolflow", function( _fn ) {
      var edges = cy.elements( "edge[^ddb]" );

      if( cfedges.removed() ) {
        cfedges.restore();
        // Reset so it still works when we click Reset
        cfedges = cy.collection();
      }
      else {
        cfedges = cy.remove( edges );
      }
      return this; // chainability
    } );

    cytoscape( "core", "reloadJson", function() {
      ddbedges.restore();
      cfedges.restore();
      return this; // chainability
    } );

    // Since react-layout-pane uses relative we need to manually find the size...
    // TODO find a better way to do this
    window.addEventListener( "resize", this.handleResize );

    this.handleResize();
  }

  handleResize = () => {
    //$(React.findDOMNode(this)).height($(React.findDOMNode(this)).parent().height() );

    // TODO fix this. Since putting the graph in the tabpane we need to got up the DOM
    // find a better way to do this
    $( React.findDOMNode( this ) ).height( $( React.findDOMNode( this ) ).closest( ".Flex" ).height() - 100 );
    $( React.findDOMNode( this ) ).cytoscape( "get" ).resize();
  };

  handleSelectEdge( e ) {
    var edge = e.cyTarget;
    if( edge.data( "ddb" ) !== undefined ) {
      DDBActions.updateCurrentDdb( edge.data( "ddb" ) );
      let source = edge.source();
      let target = edge.target();
      let line0 = source.data( "line" );
      let line1 = target.data( "line" );
      let file = source.data( "file" );
      SourceCodeActions.highlightLine( { file: file, line: [ line0, line1 ] } );
    }
    else {
      DDBActions.updateCurrentDdb( undefined );
    }
  }

  handleUnSelectEdge( _e ) {
    DDBActions.updateCurrentDdb( undefined );
    SourceCodeActions.highlightLine( { file: undefined, line: undefined } );
  }

  handleSelectNode( n ) {
    let node = n.cyTarget;
    DDBActions.updateCurrentDdb( undefined );
    let file = node.data( "file" );
    let line = node.data( "line" );
    SourceCodeActions.highlightLine( { file: file, line: line } );

    if( node.isParent() )
      return;
    node.qtip( {
      content: {
        title: node.id(),
        text: "Degree: " + node.degree(),
        button: true
      },
      show: {
        delay: 0,
        event: false,
        ready: true,
        effect: true
      },
      position: {
        my: "top center",
        at: "bottom center",
        effect: false
      },
      hide: {
        //fixed: true,
        //event: false,
        //inactive: 2000,
        event: "click",
        effect: true
      },
      style: {
        classes: "qtip-bootstrap"
      }
    } );

  }

  handleUnSelectNode( _e ) {
    DDBActions.updateCurrentDdb( undefined );
    SourceCodeActions.highlightLine( { file: undefined, line: undefined } );
  }

  shouldComponentUpdate( _nextProps, _nextState ) {
    // Just return false since the graph is updated via normal js and we dont need to update the html
    return false;
  }

  componentWillUnmount() {
    // Cleanup graph
    if( this.props.graph ) {
      this.props.graph.destroy();
    }
  }

  render() {
    return (
      <div id="cy" >
        <div id="box" ></div>
      </div>
    );
  }
}

export { Graph };
