"use strict";
import React from 'react';
import { Accordion, TabbedArea, TabPane, PanelGroup } from 'react-bootstrap';

import {Layout, Flex, Fixed} from 'react-layout-pane';

import connectToStores from 'alt/utils/connectToStores';
import { BBStore, DDBStore, SourceCodeStore } from '../stores/Store.js';
import { BBActions, DDBActions, SourceCodeActions } from '../actions/Actions.js';

import { Header } from './header.jsx';
import { IndependentPanel } from './independentpanel.jsx';
import { Project } from './project.jsx';
import { SourceCode } from './sourcecode.jsx';
import { Graph } from './graph.jsx';
import { BasicBlocks } from './bb.jsx';
import { DataDependenceBlocks } from './ddb.jsx';
import { Footer } from './footer.jsx';

class App extends React.Component {
  constructor(props){
    super(props);
  }

  render() {

    return (
        <Layout type="rows">
          <Fixed className="header">
            <Header />
          </Fixed>
          <Flex>
            <Layout type="columns">
              <Fixed className="sidebar">
                <Accordion>
                  <Project />
                  <SourceCode />
                </Accordion>
              </Fixed>
              <Flex className="content">
                <TabbedArea defaultActiveKey={1}>
                  <TabPane eventKey={1} tab="System Dependence Graph">
                    <Graph />
                  </TabPane>
                  <TabPane eventKey={2} tab="Statistics">
                    Insert pie and bar chart
                  </TabPane>
                </TabbedArea>
              </Flex>
              <Fixed className="sidebar">
                <Accordion>
                  <BasicBlocks {...this.props} url="bb.json"/>
                  <DataDependenceBlocks {...this.props} url="ddb.json"/>
                </Accordion>
              </Fixed>
            </Layout>
          </Flex>
          <Fixed className="header">
            <Footer />
          </Fixed>
        </Layout>
    )
  }
}



React.render(
  <App />,
  document.body
);


