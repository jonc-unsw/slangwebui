"use strict";
import React from 'react';
import Router from 'react-router';
import { Accordion, ButtonInput, Input, Panel, Grid, Row, Col } from 'react-bootstrap';
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
      <Autocomplete inputProps={{placeholder: 'Project Search', className: "form-control"}} initialValue="" items={this.state.projects.children} getItemValue={(item) => item.name} shouldItemRender={this.matchProjectToTerm}
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
      <Flex className="content" >
        <Grid fluid>
          <Row className='center-block'>
            <Col md={12}>
              <h1>Welcome to slang</h1>
              <p>Please select a project to view</p>
              <form className='form-inline' onSubmit={this.routeHandler}>
                {autocomplete}
                <ButtonInput type="submit" value="Open" />
              </form>
            </Col>
          </Row>
        </Grid>
      </Flex>
    )
  }
}

class CreateForm extends React.Component {
  render() {
    return(

    <Flex className="content" >
      <Grid fluid>
        <Row className='center-block'>
          <Col md={6}>
            <h1>Create new Project</h1>
            <form onSubmit={this.routeHandler}>
              <Input type="text" label="Project Name" />
              <Input type="textarea" label="Project Description" />
              <Input type="file" label="Source Code" help='Select archive to upload' />
              <ButtonInput type="submit" value="Create" />
            </form>
          </Col>
        </Row>
      </Grid>
    </Flex>

    )
  }
}

// This is es7 code to get transitionTo working.
Home.contextTypes = {
  router: React.PropTypes.func.isRequired
};

class MainApp extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {inapp: false};
  }

  render() {

    return(
      <Layout type="rows" >
        <Fixed className="header" >
          <Header inapp={false} />
        </Fixed>

          <RouteHandler/>

        <Fixed className="header" >
          <Footer />
        </Fixed>
      </Layout>
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

    <Route name="create" path="create" handler={CreateForm} />

    <Route path="/footer" handler={Footer} />
  </Route>
);

Router.run(routes, Router.HistoryLocation, (Root, state) => {
  React.render(<Root/>, document.body);
});