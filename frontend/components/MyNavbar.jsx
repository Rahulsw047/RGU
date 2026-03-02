import React from "react";
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Link } from "react-router-dom";

const MyNavbar=()=>{
    return(
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Ritika Gruh Udyog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">{/* ms-auto links ko right side dhakel dega */}
                        <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/employees">Employees</Nav.Link>
                        <Nav.Link as={Link} to="/items">Items</Nav.Link>
                        <Nav.Link as={Link} to="/work-entry">Work Entry</Nav.Link>
                        <Nav.Link as={Link} to="/detailed-report">Reports</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;