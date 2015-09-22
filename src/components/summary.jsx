"use strict";
import React from "react";
import { Header } from "./common/header.jsx";
import { Footer } from "./common/footer.jsx";
import { Layout, Flex, Fixed } from "react-layout-pane";
import { Accordion, ButtonInput, Input, Panel, Grid, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router";

import { BarChart, PieChart, LineChart } from "react-d3";

class Summary extends React.Component {
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

  whichDetail() {

    var pieData = [
      { label: "Control Flow", value: 20.0 },
      { label: "Data Dependence", value: 55.0 }
    ];

    var barData = [
      {
        name: "Edges",
        values: [
          { x: "Control Flow", y: 20.0 },
          { x: "Data Dependence", y: 55.0 }
        ]
      }
    ];

    var bbData = [
      {
        "name": "Series A",
        "values": [
          { x: "main_B0", y: 0 },
          { x: "main_B1", y: 1 },
          { x: "main_B2", y: 1 },
          { x: "main_B3", y: 1 },
          { x: "main_B4", y: 2 },
          { x: "main_B5", y: 5 },
          { x: "main_B6", y: 0 }
        ]
      }
    ];

    if( this.props.params.detail === "pie" )
      return <PieChart data={pieData} width={450} height={400} radius={110}
              innerRadius={20} sectorBorderColor="white" title="Edges" />;

    return <div/>;
  }

  render() {



    if( this.state.project === undefined ) {
      return (
        <Layout type="rows" >
          <Fixed className="header" >
            <Header inapp={false} />
          </Fixed>
          <Flex className="content" >

          </Flex>
          <Fixed className="header" >
            <Footer />
          </Fixed>
        </Layout>
      );
    }

    const detail = this.whichDetail();

    const className = "";

    return(
      <Layout type="rows" >
        <Fixed className="header" >
          <Header inapp={false} />
        </Fixed>
        <Flex className="content" >

            <Layout type="columns" >
                <Fixed className="sidebar" >

                  <div className="summary">
                    <ul className="nav nav-sidebar">
                      <li className={className} ><Link to={`/project/${this.props.params.id}/summary/`}>Overview</Link></li>
                      <li className={className} ><a href="#">Reports</a></li>
                      <li className={className} ><a href="#">Analytics</a></li>
                      <li className={className} ><a href="#">Export</a></li>
                    </ul>

                    <ListGroup>
                      <LinkContainer to={`/project/${this.props.params.id}/summary/`}>
                        <ListGroupItem listItem>Overview</ListGroupItem>
                      </LinkContainer>
                      <LinkContainer to={`/project/${this.props.params.id}/view`}>
                        <ListGroupItem listItem>Goto Analysis</ListGroupItem>
                      </LinkContainer>
                      <LinkContainer to={`/project/${this.props.params.id}/summary/pie`}>
                        <ListGroupItem listItem>Pie Chart</ListGroupItem>
                      </LinkContainer>
                    </ListGroup>

                    <ListGroup>
                      <ListGroupItem><Link to={`/project/${this.props.params.id}/summary/`}>Overview</Link></ListGroupItem>
                      <ListGroupItem >Info</ListGroupItem>
                      <ListGroupItem >Warning</ListGroupItem>
                      <ListGroupItem >Danger</ListGroupItem>
                    </ListGroup>

                  </div>

                </Fixed>
              <Flex className="content" >
                <Grid fluid>
                  <Row className='center-block'>
                    <Col md={6}>
                      <h1>Project Summary</h1>
                      <h2>{this.state.project.name} - {this.state.project.description} </h2>
                    </Col>
                    <Col md={6}>
                      {detail}
                    </Col>
                  </Row>
                </Grid>
              </Flex>
            </Layout>

        </Flex>
        <Fixed className="header" >
          <Footer />
        </Fixed>
      </Layout>

    );
  }
}

export { Summary };