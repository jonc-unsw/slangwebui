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

  constructor( props ) {
    super( props );
    this.state = {
      projects: undefined
    }
  }

  componentDidMount() {
    $.get( "projects/src.json", ( result ) => {
      this.setState( { projects: result } );
    } );
  }

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
                  {
                    this.state.projects && this.state.projects.children.map( (proj, key) => {
                      return (
                        <li key={key}><Link to="project" params={{id: proj.name}} query={{foo: "z"}}>Project {proj.name}</Link></li>
                      )
                    })
                  }
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