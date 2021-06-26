import React from 'react';
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { DropdownButton, Navbar } from 'react-bootstrap';

const PharmacyNavBar = () => {
  return (
    <div className='bg-light w-100 d-flex justify-content-center h-0'>
      <Navbar bg='light' expand='lg' className=' w-75'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Navbar.Brand>
            <Link to='/pharmacy/dashboard' >
              <b className='text-dark'>Medi Home</b>
            </Link>
          </Navbar.Brand>
          <Nav className='mr-auto'>
            <Link to='/pharmacy/dashboard'>
              <li className='nav-item mx-2 text-dark '>Dashboard </li>
            </Link>
            <Link to='/pharmacy/medicine'>
              <li className='nav-item text-dark mx-2'>
                <span>Medicines</span>
              </li>
            </Link>
            <Link to='/pharmacy/stock'>
              <li className='nav-item text-dark mx-2'>
                <span>Stock</span>
              </li>
            </Link>
            <Link to='/pharmacy/orders'>
              <li className='nav-item text-dark mx-2'>
                <span>Orders</span>
              </li>
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <DropdownButton menuAlign={{ lg: 'down' }} title='User' key='down' id={`dropdown-button-drop-down`} drop='down' variant='light' className='w-auto'>
            <Link to='/login' className='nav-item text-dark mx-2' onClick={() => { localStorage.clear(); window.location.replace('/') }}>
              <span>Logout</span>
            </Link>
          </DropdownButton>
        </Nav>
      </Navbar>
    </div>
  );
};

export default PharmacyNavBar;
