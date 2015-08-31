"use strict";
import React from 'react';
import Router from 'react-router';
import { Accordion, ButtonInput, Panel } from 'react-bootstrap';
import { IndependentPanel } from './components/independentpanel.jsx';
import Autocomplete from 'react-autocomplete';

let { RouteHandler, DefaultRoute, Route, Link, NotFoundRoute } = Router;

import { App } from './components/app.jsx';

import {Layout, Flex, Fixed} from 'react-layout-pane';

import { Header } from './components/header.jsx';
import { Footer } from './components/footer.jsx';

class Home extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      projects: undefined,
      transitionpage: ""
    }
  }

  componentDidMount() {
    $.get( "projects/src.json", ( result ) => {
      this.setState( { projects: result } );
    } );
  }

  routeHandler = (e) => {
    e.preventDefault();
    this.context.router.transitionTo('project', {id: this.state.transitionpage})
  }

  matchProjectToTerm (project, value) {
    return (
      project.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  renderItems (items) {
    return items.map((item, index) => {
      var text = item.props.children
      if (index === 0 || items[index - 1].props.children.charAt(0) !== text.charAt(0)) {
        var style = {
          background: '#eee',
          color: '#454545',
          padding: '2px 6px',
          fontWeight: 'bold'
        }
        return [<div style={style}>{text.charAt(0)}</div>, item]
      }
      else {
        return item
      }
    })
  }

  render() {

    /*
    * className: "form-control" is sent to Autocomplete because react-autocomplete does not have bootstrap integration
    * so we manually pass down this class to get it styled correctly. Alternatively rewrite react-autocomplete...
    * */
    const autocomplete = this.state.projects ? (
      <Autocomplete inputProps={{placeholder: 'placeholder text', className: "form-control"}} initialValue="" items={this.state.projects.children} getItemValue={(item) => item.name} shouldItemRender={this.matchProjectToTerm}
      renderItem={(item, isHighlighted) => (
            <div key={item.name} >{item.name}</div>
      )}
      renderMenu={(items, value, style) => (
            <Panel>
              {value === '' ? (
                <div />
              ) : this.renderItems(items)}
            </Panel>
       )}
      onSelect={ (value, item) => { this.setState( {transitionpage : value} ) } }
        />) : <div/>;

    return (
      <Layout type="rows" >
        <Fixed className="header" >
          <Header inapp={false} />
        </Fixed>
        <Flex>
        <Layout type="columns" >
          <Fixed className="sidebar" >

          </Fixed>
          <Flex className="content" >
            <div>
              <h1>Welcome to slang</h1>
              <p>Project Search</p>
              <form className='form-inline' onSubmit={this.routeHandler}>
                {autocomplete}
                <ButtonInput type="submit" value="Submit Your Input" />
              </form>
            </div>
          </Flex>
        </Layout>
        </Flex>
        <Fixed className="header" >
          <Footer />
        </Fixed>
      </Layout>
    )
  }
}

// This is es7 code to get transitionTo working.
Home.contextTypes = {
  router: React.PropTypes.func.isRequired
};

class MainApp extends React.Component {
  render() {
    return(
      <RouteHandler/>
    )
  }
}

class ProjectNotFound extends React.Component {
  render() {
    return(
      <div>Sorry but this project does not exist</div>
    )
  }
}

var routes = (
  <Route path="/" handler={MainApp}>

    <DefaultRoute name="home" handler={Home} />

    <Route name="project" path="project/:id" handler={App}>
      <NotFoundRoute handler={ProjectNotFound} />
    </Route>
    <Route path="/footer" handler={Footer} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Root) => {
  React.render(<Root/>, document.body);
});