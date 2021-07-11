import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { DropdownButton, Navbar } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.css'


class DashboardNav extends Component {
	state = {
		cartItems: 0
	}
	async componentDidMount() {
		let cartItems = JSON.parse(sessionStorage.getItem('cart'))
		let length = 0
		if (cartItems.length) {
			length = cartItems.lenght
		}
		await this.setState({ cartItems: length })
		console.log('cartItems' + cartItems)
	}

	render() {
		const { cartItems } = this.state
		return (
			<div className='bg-gradient-primary w-100 d-flex justify-content-center h-0'>
				<Navbar bg='gradient-primary' expand='lg' className=' w-75'>
					<Navbar.Toggle aria-controls='basic-navbar-nav text-light' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Navbar.Brand>
							<Link to='/home' >
								<b className='text-light'>Medi Home</b>
							</Link>
						</Navbar.Brand>
						<Nav className='mr-auto'>
							<Link to='/dashboard'>
								<li className='nav-item mx-2 text-light '>Dashboard </li>
							</Link>
							<Link to='/pharmacies'>
								<li className='nav-item text-light mx-2'>
									<span>Pharmacies</span>
								</li>
							</Link>
							<Link to='/laboratories'>
								<li className='nav-item text-light mx-2'>
									<span>Laboratories</span>
								</li>
							</Link>
							<Link to='/doctors'>
								<li className='nav-item text-light mx-2'>
									<span>Doctors</span>
								</li>
							</Link>
						</Nav>
					</Navbar.Collapse>
					<Nav className='text-light'>
						<div >
							{/* <FontAwesomeIcon icon={["fas", "coffee"]} />	 */}
							<i className="fas fa-shopping-cart fa-2x mr-2" id='cart-icon'></i>
							<span id='cart-count' className='text-danger font-weight-bolder'><b>{cartItems}</b></span>
						</div>
						<DropdownButton menuAlign={{ lg: 'down' }} title='User' key='down' id={`dropdown-button-drop-down`} drop='down' variant='gradient-primary' className=' p-0 mx-2 w-auto border border-light bg-gradient-primary text-light'>
							<Link to='/login' className='nav-item text-dark mx-2' onClick={() => { sessionStorage.clear(); window.location.replace('/') }}>
								<span>Logout</span>
							</Link>
						</DropdownButton>
					</Nav>
				</Navbar>
			</div>
		);
	}
}

export default DashboardNav;

