import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { DropdownButton, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <div>
            <Navbar bg='light' expand='lg' className='px-3'>
                <Navbar.Brand >
                    <Link to='/home' >
                        <span>Life Optimizer</span>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto ml-2'>
                        <Nav.Link >
                            <Link to='/home'>
                                <span>Home</span>
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to='/forms'>
                                <span> Forms</span>
                            </Link>
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <DropdownButton menuAlign={{ lg: 'down' }} title='User' key='down' id={`dropdown-button-drop-down`} drop='left' variant='secondary'>
                            <Nav.Link>
                                <Link to='/dashboard'>
                                    <span>Dashboard</span>
                                </Link>
                            </Nav.Link>
                            <NavDropdown.Divider />
                            <Nav.Link><Link to='/Logout'>Logout</Link></Nav.Link>
                        </DropdownButton>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default NavBar;
