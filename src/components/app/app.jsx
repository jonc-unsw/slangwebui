"use strict";
import React from "react";
import { Accordion } from "react-bootstrap";

import $ from "jquery";

import {Layout, Flex, Fixed} from "react-layout-pane";

import { Project } from "./project.jsx";
import { SourceCode } from "./sourcecode.jsx";
import { Features } from "./features.jsx";
import { Graph } from "./graph.jsx";
import { BasicBlocks } from "./bb.jsx";
import { DataDependenceBlocks } from "./ddb.jsx";

class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      project: undefined
    };

    this.PROJECTS_DIR = `/projects/${this.props.params.id}`;
  }

  componentDidMount() {
    $.get( `${this.PROJECTS_DIR}/project.json`, ( result ) => {
      this.setState( { project: result } );
    } );
  }


  render() {

    if( this.state.project === undefined ) {
      return (
        <Flex>
          <Layout type="columns" >
            <Fixed className="sidebar" >
            </Fixed>
            <Flex className="content" >
            </Flex>
            <Fixed className="sidebar" >
            </Fixed>
          </Layout>
        </Flex>
      );
    }

    return (
      <Flex>
        <Layout type="columns" >
          <Fixed className="sidebar" >
            <Accordion>
              <Project root={this.PROJECTS_DIR} url={this.state.project.source} name={this.state.project.name} />
              <SourceCode prefix={this.PROJECTS_DIR} file="fib/main.c" />
              <Features root={this.PROJECTS_DIR} url={this.state.project.features} />
            </Accordion>
          </Fixed>
          <Flex className="content" >
            <Graph root={this.PROJECTS_DIR} url={this.state.project.graph} />
          </Flex>
          <Fixed className="sidebar" >
            <Accordion>
              <BasicBlocks root={this.PROJECTS_DIR} url={this.state.project.bb} />
              <DataDependenceBlocks root={this.PROJECTS_DIR} url={this.state.project.ddb} />
            </Accordion>
          </Fixed>
        </Layout>
      </Flex>
    );
  }
}

export { App };
