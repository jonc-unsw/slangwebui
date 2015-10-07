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

import { BBActions, DDBActions, GraphActions, ProjectActions } from "../../actions/Actions.js";
import { BBStore, DDBStore, GraphStore, ProjectStore, SourceCodeStore } from "../../stores/Store.js";


@connectToStores class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      project: undefined
    };

    this.PROJECTS_DIR = `/projects/${this.props.params.id}`;
  }

  static getStores() {
    return [ BBStore, DDBStore, GraphStore, ProjectStore, SourceCodeStore ];
  }

  static getPropsFromStores() {
    return {
      bbStore: BBStore.getState(),
      ddbStore: DDBStore.getState(),
      graphStore: GraphStore.getState(),
      projectStore: ProjectStore.getState(),
      sourceCodeStore: SourceCodeStore.getState()
    };
  }

  componentDidMount() {
    $.get( `${this.PROJECTS_DIR}/project.json`, ( result ) => {
      this.setState( { project: result } );
      DDBActions.loadDdb( { root: this.PROJECTS_DIR, url: result.ddb } );
      BBActions.loadBb( { root: this.PROJECTS_DIR, url: result.bb } );
      GraphActions.loadFeatures( { root: this.PROJECTS_DIR, url: result.features } );
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
              <Project {...this.props.projectStore} name={this.state.project.name} />
              <SourceCode {...this.props.sourceCodeStore} prefix={this.PROJECTS_DIR} />
              <Features {...this.props.graphStore} />
            </Accordion>
          </Fixed>
          <Flex className="content" >
            <Graph root={this.PROJECTS_DIR} url={this.state.project.graph} />
          </Flex>
          <Fixed className="sidebar" >
            <Accordion>
              <BasicBlocks {...this.props.bbStore} />
              <DataDependenceBlocks {...this.props.ddbStore} />
            </Accordion>
          </Fixed>
        </Layout>
      </Flex>
    );
  }
}

export { App };
