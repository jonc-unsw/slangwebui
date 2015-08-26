"use strict";
import React from 'react';
import Router from 'react-router';
import { Accordion } from 'react-bootstrap';
import { IndependentPanel } from './components/independentpanel.jsx';

let { RouteHandler, DefaultRoute, Route, Link } = Router;

import { App } from './components/app.jsx';

import {Layout, Flex, Fixed} from 'react-layout-pane';

import { Header } from './components/header.jsx';
import { Footer } from './components/footer.jsx';

class Home extends React.Component {
  render() {
    return (
      <Layout type="rows" >
        <Fixed className="header" >
          <Header inapp={false} />
        </Fixed>
        <Flex>
        <Layout type="columns" >
          <Fixed className="sidebar" >
            <Accordion>
              <IndependentPanel {...this.props} header="Projects" expanded={true} >
                <ul>
                  <li><Link to="project" params={{id: 1}} query={{foo: "z"}}>Project 1</Link></li>
                  <li><Link to="project" params={{id: 2}} query={{foo: "z"}}>Project 2</Link></li>
                </ul>
              </IndependentPanel>
            </Accordion>
          </Fixed>
          <Flex className="content" >
            <div>
              <div>Welcome to slang. Here is a list of projects which you can choose from</div>
            </div>
          </Flex>
        </Layout>
        </Flex>
        <Fixed className="footer" >
          <Footer />
        </Fixed>
      </Layout>
    )
  }
}

class MainApp extends React.Component {
  render() {
    return(
      <RouteHandler/>
    )
  }
}

var routes = (
  <Route path="/" handler={MainApp}>

    <DefaultRoute name="home" handler={Home} />

    <Route name="project" path="/project/:id" handler={App} />
    <Route path="/footer" handler={Footer} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Root) => {
  React.render(<Root/>, document.body);
});