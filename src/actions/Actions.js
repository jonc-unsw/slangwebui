import alt from '../alt';

class DDBActions {
  constructor() {
    this.generateActions('loadDdb', 'updateCurrentDdb', 'toggleAccordion');
  }
}

class BBActions {
  constructor() {
    this.generateActions('loadBb', 'toggleAccordion');
  }
}

class ProjectActions {
  constructor() {
    this.generateActions('loadProject', 'toggleAccordion');
  }
}

class SourceCodeActions {
  constructor() {
    this.generateActions('highlightLine', 'loadSource', 'toggleAccordion');
  }
}

class FeaturesActions {
  constructor() {
    this.generateActions('loadFeatures', 'getOptimisationForFile', 
      'selectOptimisation', 'toggleAccordion');
  }
}

module.exports = {
    DDBActions: alt.createActions(DDBActions),
    BBActions: alt.createActions(BBActions),
    ProjectActions: alt.createActions(ProjectActions),
    SourceCodeActions: alt.createActions(SourceCodeActions),
    FeaturesActions: alt.createActions(FeaturesActions)
};
