"use strict";
import React from 'react';
import { Header } from './common/header.jsx';
import { Footer } from './common/footer.jsx';
import { Layout, Flex, Fixed } from 'react-layout-pane';
import { Accordion, ButtonInput, Input, Panel, Grid, Row, Col } from 'react-bootstrap';

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
        <Layout type="rows" >
          <Fixed className="header" >
            <Header inapp={true} />
          </Fixed>
          <Flex>

          </Flex>
          <Fixed className="header" >
            <Footer />
          </Fixed>
        </Layout>
      )
    }

    return(
      <Layout type="rows" >
        <Fixed className="header" >
          <Header inapp={false} />
        </Fixed>
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
        <Fixed className="header" >
          <Footer />
        </Fixed>
      </Layout>

    )
  }
}

export { Uploading }