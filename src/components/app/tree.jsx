import React from "react";

class Tree extends React.Component {
  constructor( props ) {
    super( props );
  }

  componentDidMount() {
    $( React.findDOMNode( this ) ).cytoscape( {
      //boxSelectionEnabled: true,
      //selectionType: 'additive',
      style: cytoscape.stylesheet()
        .selector( "node" )
        .css( {
          "content": "data(id)",
          "text-valign": "center",
          //'color': 'data(color)',
          "background-color": "#428bca",
          "text-outline-width": 1,
          "text-outline-color": "#888"
        } )
        .selector( "$node > node" )
        .css( {
          "content": "data(id)",
          "text-valign": "center",
          //'color': 'data(color)',
          "background-color": "#f5f5f5",
          "border-color": "black",
          "border-width": 2,
          "text-outline-width": 2,
          "text-outline-color": "#888"
        } )
        .selector( "edge" )
        .css( {
          "target-arrow-shape": "triangle",
          //'line-color': 'data(color)',
          //'source-arrow-color': 'data(color)',
          //'target-arrow-color': 'data(color)',
          "curve-style": "haystack",
          /*'content' : 'data(label)',*/
          //'width': 'mapData(weight, 0, 6400, 1, 10)',
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
        name: "breadthfirst",

        fit: true, // whether to fit the viewport to the graph
        directed: true, // whether the tree is directed downwards (or edges can point in any direction if false)
        padding: 30, // padding on fit
        circle: false, // put depths in concentric circles if true, put depths top down if false
        spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        roots: undefined, // the roots of the trees
        maximalAdjustments: 0, // how many times to try to position the nodes in a maximal way (i.e. no backtracking)
        animate: false, // whether to transition the node positions
        animationDuration: 500, // duration of animation in ms if enabled
        ready: undefined, // callback on layoutready
        stop: undefined // callback on layoutstop
      },
      ready: function() {
        //cy1.on('tap', 'node', (e) => self.handleClick(e) );
      }
    } );
    var cy1 = $( "#cy1" ).cytoscape( "get" );
    $.get( "projects/fib/tree.json", ( result ) => {
      cy1.load( result );
    } );

    // Since react-layout-pane uses relative we need to manually find the size...
    // TODO find a better way to do this
    window.addEventListener( "resize", this.handleResize );

    this.handleResize();

    $( "a" ).on( "shown.bs.tab", function( e ) {
      //e.target // newly activated tab
      //e.relatedTarget // previous active tab
    } );
  }

  handleResize = () => {
    //$(React.findDOMNode(this)).height($(React.findDOMNode(this)).parent().height() );

    // TODO fix this. Since putting the graph in the tabpane we need to got up the DOM
    // find a better way to do this
    $( React.findDOMNode( this ) ).height( $( React.findDOMNode( this ) ).closest( ".Flex" ).height() - 100 );
    $( "#cy1" ).cytoscape( "get" ).resize();
  }

  shouldComponentUpdate( nextProps, nextState ) {
    return false;
  }

  render() {
    return (
      <div id="cy1" >
      </div>
    );
  }
}

export { Tree };
