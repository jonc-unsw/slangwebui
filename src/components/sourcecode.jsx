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

class CodeMirrorEditor extends React.Component {
  constructor(props) {
    super(props);
    this.marked = [undefined, undefined];
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
    //if( this.props.line && this.props.line[0] !== nextProps.line[0] && this.props.line[1] !== nextProps.line[1] ) {

      // TODO do this nicer
      // Dont store marked in the Store since nested Actions are evil
      this.marked[0] && this.marked[0].clear();
      this.marked[1] && this.marked[1].clear();

      if( nextProps.line === undefined )
        return;

      if( nextProps.line instanceof Array ) {
        this.marked[0] && this.marked[0].clear();
        let marked0 = this.editor.markText( 
          {line: nextProps.line[0]-1, ch:0},
          {line: nextProps.line[0],ch:0},
          {css: "background-color: #ff7"}
        );
        this.marked[0] = marked0;
        
        this.marked[1] && this.marked[1].clear();
        let marked1 = this.editor.markText( 
          {line: nextProps.line[1]-1, ch:0},
          {line: nextProps.line[1],ch:0},
          {css: "background-color: #ff7"}
        );
        this.marked[1] = marked1;
      }
      else {
        let marked0 = this.editor.markText( 
          {line: nextProps.line-1, ch:0},
          {line: nextProps.line,ch:0},
          {css: "background-color: #ff7"}
        );
        this.marked[0] = marked0;
      }
    //}
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
        <CodeMirrorEditor src="main.c" line={this.props.line} />
      </IndependentPanel>
    )
  }
}

export { SourceCode }
