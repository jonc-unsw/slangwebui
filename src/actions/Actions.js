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

class SourceCodeActions {
  constructor() {
    this.generateActions('highlightLine', 'toggleAccordion');
  }
}

module.exports = {
    DDBActions: alt.createActions(DDBActions),
    BBActions: alt.createActions(BBActions),
    SourceCodeActions: alt.createActions(SourceCodeActions)
};
