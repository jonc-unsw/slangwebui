"use strict";
import React from "react";
import { Accordion } from "react-bootstrap";
import connectToStores from "../../../node_modules/alt/utils/connectToStores";

import $ from "jquery";

import {Layout, Flex, Fixed} from "react-layout-pane";

import { Project } from "./project.jsx";
import { SourceCode } from "./sourcecode.jsx";
import { Features } from "./features.jsx";
import { Graph } from "./graph.jsx";
import { BasicBlocks } from "./bb.jsx";
import { DataDependenceBlocks } from "./ddb.jsx";

import { ProjectActions } from "../../actions/Actions.js";
import { ProjectStore } from "../../stores/Store.js";


@connectToStores class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      project: undefined
    };

    this.PROJECTS_DIR = `/projects/${this.props.params.id}`;
  }

  static getStores() {
    return [ ProjectStore ];
  }

  static getPropsFromStores() {
    return ProjectStore.getState();
  }

  componentDidMount() {
    $.get( `${this.PROJECTS_DIR}/project.json`, ( result ) => {
      this.setState( { project: result } );
      ProjectActions.loadProject( { root: this.PROJECTS_DIR, url: result.source } );
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
              <Project name={this.state.project.name} source={this.props.source} />
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
