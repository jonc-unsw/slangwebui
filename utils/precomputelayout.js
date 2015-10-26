// Usage node precomputelayout.js infile > outfile

var cytoscape = require('cytoscape');
var cydagre = require('cytoscape-dagre');
var dagre = require('dagre');

cydagre( cytoscape, dagre );

var graphfile = process.argv[2];
var json = require("./"+graphfile);

var cy = cytoscape({
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
  elements: JSON.parse(JSON.stringify(json)),
  ready: function(){ 
    json.nodes = JSON.parse( JSON.stringify( this.json().elements.nodes) );
    console.log( JSON.stringify( json, null, 2 ) );
    //console.log( JSON.stringify( this.json().elements.nodes, null, 2 ) );
  }
});
