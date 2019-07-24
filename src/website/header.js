import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap' ;
import { LinkContainer } from "react-router-bootstrap";
import "./header.css" ;

class Header extends Component {

	constructor(props, context) {
		super(props, context);

		this.handleLogout = this.handleLogout.bind(this) ;
	}
	
	handleLogout = async (event) => {
		await this.props.security.signOut();
//		this.props.history.push( "/" ) ;
	}

	render() {
		return (
			<Navbar variant="dark" bg="dark" expand="lg" fixed="top">
				<LinkContainer to="/">
  	      <Navbar.Brand href="/">Quyên Lê</Navbar.Brand>
				</LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
						<NavDropdown title="My Portfolio" id="portfolio">
							<LinkContainer to="/profile">
			        	<NavDropdown.Item>Profile</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to="/pages">
        				<NavDropdown.Item>Pages</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to="/media">
      					<NavDropdown.Item>Media</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to="/albums">
     				 		<NavDropdown.Item>Albums</NavDropdown.Item>
							</LinkContainer>
							<LinkContainer to="/folders">
								<NavDropdown.Item>Folders</NavDropdown.Item>
							</LinkContainer>
				     </NavDropdown>
						<NavDropdown title="Tests" id="test">
						</NavDropdown>
          </Nav>
          <Form inline>
            <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
      	    <Button variant="outline-success" size="sm">Search</Button>
          </Form>
          <Button variant="light" onClick={this.handleLogout}>Signout</Button>
      	</Navbar.Collapse>
      </Navbar>
		);
	}
}

export default Header ;