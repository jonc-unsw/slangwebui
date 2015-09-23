"use strict";
import React from "react";
import { Layout, Flex, Fixed } from "react-layout-pane";
import { Grid, Row, Col } from "react-bootstrap";

import { Link } from "react-router";

import { PieChart } from "react-d3";

import $ from "jquery";

class Statistics extends React.Component {
  render() {

    var pieData = [
      { label: "Control Flow", value: 20.0 },
      { label: "Data Dependence", value: 55.0 }
    ];

    /*var barData = [
      {
        name: "Edges",
        values: [
          { x: "Control Flow", y: 20.0 },
          { x: "Data Dependence", y: 55.0 }
        ]
      }
    ];*/

    /*var bbData = [
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
    ];*/

    return <PieChart data={pieData} width={450} height={400} radius={110}
                            innerRadius={20} sectorBorderColor="white" title="Edges" />;
  }
}

class Overview extends React.Component {
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
        <Flex className="content" >
        </Flex>
      );
    }

    const className = "";

    return(
      <Flex className="content" >

        <Layout type="columns" >
          <Fixed className="sidebar" >

            <div className="summary">
              <ul className="nav nav-sidebar">
                <li className={className} ><Link to={`/project/${this.props.params.id}/overview/`}>Overview</Link></li>
                <li className={className} ><Link to={`/project/${this.props.params.id}/overview/statistics`}>Statistics</Link></li>
                <li className={className} ><Link to={`/project/${this.props.params.id}/view`}>Goto Analysis</Link></li>
              </ul>
            </div>

          </Fixed>
          <Flex className="content" >
            <Grid fluid>
              <Row className='center-block'>
                <Col md={12}>
                  <h1>{this.state.project.name} - {this.state.project.description} </h1>
                  {this.props.children}
                </Col>
              </Row>
            </Grid>
          </Flex>
        </Layout>

      </Flex>
    );
  }
}

export { Overview, Statistics };