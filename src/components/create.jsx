"use strict";
import React from "react";
import { Flex } from "react-layout-pane";
import { ButtonInput, Input, Grid, Row, Col } from "react-bootstrap";

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

                <Input label="Source Code" help="" wrapperClassName="wrapper">
                  <Row>
                    <Col xs={5}>
                      <Input type="file" label="Upload" help='Select archive to upload' />
                    </Col>
                    <Col xs={2}>
                      Or
                    </Col>
                    <Col xs={5}>
                      <Input type="text" label="Location on server" placeholder="eg. /srv/nfs4/common" />
                    </Col>
                  </Row>
                </Input>

                <ButtonInput type="submit" value="Create" />
              </form>
            </Col>
          </Row>
        </Grid>
      </Flex>

    );
  }
}

export { CreateForm };