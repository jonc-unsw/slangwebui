import alt from '../alt';

import { BBActions, DDBActions, GraphActions, ProjectActions, SourceCodeActions } from '../actions/Actions.js'

class DDBStore {
  constructor() {
    this.bindActions( DDBActions ); //Bind all the actions like this: myFunc -> onMyFunc

    /*
     * ddbdata: json data of the ddb
     * ddbid: the index into the json to display
     * expanded: if the ddb panel is to be shown or not
     * */
    this.state = {
      ddbdata: undefined,
      ddbid: undefined,
      expanded: true
    };
  }

  onLoadDdb( url ) {
    $.get( url, ( result ) => {
      this.setState( { ddbdata: result } );
    } );
  }

  onUpdateCurrentDdb( id ) {
    this.setState( { ddbid: id } );
  }

  onToggleAccordion() {
    this.setState( { expanded: !this.state.expanded } );
  }
}

class BBStore {
  constructor() {
    this.bindActions( BBActions ); //Bind all the actions like this: myFunc -> onMyFunc

    this.state = {
      bbdata: undefined,
      expanded: true
    };
  }

  onLoadBb( url ) {
    $.get( url, ( result ) => {
      this.setState( { bbdata: result } );
    } );
  }

  onToggleAccordion() {
    this.setState( { expanded: !this.state.expanded } );
  }
}

class ProjectStore {
  constructor() {
    this.bindActions( ProjectActions );

    this.state = {
      path: undefined,
      expanded: true
    };
  }

  onLoadProject( url ) {
    $.get( url, ( result ) => {
      this.setState( { path: result } );
    } );
  }

  onToggleAccordion() {
    this.setState( { expanded: !this.state.expanded } );
  }

}

class SourceCodeStore {
  constructor() {
    this.bindActions( SourceCodeActions );

    this.state = {
      file: undefined,
      line: undefined,
      expanded: true
    };
  }

  onHighlightLine( src ) {
    if( src === undefined )
      this.setState( { file: undefined, line: undefined } );
    this.setState( { file: src.file, line: src.line } );
  }

  onLoadSource( file ) {
    this.setState( { file: file } );
  }

  onToggleAccordion() {
    this.setState( { expanded: !this.state.expanded } );
  }

}

class GraphStore {
  constructor() {
    this.bindActions( GraphActions );

    this.bindListeners( {
      onGetOptimisationForFile: SourceCodeActions.loadSource,
    } );

    this.state = {
      json: undefined,
      optimisations: [], // The currently viewed optimisations
      file: undefined,
      expanded: true,
      graph: undefined,
      featurednodes: []
    };
  }

  onLoadFeatures( url ) {
    $.get( url, ( result ) => {
      this.setState( { json: result } );
      this.setState( { optimisations: this.state.json.optimisations } );
    } );
  }

  onGetOptimisationForFile( file ) {
    let o = this.state.json && this.state.json.optimisations.filter( ( v, k ) => {
        return v.files.includes( file );
      } );
    this.setState( { optimisations: o, file: file } );
  }

  onSelectOptimisation( optimisation ) {

    // Find the correct array element
    // This is because this.state.optimisations is an reduced sized array. Maybe change the filtering to be in the
    // jsx file so we can have a 1-1 index mapping...
    let i = this.state.json.optimisations.findIndex( x => x.id === optimisation );

    // Update the main file
    this.state.json.optimisations[ i ].checked = !this.state.json.optimisations[ i ].checked;

    // Reload the optimisations
    /*let o = this.state.json && this.state.json.optimisations.filter( ( v, k ) => {
        return this.state.file ? v.files.includes( this.state.file ) : v.files;
      } );*/

    //this.setState( { optimisations: o } );
    this.setState( { json: this.state.json } );
  }

  onToggleAccordion() {
    this.setState( { expanded: !this.state.expanded } );
  }

  onStoreGraph( graph ) {
    this.setState( {graph: graph} );
    this.preventDefault();
  }

  onStoreFeaturedNodes( nodes ) {
    this.setState( { featuresNodes: this.state.featurednodes.push( nodes ) } );

    // We dont need to tell the view otherwise we inf loop
    this.preventDefault();
  }

}

module.exports = {
  DDBStore: alt.createStore( DDBStore ),
  BBStore: alt.createStore( BBStore ),
  ProjectStore: alt.createStore( ProjectStore ),
  SourceCodeStore: alt.createStore( SourceCodeStore ),
  GraphStore: alt.createStore( GraphStore )
};
