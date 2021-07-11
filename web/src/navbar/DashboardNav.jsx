import React from 'react';
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { DropdownButton, Navbar } from 'react-bootstrap';

const DashboardNav = () => {
	return (
		<div className='bg-gradient-primary w-100 d-flex justify-content-center h-0'>
			<Navbar bg='gradient-primary' expand='lg' className=' w-75'>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Navbar.Brand>
						<Link to='/home' >
							<b className='text-dark'>Medi Home</b>
						</Link>
					</Navbar.Brand>
					<Nav className='mr-auto'>
						<Link to='/dashboard'>
							<li className='nav-item mx-2 text-dark '>Dashboard </li>
						</Link>
						<Link to='/pharmacies'>
							<li className='nav-item text-dark mx-2'>
								<span>Pharmacies</span>
							</li>
						</Link>
						<Link to='/laboratories'>
							<li className='nav-item text-dark mx-2'>
								<span>Laboratories</span>
							</li>
						</Link>
						<Link to='/doctors'>
							<li className='nav-item text-dark mx-2'>
								<span>Doctors</span>
							</li>
						</Link>
					</Nav>
				</Navbar.Collapse>
				<Nav>
					<Link to='/login' className='nav-item text-dark align-self-center' onClick={() => { sessionStorage.clear(); window.location.replace('/') }}>
						<span>Logout</span>
					</Link>
					<DropdownButton menuAlign={{ lg: 'down' }} title='User' key='down' id={`dropdown-button-drop-down`} drop='down' variant='gradient-primary' className='w-auto border border-secondary bg-gradient-primary'>
						<Link to='/login' className='nav-item text-dark mx-2' onClick={() => { sessionStorage.clear(); window.location.replace('/') }}>
							<span>Logout</span>
						</Link>
					</DropdownButton>
				</Nav>
			</Navbar>
		</div>
	);
};

export default DashboardNav;
