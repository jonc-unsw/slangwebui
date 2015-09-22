"use strict";
import React from "react";
import { Header } from "./common/header.jsx";
import { Footer } from "./common/footer.jsx";
import { Layout, Flex, Fixed } from "react-layout-pane";
import { Accordion, ButtonInput, Input, Panel, Grid, Row, Col } from "react-bootstrap";

class CreateForm extends React.Component {

  render() {
    return(
      <Layout type="rows" >
        <Fixed className="header" >
          <Header inapp={false} />
        </Fixed>
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
        <Fixed className="header" >
          <Footer />
        </Fixed>
      </Layout>

    );
  }
}

export { CreateForm };