import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import { BBStore } from '../stores/Store.js';
import { BBActions } from '../actions/Actions.js';
import { SourceCodeActions } from '../actions/Actions.js';
import { IndependentPanel } from './independentpanel.jsx';

@connectToStores
class BasicBlocks extends React.Component {
  constructor(props){
    super(props);
    BBActions.loadBb(this.props.url);
  }
  
  static getStores() {
    return [BBStore];
  }

  static getPropsFromStores() {
    return BBStore.getState();
  }

  render() {
    var blocks = this.props.bbdata && this.props.bbdata.map( (bb, key) => {
      return (
        <div key={key} className="block">
          <div className="blockname">
            <a href="#">[ {bb.name} ]</a>
          </div>
          <Statements line={bb.line} statements={bb.statements} />
          <Preds preds={bb.preds} />
          <Succs succs={bb.succs} />
        </div>
      )
    });
    return (
      <IndependentPanel {...this.props} header="Basic Blocks" 
        expanded={this.props.expanded}
      >
        {blocks}
      </IndependentPanel>
    )
  }
}

class Preds extends React.Component {

  handleClick = (e) => {
    //SourceCodeActions.highlightLine( edge.data("ddb") );
  }

  render() {
    if( this.props.preds ) {
      var handleClick = this.handleClick;
      var preds = this.props.preds.map(function(pred, key){
        return <a className="preds" href="#" key={key} onClick={handleClick}>{pred}</a>
      });

      return ( <div className="preds">Preds ({this.props.preds.length}): {preds} </div> )
    }
    return null
  }
}

class Succs extends React.Component {
  render() {
    if( this.props.succs ) {
      var succs = this.props.succs.map(function(succ, key){
        return <a className="succs" href="#" key={key}>{succ}</a>;
      });

      return ( <div className="succs">Succs ({this.props.succs.length}): {succs} </div> )
    }
    return null
  }
}

class Statement extends React.Component {

  handleClick = () => {
    SourceCodeActions.highlightLine( this.props.line );
  }

  render() {
    return (
      // TODO the json has encoded html. Maybe we should not do that..
      <li><a href="#" onClick={this.handleClick} dangerouslySetInnerHTML={{__html: this.props.statement}} /></li>
    )
  }
}

class Statements extends React.Component {
  render() {
    if( this.props.statements ) {
      let line = this.props.line;
      // line is the starting line of the BB. Key is a unique inc from 0 which
      // works nicely :)
      return (
        <ol>
          { this.props.statements.map(function(statement, key){
            return <Statement key={key} line={line+key} statement={statement}/>;
          }) }
        </ol>
      )
    }

    return null
  }
}

export { BasicBlocks }
