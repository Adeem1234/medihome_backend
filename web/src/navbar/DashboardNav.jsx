import React from 'react';
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { DropdownButton, Navbar } from 'react-bootstrap';

const DashboardNav = () => {
	return (
		<div className='bg-light w-100 d-flex justify-content-center h-0'>
			<Navbar bg='light' expand='lg' className=' w-75'>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Navbar.Brand>
						<Link to='/home' >
							<b className='text-dark'>Life Optimizer</b>
						</Link>
					</Navbar.Brand>
					<Nav className='mr-auto'>
						<Link to='/dashboard'>
							<li className='nav-item mx-2 text-dark '>Dashboard </li>
						</Link>
						<Link to='/surveys'>
							<li className='nav-item text-dark mx-2'>
								<span>Surveys</span>
							</li>
						</Link>
						<Link to='/forms'>
							<li className='nav-item text-dark mx-2'>
								<span>Forms</span>
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

export default DashboardNav;