"use strict";
import React from "react";
import { Flex } from "react-layout-pane";
import { Input, Grid, Row, Col } from "react-bootstrap";

import $ from "jquery";

class Uploading extends React.Component {

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

  render() {

    if( this.state.project === undefined ) {
      return (
        <Flex>
        </Flex>
      );
    }

    return(
      <Flex className="content" >
        <Grid fluid>
          <Row className='center-block'>
            <Col md={6}>
              <h1>Analysis of {this.state.project.name} is inprogress</h1>
              <Input type="textarea" label="Text Area" placeholder="textarea" />
            </Col>
          </Row>
        </Grid>
      </Flex>
    );
  }
}

export { Uploading };