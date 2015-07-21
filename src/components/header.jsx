import React from 'react';
import { DropdownMenu, Nav, Navbar, NavItem, DropdownButton, MenuItem } from 'react-bootstrap';
import { DDBActions, BBActions, SourceCodeActions } from '../actions/Actions.js';

class MyNavbar extends React.Component {
  render() {

    return (
<nav className="navbar navbar-inverse navbar-default navbar-fixed-top">
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="#">Slang</a>
    </div>


    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav">
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">View<span className="caret"></span></a>
          <ul className="dropdown-menu" role="menu">
            <li><a href="#" id="projectitem">Project</a></li>
            <li><a href="#" id="sourceitem">Source Code</a></li>
            <li><a href="#" id="bbitem">Basic Block</a></li>
            <li><a href="#" id="ddbitem">Data Dependence Block</a></li>
          </ul>
        </li>
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Command<span className="caret"></span></a>
          <ul className="dropdown-menu" role="menu">
            <li className="dropdown-submenu">
                <a tabIndex="-1" href="#">System Dependence Graph</a>
                <ul className="dropdown-menu">
                  <li><a href="#" onclick="cy.load(graphJson)">Reset</a></li>
                  <li><a href="#" onclick="cy.toggleddb()">Toggle Data Dependencies</a></li>
                  <li><a href="#" onclick="cy.togglecontrolflow()">Toggle Control Flow</a></li>
                </ul>
              </li>
          </ul>
        </li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Settings</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Help</a></li>
      </ul>
      <form className="navbar-form navbar-right">
        <input type="text" className="form-control" placeholder="Search..." />
      </form>
    </div>
  </div>
</nav>
)

  }
}

class MyNavbar2 extends React.Component {

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
    return (
      <Navbar brand="Slang" fixedTop fluid inverse>
        <Nav>
          <DropdownButton eventKey={1} title='View' onSelect={this.closeMenu}>
            <MenuItem eventKey='1' onClick={ () => {} } >Project</MenuItem>
            
            <MenuItem eventKey='2' onClick={ () => {
              SourceCodeActions.toggleAccordion()
              }
            }>Source Code</MenuItem>

            <MenuItem eventKey='3' onClick={ () => {
              BBActions.toggleAccordion()
              }
            }>Basic Block</MenuItem>

            <MenuItem eventKey='4' onClick={() => {
              DDBActions.toggleAccordion()
              }
            }>Data Dependence Block</MenuItem>
          </DropdownButton>
          <DropdownButton eventKey={2} title='Command' onSelect={this.closeMenu}>
            
            <DropdownButton className="dropdown-submenu" navItem noCaret 
              eventKey={3} title='System Dependence Graph'
            >
              <MenuItem eventKey='1'>Toggle Data Dependencies</MenuItem>
              <MenuItem eventKey='2'>Toggle Control Flow</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey='3'>Reset</MenuItem>
            </DropdownButton>

          </DropdownButton>
        </Nav>
      </Navbar>
    )
  }
}

class Header extends React.Component {
  render() {
    return <MyNavbar2 />
  }
}

export { Header }
