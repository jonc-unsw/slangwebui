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
      key: 1
    };
  }

  handleSelect = ( key ) => {
    this.setState( { key } );
  }

  render() {
    const prefix = "/projects/fib/";
    return (
      <Layout type="rows" >
        <Fixed className="header" >
          <Header inapp={true} />
        </Fixed>
        <Flex>
          <Layout type="columns" >
            <Fixed className="sidebar" >
              <Accordion>
                <Project project={`${prefix}/project.json`} />
                <SourceCode prefix={prefix} file="fib/main.c" />
                <Features />
              </Accordion>
            </Fixed>
            <Flex className="content" >
              <TabbedArea activeKey={this.state.key} onSelect={this.handleSelect} >
                <TabPane eventKey={1} tab="System Dependence Graph" >
                  <Graph />
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
                <BasicBlocks {...this.props} url={`${prefix}/bb.json`} />
                <DataDependenceBlocks {...this.props} url={`${prefix}/ddb.json`} />
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