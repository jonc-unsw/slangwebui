import React from 'react';
import { DropdownMenu, Nav, Navbar, NavItem, DropdownButton, MenuItem, NavDropdown } from 'react-bootstrap';
import { DDBActions, BBActions, ProjectActions, SourceCodeActions, GraphActions } from '../../actions/Actions.js';

import { LinkContainer } from 'react-router-bootstrap';

class MyNavbar extends React.Component {

  constructor( props ) {
    super( props );
  }

  handleClick = () => {
    DDBActions.toggleAccordion();
  }

  // Hack until react-bootstrap fixes the menus not closing
  closeMenu = () => {
    /*empty*/
  }

  /*  Bootstrap doent support submenus. The custom css
   dropdown-submenu fixes this. The navItem is forcing it to be
   <a> instead of <button> and noCaret removes the default carret
   while the custom css puts in the one you can when rendered
   */
  render() {

    let viewmenu = this.props.inapp ? (
      <DropdownButton eventKey={1} title='View' onSelect={this.closeMenu} >
        <MenuItem eventKey='1' onClick={ () => {
                  ProjectActions.toggleAccordion();
                  }
                } >Project</MenuItem>

        <MenuItem eventKey='2' onClick={ () => {
                  SourceCodeActions.toggleAccordion()
                  }
                } >Source Code</MenuItem>

        <MenuItem eventKey='3' onClick={ () => {
                  BBActions.toggleAccordion()
                  }
                } >Basic Block</MenuItem>

        <MenuItem eventKey='4' onClick={() => {
                  DDBActions.toggleAccordion()
                  }
                } >Data Dependence Block</MenuItem>
      </DropdownButton>

    ) : undefined;

    let commandmenu = this.props.inapp ? (

      <DropdownButton eventKey={2} title='Command' onSelect={this.closeMenu} >
        <DropdownButton className="dropdown-submenu" navItem noCaret
                        eventKey={3} title='System Dependence Graph'>
          <MenuItem eventKey='1' onClick={() => {
            var cy = $('#cy').cytoscape('get');
            cy.toggleddb();
          }
          } >Toggle Data Dependencies</MenuItem>
          <MenuItem eventKey='2' onClick={ () => {
            var cy = $('#cy').cytoscape('get');
            cy.togglecontrolflow();
          }
          } >Toggle Control Flow</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey='3' onClick={()=>{
            var cy = $('#cy').cytoscape('get');
            cy.reloadJson();
          }
          } >Reset</MenuItem>
        </DropdownButton>
      </DropdownButton>

    ) : undefined;

    let create = !this.props.inapp ? (
      <NavItemLink to="create">Create New</NavItemLink>
    ) : undefined;

    return (
      <Navbar brand="Slang" fixedTop fluid inverse >
        <Nav>
          <NavItemLink to="home">Home</NavItemLink>

          {create}
          {viewmenu}
          {commandmenu}

        </Nav>
      </Navbar>
    )
  }
}

class Header extends React.Component {

  render() {

    let create = !this.props.inapp ? (
      <LinkContainer to="/create">
        <NavItem eventKey={1}>Create New</NavItem>
      </LinkContainer>
    ) : undefined;

    let viewmenu = this.props.inapp ? (
      <NavDropdown eventKey={2} title="View" id="collapsible-navbar-dropdown">
        <MenuItem eventKey="1" onSelect={ () => {ProjectActions.toggleAccordion()} } >Project</MenuItem>
        <MenuItem eventKey="2" onSelect={ () => {SourceCodeActions.toggleAccordion()} }>Source Code</MenuItem>
        <MenuItem eventKey="3" onSelect={ () => {GraphActions.toggleAccordion()} }>Features</MenuItem>
        <MenuItem eventKey="4" onSelect={ () => {BBActions.toggleAccordion()} }>Basic Block</MenuItem>
        <MenuItem eventKey="5" onSelect={ () => {DDBActions.toggleAccordion()} }>Data Dependence Block</MenuItem>
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
    )
  }
}

export { Header }
