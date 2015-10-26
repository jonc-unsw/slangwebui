import alt from "../alt";

import Immutable from "immutable";

import { BBActions, DDBActions, GraphActions, ProjectActions, SourceCodeActions } from "../actions/Actions.js";

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

  onLoadDdb( data ) {
    let { root, url } = data;
    $.get( `${root}/${url}`, ( result ) => {
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
      bbdata: Immutable.List(),
      expanded: true
    };
  }

  onLoadBb( data ) {
    let { root, url } = data;
    $.get( `${root}/${url}`, ( result ) => {
      this.setState( { bbdata: Immutable.fromJS(result) } );
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
      source: undefined,
      expanded: true
    };
  }

  onLoadProject( data ) {
    let { root, url } = data;
    $.get( `${root}/${url}`, ( result ) => {
      this.setState( { source: result } );
    });
  }

  onToggleAccordion() {
    console.log("befoer " + this.state.expanded);
    this.setState( { expanded: !this.state.expanded } );
    console.log("after " + this.state.expanded);
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

  onLoadSource( src ) {
    this.setState( { file: src.file } );
  }

  onToggleAccordion() {
    this.setState( { expanded: !this.state.expanded } );
  }

}

class GraphStore {
  constructor() {
    this.bindActions( GraphActions );

    this.bindListeners( {
      onGetOptimisationForFile: [ SourceCodeActions.loadSource, SourceCodeActions.highlightLine ]
    } );

    this.state = {
      json: undefined,
      optimisations: Immutable.List(), // The currently viewed optimisations
      file: undefined,
      expanded: true,
      graph: undefined,
      featurednodes: [],
      selected: Immutable.Set() // Immutable set which returns a new set each time we add/delete something, This helps make this.props and nextProps different
    };
  }

  onLoadFeatures( data ) {
    let { root, url } = data;
    $.get( `${root}/${url}`, ( result ) => {
      let o = Immutable.fromJS(result.optimisations);
      this.setState( { json: result, optimisations: o } );
    } );
  }

  onGetOptimisationForFile( arg0 ) {
    let { file, ...xs } = arg0;

    this.setState( { file: file } );
  }

  onSelectOptimisation( optimisation ) {
    if( this.state.selected.has(optimisation) ){
      this.setState({selected: this.state.selected.delete(optimisation)});
    }
    else{
      this.setState({selected: this.state.selected.add(optimisation)});
    }
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
