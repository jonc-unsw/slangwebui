"use strict";
import React from "react";
import PropTypes from "react-router";
import { Header } from "./common/header.jsx";
import { Footer } from "./common/footer.jsx";
import Autocomplete from "react-autocomplete";
import { Accordion, ButtonInput, Input, Panel, Grid, Row, Col } from "react-bootstrap";
import {Layout, Flex, Fixed} from "react-layout-pane";

class Home extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      projects: undefined,
      transitionpage: ""
    };
  }

  componentDidMount() {
    $.get( "projects/src.json", ( result ) => {
      this.setState( { projects: result } );
    } );
  }

  routeHandler = (e) => {
    e.preventDefault();
    //this.context.router.transitionTo('summary', {id: this.state.transitionpage})
    this.props.history.pushState(null, `project/${this.state.transitionpage}/summary/`, null);

  }

  matchProjectToTerm (project, value) {
    return (
      project.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }

  renderItems (items) {
    return items.map((item, index) => {
      var text = item.props.children;
      if (index === 0 || items[index - 1].props.children.charAt(0) !== text.charAt(0)) {
        var style = {
          background: "#eee",
          color: "#454545",
          padding: "2px 6px",
          fontWeight: "bold"
        };
        return [<div style={style}>{text.charAt(0)}</div>, item];
      }
      else {
        return item;
      }
    });
  }

  render() {

    /*
     * className: "form-control" is sent to Autocomplete because react-autocomplete does not have bootstrap integration
     * so we manually pass down this class to get it styled correctly. Alternatively rewrite react-autocomplete...
     * */
    const autocomplete = this.state.projects ? (
      <Autocomplete inputProps={{placeholder: "Project Search", className: "form-control"}} initialValue="" items={this.state.projects.children} getItemValue={(item) => item.name} shouldItemRender={this.matchProjectToTerm}
                    renderItem={(item, isHighlighted) => (
            <div key={item.name} >{item.name}</div>
      )}
                    renderMenu={(items, value, style) => (
            <Panel>
              {value === "" ? (
                <div />
              ) : this.renderItems(items)}
            </Panel>
       )}
                    onSelect={ (value, item) => { this.setState( {transitionpage : value} ); } }
        />) : <div/>;

    return (
      <Layout type="rows" >
        <Fixed className="header" >
          <Header inapp={false} />
        </Fixed>
        <Flex className="content" >

          <Grid fluid>
            <Row className='center-block'>
              <Col md={12}>
                <h1>Welcome to slang</h1>
                <form className='form-inline' onSubmit={this.routeHandler}>
                  {autocomplete}
                  <ButtonInput type="submit" value="Open" />
                </form>
              </Col>
            </Row>
          </Grid>

        </Flex>
        <Fixed className="header" >
          <Footer />
        </Fixed>
      </Layout>
    );
  }
}

// This is es7 code to get transitionTo working.
//Home.contextTypes = { history: PropTypes.history }

export { Home };