import React from "react";
import { SourceCodeActions } from "../../actions/Actions.js";
import { IndependentPanel } from "./independentpanel.jsx";

class BasicBlocks extends React.Component {
  constructor( props ) {
    super( props );
  }

  shouldComponentUpdate( nextProps, _nextState) {
    if( this.props.bbdata === nextProps.bbdata )
      return false;

    return true;
  }

  render() {

    var blocks = !this.props.bbdata.isEmpty() && this.props.bbdata.map( ( bb, key ) => {
      return (
        <div key={key} className="block" >
          <div className="blockname" >
            <a href="#" >[ {bb.get("name")} ]</a>
          </div>
          <Statements file={bb.get("file")} line={bb.get("line")} statements={bb.get("statements")} />
          <Preds preds={bb.get("preds")} />
          <Succs succs={bb.get("succs")} />
        </div>
      );
    });

    return (
      <IndependentPanel {...this.props} header="Basic Blocks" expanded={this.props.expanded} >
        {blocks}
      </IndependentPanel>
    );
  }
}

class Preds extends React.Component {
  constructor( props ) {
    super( props );
  }

  shouldComponentUpdate( nextProps, _nextState) {
    if( this.props.preds === nextProps.preds )
      return false;

    return true;
  }

  handleClick = ( _e ) => {
    //SourceCodeActions.highlightLine( edge.data("ddb") );
  }

  render() {
    if( !this.props.preds ){
      return <div/>;
    }

    let handleClick = this.handleClick;
    let preds = this.props.preds.map( function( pred, key ) {
      return <a className="preds" href="#" key={key} onClick={handleClick} >{pred}</a>;
    } );

    return ( <div className="preds" >Preds ({this.props.preds.size}): {preds} </div> );
  }

}

class Succs extends React.Component {
  constructor( props ) {
    super( props );
  }

  shouldComponentUpdate( nextProps, _nextState) {
    if( this.props.succs === nextProps.succs )
      return false;

    return true;
  }

  render() {
    if( !this.props.succs ){
      return <div/>;
    }

    let succs = this.props.succs.map( function( succ, key ) {
      return <a className="succs" href="#" key={key} >{succ}</a>;
    } );

    return ( <div className="succs" >Succs ({this.props.succs.size}): {succs} </div> );
  }

}

class Statement extends React.Component {
  constructor( props ) {
    super( props );
  }

  shouldComponentUpdate( nextProps, _nextState) {
    if( this.props.statement === nextProps.statement )
      return false;

    return true;
  }

  handleClick = () => {
    SourceCodeActions.highlightLine( { file: this.props.file, line: this.props.line } );
  }

  render() {
    return (
      // TODO the json has encoded html. Maybe we should not do that..
      <li><a href="#" onClick={this.handleClick} dangerouslySetInnerHTML={{__html: this.props.statement}} /></li>
    );
  }
}

class Statements extends React.Component {
  constructor( props ) {
    super( props );
  }

  shouldComponentUpdate( nextProps, _nextState) {
    if( this.props.statements === nextProps.statements )
      return false;

    return true;
  }

  render() {
    if( !this.props.statements ){
      return <div/>;
    }

    let file = this.props.file;
    return (
      <ol>
        { this.props.statements.map( function( statement, key ) {
          // statement contains the statement and the line number
          // statement[0] = "statement"
          // statement[1] = linenumber
          return <Statement key={key} file={file} line={statement.get(1)} statement={statement.get(0)} />;
        } ) }
      </ol>
    );
  }

}

export { BasicBlocks };
