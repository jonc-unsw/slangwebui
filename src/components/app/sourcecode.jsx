import React from "react";
import { IndependentPanel } from "./independentpanel.jsx";
import { SourceCodeActions } from "../../actions/Actions.js";

import $ from "jquery";

import CodeMirror from "codemirror";
import "codemirror/addon/selection/active-line";
import "codemirror/addon/selection/mark-selection";
import "codemirror/addon/search/searchcursor";
import "codemirror/mode/clike/clike";

class CodeMirrorEditor extends React.Component {
  constructor( props ) {
    super( props );
    this.marked = [ undefined, undefined ];
  }

  shouldComponentUpdate( nextProps, _nextState) {
    if( this.props.file === nextProps.file && this.props.line === nextProps.line )
      return false;
    return true;
  }

  componentDidMount() {
    this.editor = CodeMirror.fromTextArea( React.findDOMNode( this ), {
      mode: "text/x-csrc",
      styleActiveLine: false,
      styleSelectedText: true,
      lineNumbers: true,
      readOnly: true,
      lineWrapping: true,
      viewportMargin: Infinity
    } );
    this.editor.setValue( "Nothing selected yet" );
  }

  componentWillReceiveProps( nextProps ) {
    // TODO do this nicer
    // Dont store marked in the Store since nested Actions are evil
    this.marked[ 0 ] && this.marked[ 0 ].clear();
    this.marked[ 1 ] && this.marked[ 1 ].clear();

    if( nextProps.file === undefined )
      return;

    $.get( `${this.props.prefix}/${nextProps.file}`, ( data ) => {
      this.editor.setValue( data );

      if( nextProps.file === undefined )
        return;

      if( nextProps.line === undefined )
        return;

      if( nextProps.line instanceof Array ) {
        this.marked[ 0 ] && this.marked[ 0 ].clear();
        let marked0 = this.editor.markText(
          { line: nextProps.line[ 0 ] - 1, ch: 0 },
          { line: nextProps.line[ 0 ], ch: 0 },
          { css: "background-color: #ff7" }
        );
        this.marked[ 0 ] = marked0;

        this.marked[ 1 ] && this.marked[ 1 ].clear();
        let marked1 = this.editor.markText(
          { line: nextProps.line[ 1 ] - 1, ch: 0 },
          { line: nextProps.line[ 1 ], ch: 0 },
          { css: "background-color: #ff7" }
        );
        this.marked[ 1 ] = marked1;
      }
      else {
        let marked0 = this.editor.markText(
          { line: nextProps.line - 1, ch: 0 },
          { line: nextProps.line, ch: 0 },
          { css: "background-color: #ff7" }
        );
        this.marked[ 0 ] = marked0;
      }

    } );
  }

  componentWillUnmount() {
    if( this.editor ) {
      this.editor.toTextArea();
    }
  }

  render() {
    return (
      <textarea id="code" ref="code" readOnly />
    );
  }
}

class SourceCode extends React.Component {
  constructor( props ) {
    super( props );
  }

  shouldComponentUpdate( nextProps, _nextState) {
    if( this.props.file === nextProps.file && this.props.line === nextProps.line )
      return false;

    return true;
  }

  render() {
    return (
      <IndependentPanel {...this.props} header="Source Code" onSelect={() => SourceCodeActions.toggleAccordion()}>
        <CodeMirrorEditor prefix={this.props.prefix} file={this.props.file} line={this.props.line} />
      </IndependentPanel>
    );
  }
}

export { SourceCode };
