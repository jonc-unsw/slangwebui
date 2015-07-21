import React from 'react';

import connectToStores from 'alt/utils/connectToStores';
import { SourceCodeStore } from '../stores/Store.js';
import { SourceCodeActions } from '../actions/Actions.js';
import { IndependentPanel } from './independentpanel.jsx';

//import CodeMirrorEditor from 'react-code-mirror';
import CodeMirror from 'codemirror';
require('codemirror/addon/selection/active-line');
require('codemirror/addon/selection/mark-selection');
require('codemirror/addon/search/searchcursor');
require('codemirror/mode/clike/clike');

@connectToStores
class CodeMirrorEditor extends React.Component {
  constructor(props) {
    super(props);
  }
  
  static getStores() {
    return [SourceCodeStore];
  }

  static getPropsFromStores() {
    return SourceCodeStore.getState();
  }
  
  componentDidMount() {

    $.get(this.props.src, (data) => {
      
      $(React.findDOMNode(this)).text(data);

      this.editor = CodeMirror.fromTextArea(React.findDOMNode(this), {
        mode: "text/x-csrc",
        styleActiveLine: false,
        styleSelectedText: true,
        lineNumbers: true,
        readOnly: true,
        lineWrapping: true,
        viewportMargin: Infinity
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if( this.props.line !== nextProps.line ) {

      // Dont store marked in the Store since nested Actions are evil
      this.marked && this.marked.clear();
      let marked = this.editor.markText( 
        {line: nextProps.line, ch:0},
        {line: nextProps.line+1,ch:0},
        {css: "background-color: #ff7"}
      );
      this.marked = marked;
    }
  }

  componentWillUnmount() {
    if (this.editor) {
      this.editor.toTextArea();
    }
  }

  render() {
    return (
      <textarea id="code" ref="code" readOnly/>
    )
  }
}

@connectToStores
class SourceCode extends React.Component {
  constructor(props) {
    super(props);
  }
  
  static getStores() {
    return [SourceCodeStore];
  }

  static getPropsFromStores() {
    return SourceCodeStore.getState();
  }
  
  render() {
    return (
      <IndependentPanel {...this.props} header="Source Code" expanded={this.props.expanded}>
        <CodeMirrorEditor src="main.c" />
      </IndependentPanel>
    )
  }
}

export { SourceCode }
