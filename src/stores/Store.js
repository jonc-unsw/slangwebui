import alt from '../alt';

import { BBActions, DDBActions, FeaturesActions, ProjectActions, SourceCodeActions } from '../actions/Actions.js'

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

  onLoadDdb(url) {
    $.get(url, (result) => {
      this.setState( {ddbdata: result} );  
    } );
  }

  onUpdateCurrentDdb(id) {
    this.setState( {ddbid: id} );
  }

  onToggleAccordion() {
    this.setState( {expanded: !this.state.expanded} );
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

  onLoadBb(url) {
    $.get(url, (result) => {
      this.setState( {bbdata: result} );  
    } );
  }
  
  onToggleAccordion() {
    this.setState( {expanded: !this.state.expanded} );
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
  
  onLoadProject(url) {
    $.get(url, (result) => {
      this.setState( {path: result} );  
    } );
  }
  
  onToggleAccordion() {
    this.setState( {expanded: !this.state.expanded} );
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

  onHighlightLine(src) {
    if(src === undefined)
      this.setState( {file: undefined, line: undefined} );
    this.setState( {file: src.file, line: src.line} );
  }

  onLoadSource(file) {
    this.setState( {file: file} );
  }
  
  onToggleAccordion() {
    this.setState( {expanded: !this.state.expanded} );
  }

}

class FeaturesStore {
  constructor() {
    this.bindActions( FeaturesActions );

    this.bindListeners({
      onGetOptimisationForFile: SourceCodeActions.loadSource,
    });

    this.state = {
      json: undefined,
      optimisations: [],
      expanded: true
    };
  }

  onLoadFeatures(url) {
    $.get(url, (result) => {
      this.setState({json: result});
      this.setState({optimisations: this.state.json.optimisations});
    });
  }

  onGetOptimisationForFile(file) {
    let o = this.state.json && this.state.json.optimisations.filter( (v,k) => {
      return v.files.includes(file);
    });
    this.setState( { optimisations: o });
  }

  onSelectOptimisation(optimisation) {
    this.state.json.optimisations[optimisation].checked = 
      !this.state.json.optimisations[optimisation].checked;

    this.setState( { optimisations: this.state.json.optimisations } );

    console.log(  this.state.json.optimisations[optimisation].checked );
  }

  onToggleAccordion() {
    this.setState( {expanded: !this.state.expanded} );
  }

}

module.exports = {
    DDBStore: alt.createStore(DDBStore),
    BBStore: alt.createStore(BBStore),
    ProjectStore: alt.createStore(ProjectStore),
    SourceCodeStore: alt.createStore(SourceCodeStore),
    FeaturesStore: alt.createStore(FeaturesStore)
};
