"use strict";
import React from 'react';
import { Accordion, TabbedArea, TabPane } from 'react-bootstrap';


import {Layout, Flex, Fixed} from 'react-layout-pane';

import { Header } from './header.jsx';
import { IndependentPanel } from './independentpanel.jsx';
import { Project } from './project.jsx';
import { SourceCode } from './sourcecode.jsx';
import { Features } from './features.jsx';
import { Graph } from './graph.jsx';
import { MyChart } from './chart.jsx';
import { Tree } from './tree.jsx';
import { BasicBlocks } from './bb.jsx';
import { DataDependenceBlocks } from './ddb.jsx';
import { Footer } from './footer.jsx';

class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      key: 1,
      project: undefined
    };

    this.PROJECTS_DIR = `/projects/${this.props.params.id}`;
  }

  componentDidMount() {
    $.get( `${this.PROJECTS_DIR}/project.json`, ( result ) => {
      this.setState( { project: result } );
    } );
  }

  handleSelect = ( key ) => {
    this.setState( { key } );
  }

  render() {
    if( this.state.project === undefined ) {
      return (
        <Layout type="rows" >
          <Fixed className="header" >
            <Header inapp={true} />
          </Fixed>
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
          <Fixed className="header" >
            <Footer />
          </Fixed>
        </Layout>
      )
    }

    return (
      <Layout type="rows" >
        <Fixed className="header" >
          <Header inapp={true} />
        </Fixed>
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
              <TabbedArea activeKey={this.state.key} onSelect={this.handleSelect} >
                <TabPane eventKey={1} tab="System Dependence Graph" >
                  <Graph root={this.PROJECTS_DIR} url={this.state.project.graph} />
                </TabPane>
                <TabPane eventKey={2} tab="Statistics" >
                  <MyChart />
                </TabPane>
                <TabPane eventKey={3} tab="Tree" >
                  <Tree />
                </TabPane>
              </TabbedArea>
            </Flex>
            <Fixed className="sidebar" >
              <Accordion>
                <BasicBlocks root={this.PROJECTS_DIR} url={this.state.project.bb} />
                <DataDependenceBlocks root={this.PROJECTS_DIR} url={this.state.project.ddb} />
              </Accordion>
            </Fixed>
          </Layout>
        </Flex>
        <Fixed className="header" >
          <Footer />
        </Fixed>
      </Layout>
    )
  }
}

export { App };