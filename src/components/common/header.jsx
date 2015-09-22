import React from "react";
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from "react-bootstrap";
import { DDBActions, BBActions, ProjectActions, SourceCodeActions, GraphActions } from "../../actions/Actions.js";

import { LinkContainer } from "react-router-bootstrap";

class Header extends React.Component {

  render() {

    let create = !this.props.inapp ? (
      <LinkContainer to="/create">
        <NavItem eventKey={1}>Create New</NavItem>
      </LinkContainer>
    ) : undefined;

    let viewmenu = this.props.inapp ? (
      <NavDropdown eventKey={2} title="View" id="collapsible-navbar-dropdown">
        <MenuItem eventKey="1" onSelect={ () => {ProjectActions.toggleAccordion();} } >Project</MenuItem>
        <MenuItem eventKey="2" onSelect={ () => {SourceCodeActions.toggleAccordion();} }>Source Code</MenuItem>
        <MenuItem eventKey="3" onSelect={ () => {GraphActions.toggleAccordion();} }>Features</MenuItem>
        <MenuItem eventKey="4" onSelect={ () => {BBActions.toggleAccordion();} }>Basic Block</MenuItem>
        <MenuItem eventKey="5" onSelect={ () => {DDBActions.toggleAccordion();} }>Data Dependence Block</MenuItem>
      </NavDropdown>
    ) : undefined;

    let graphmenu = this.props.inapp ? (
      <NavDropdown eventKey={3} title="Graph" id="collapsible-navbar-dropdown">
        <MenuItem eventKey="1">Toggle Data Dependencies</MenuItem>
        <MenuItem eventKey="2">Toggle Control Flow</MenuItem>
        <MenuItem eventKey="3">Reset</MenuItem>
      </NavDropdown>
    ) : undefined;

    return (
      <Navbar brand="Slang" fixedTop fluid inverse >
        <Nav>
          <LinkContainer to="/">
            <NavItem eventKey={0}>Home</NavItem>
          </LinkContainer>

          {create}
          {viewmenu}
          {graphmenu}

        </Nav>
      </Navbar>
    );
  }
}

export { Header };
