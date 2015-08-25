import React from 'react';
import Immutable from 'immutable';

//import cytoscape from 'cytoscape';
import connectToStores from 'alt/utils/connectToStores';
import { GraphStore } from '../stores/Store.js';
import { DDBActions, GraphActions, SourceCodeActions } from '../actions/Actions.js';

const DEFAULT_NODE_COLOR = "#428bca";
const HIGHLIGHTED_NODE_COLOR = "#ff0000";
const HIGHLIGHTED_NODE_COLOR_PRIORITY = [ "#00ff00", "#ff00ff", "#ffff00", "#00ffff" ];


@connectToStores class Graph extends React.Component {
  constructor( props ) {
    super( props );

    this.featured = {}; // Just store the css properties that we want to change for each node/edge
                        // TODO move this into a store...
    this.ready = false;
  }

  static getStores() {
    return [ GraphStore ];
  }

  static getPropsFromStores() {
    return GraphStore.getState();
  }

  componentWillReceiveProps( nextProps ) {

    // We are not ready yet.
    if( this.props.graph === undefined )
      return;

    this.props.graph.startBatch();

    // this.props is the original state and nextProps is the incomming state.
    // This means that if we have some already highlighted optimisations we need to add or remove the highlights of the
    // difference between the two sets

    // To add
    if( this.props.selected.size < nextProps.selected.size ) {
      let optimisations = nextProps.selected.subtract( this.props.selected );

      for( let o of optimisations ) {
        let optimisation = nextProps.json.optimisations[ o ];

        let query = "";

        for( let v of optimisation.data.nodes ) {
          query += 'node[id = "' + v + '" ] , ';
        }
        query = query.substring( 0, query.length - 2 );

        let nodes = this.props.graph.filter( query );

        if( this.featured[ optimisation.id ] === undefined ) {
          this.featured[ optimisation.id ] = {};
          this.featured[ optimisation.id ][ "nodes" ] = {};
          this.featured[ optimisation.id ][ "edges" ] = {};
        }

        nodes.forEach( ( ele, i, eles ) => {
          // Backup the current color
          this.featured[ optimisation.id ][ "nodes" ][ ele.id() ] = ele.css( 'background-color' );

          // Apply new color
          ele.css( 'background-color', HIGHLIGHTED_NODE_COLOR_PRIORITY[ optimisation.priority ] );

          ele.qtip( {
            content: {
              title: optimisation.title,
              text: "Priority: " + optimisation.priority + "<br>" + optimisation.message
            },
            position: {
              my: 'top center',
              at: 'bottom center'
            },
            show: {
              event: 'mouseover'
            },
            hide: {
              event: 'mouseout'
            },
            style: {
              classes: 'qtip-bootstrap',
              tip: {
                width: 16,
                height: 8
              }
            }
          } );

        } );

        // Highlight the edges which are connected by each node in the collection
        let edges = nodes.edgesWith( nodes );

        edges.forEach( ( ele, i, eles ) => {
          this.featured[ optimisation.id ][ "edges" ][ ele.id() ] = ele.css( 'line-color' );
          ele.css( 'line-color', HIGHLIGHTED_NODE_COLOR_PRIORITY[ optimisation.priority ] );
        } );

      }

    }
    // To remove
    else {
      let optimisations = this.props.selected.subtract( nextProps.selected );

      for( let o of optimisations ) {
        let optimisation = nextProps.json.optimisations[ o ];

        // We still need to query the graph to find which nodes to unhighlight.
        // Originally I thought to remove the clone the nodes then delete/restore but that breaks the graph...
        let query = "";

        for( let v of optimisation.data.nodes ) {
          query += 'node[id = "' + v + '" ] , ';
        }
        query = query.substring( 0, query.length - 2 );

        let nodes = this.props.graph.filter( query );

        nodes.forEach( ( ele, i, eles ) => {
          ele.css( 'background-color', this.featured[ optimisation.id ][ "nodes" ][ ele.id() ] );
          ele.qtip( 'api' ).destroy( true );
        } );

        let edges = nodes.edgesWith( nodes );

        edges.forEach( ( ele, i, eles ) => {
          ele.css( 'line-color', this.featured[ optimisation.id ][ "edges" ][ ele.id() ] );
        } );

        this.featured[ optimisation.id ] = undefined;
      }

    }

    this.props.graph.endBatch();

  }

  componentDidMount() {
    //$( React.findDOMNode(this) ).cytoscape({
    //boxSelectionEnabled: true,
    //selectionType: 'additive',
    var cy = window.cy = cytoscape( {
      container: document.getElementById( "cy" ),
      style: cytoscape.stylesheet()
        .selector( 'node' )
        .css( {
          'content': 'data(id)',
          'text-valign': 'center',
          'color': 'data(color)',
          'background-color': DEFAULT_NODE_COLOR,
          'text-outline-width': 1,
          'text-outline-color': '#888'
        } )
        .selector( '$node > node' )
        .css( {
          'content': 'data(id)',
          'text-valign': 'center',
          'color': 'data(color)',
          'background-color': '#f5f5f5',
          'border-color': 'black',
          'border-width': 2,
          'text-outline-width': 2,
          'text-outline-color': '#888'
        } )
        .selector( 'edge' )
        .css( {
          'target-arrow-shape': 'triangle',
          'line-color': 'data(color)',
          'source-arrow-color': 'data(color)',
          'target-arrow-color': 'data(color)',
          'curve-style': 'haystack',
          /*'content' : 'data(label)',*/
          'width': 'mapData(weight, 0, 6400, 1, 10)',
        } )
        .selector( ':selected' )
        .css( {
          'background-color': 'black',
          'line-color': 'black',
          'target-arrow-color': 'black',
          'source-arrow-color': 'black'
        } )
        .selector( '.faded' )
        .css( {
          'opacity': 0.25,
          'text-opacity': 0
        } ),

      layout: {
        name: 'dagre',
        nodeSep: undefined,
        edgeSep: undefined,
        rankSep: undefined,
        rankDir: undefined,
        minLen: function( edge ) {
          return 1;
        },
        edgeWeight: function( edge ) {
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
        //cy.on('tap', 'node', (e) => self.handleClick(e) );
      }
    } );

    GraphActions.storeGraph( cy );

    //var cy = $('#cy').cytoscape('get');
    $.get( "/projects/fib/graph.json", ( result ) => {
      this.setState( { json: result } );
      cy.load( result );
    } );
    cy.on( 'select', 'node', ( n ) => this.handleSelectNode( n ) );
    cy.on( 'unselect', 'node', ( n ) => this.handleUnSelectNode( n ) );
    cy.on( 'select', 'edge', ( e ) => this.handleSelectEdge( e ) );
    cy.on( 'unselect', 'edge', ( e ) => this.handleUnSelectEdge( e ) );

    // TODO this is letting cytoscape handle custom function calls itself
    var ddbedges = cy.collection();
    cytoscape( 'core', 'toggleddb', function( fn ) {
      var edges = cy.elements( 'edge[ddb]' )

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
    cytoscape( 'core', 'togglecontrolflow', function( fn ) {
      var edges = cy.elements( 'edge[^ddb]' )

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
    var self = this;
    cytoscape( 'core', 'reloadJson', function() {
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
    $( React.findDOMNode( this ) ).cytoscape( 'get' ).resize();
  }

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

  handleUnSelectEdge( e ) {
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
        my: 'top center',
        at: 'bottom center',
        effect: false
      },
      hide: {
        //fixed: true,
        //event: false,
        //inactive: 2000,
        event: 'click',
        effect: true
      },
      style: {
        classes: 'qtip-bootstrap'
      }
    } );

  }

  handleUnSelectNode( e ) {
    DDBActions.updateCurrentDdb( undefined );
    SourceCodeActions.highlightLine( { file: undefined, line: undefined } );
  }

  shouldComponentUpdate( nextProps, nextState ) {
    return false;
  }

  render() {
    return (
      <div id="cy" >
        <div id="box" ></div>
      </div>
    )
  }
}

export { Graph }
