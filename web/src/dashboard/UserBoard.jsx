import React, { Component } from 'react'
// import { Button, Card, Col, Nav, Row, Tab, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axiosInstance from '../axios/axiosConfig';
// import Modal from 'react-modal';
import navVector from '../images/navVector.svg';
import './dashboard.css'

class UserBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: '',
			user: {},
			pharmacies: [],
			pharmacyId: '',
			laboratories: [],
			laboratoryId: '',
			errors: {},
			showError: null,
		};
		this.navButton = this.navButton.bind(this);
		this.pharmacy = this.pharmacy.bind(this)
	}

	async componentDidMount() {
		await this.setState({
			token: JSON.parse(sessionStorage.getItem('authToken')),
			user: JSON.parse(sessionStorage.getItem('user'))
		})
		axiosInstance.get('/dashboard', { headers: { authorization: this.state.token } })
			.then(async res => {
				const { pharmacies, laboratories } = res.data
				await this.setState({ pharmacies: pharmacies, laboratories: laboratories })
			})
			.catch(err => { console.error(err); })
	}

	// componentDidUpdate() {
	// 	axiosInstance.get('/dashboard', { headers: { authorization: this.state.token } })
	// 		.then(async res => {
	// 			const { pharmacies, laboratories } = res.data
	// 			await this.setState({ pharmacies: pharmacies, laboratories: laboratories })
	// 		})
	// 		.catch(err => { console.error(err); })
	// }

	navButton() {
		return (
			<div className='d-flex align-items-left flex-wrap  justify-content-center mt-2 h-25'>
				<Link to='/pharmacies' className='text-light'>
					<div className='d-flex px-3 py-2 justify-content-space-between align-items-center mr-5 bg-warning border-1 rounded'>
						<img src={navVector} className='navVector mr-2' alt='navVector' />
						<span className='font-weight-bold'>Pharmacies</span>
					</div>
				</Link>

				<Link to='/laboratories' className='text-light'>
					<div className='d-flex px-3 py-2 justify-content-space-between align-items-center mr-5 bg-danger border-1 rounded'>
						<img src={navVector} className='navVector mr-2' alt='navVector' />
						<span className='font-weight-bold'>Laboratories</span>
					</div>
				</Link>
			</div>
		);
	}

	pharmacy() {
		return (
			<div>
				<div className='mt-2 d-flex align-items-flex-start flex-column mx-5 h-25 '>
					<div className="mb-3">
						<h4>Latest Pharmacies</h4>
					</div>
					<div className='d-flex align-items-center justify-content-space-between mb-3' id='pharmacyList'>
						{this.state.pharmacies ?
							this.state.pharmacies.map((pharmacy, index) => {
								return (
									<div key={index} className=' bg-warning border rounded-lg w-auto d-flex pt-3 px-2
										mx-2 d-flex align-items-center'>
										<div className='d-flex flex-column mr-5'>
											<p className='text-light font-weight-bold test-nowrap font-italic'>
												{pharmacy.name}
											</p>
											<p className='text-light text-nowrap'>
												{pharmacy.city.name}
											</p>
											<p className='text-light text-nowrap'>
												{pharmacy.area.name}
											</p>
										</div>
										<div className='ml-2 mb-4 d-flex  align-content-center'>
											<button className='btn btn-danger text-daek font-weight-bold' id='BuyBtn' onClick={async () => {
												// await this.setState({ surveyId: survey._id, surveyCat: survey.category, questionGet: true });
												// this.getQuestion();
											}}>
												<span>Buy Medicines</span>
											</button>
										</div>
									</div>

								)
							})
							:
							<div>No Pharmacies</div>
						}
					</div>
				</div >

				<div className='mt-2 d-flex align-items-flex-start flex-column mx-5 h-25 '>
					<div className="mb-3">
						<h4>Latest Laboratories</h4>
					</div>
					<div className='d-flex align-items-center justify-content-space-between mb-3' id='pharmacyList'>
						{this.state.laboratories ?
							this.state.laboratories.map((laboratory, index) => {
								return (
									<div key={index} className=' bg-danger border rounded-lg w-auto d-flex pt-3 px-2
										mx-2 d-flex align-items-center'>
										<div className='d-flex flex-column mr-5'>
											<p className='text-light font-weight-bold test-nowrap font-italic'>
												{laboratory.name}
											</p>
											<p className='text-light text-nowrap'>
												{laboratory.city.name}
											</p>
										</div>
										<div className='ml-2 mb-4 d-flex  align-content-center'>
											<button className='btn btn-warning text-daek font-weight-bold' id='BuyBtn' onClick={async () => {
												// await this.setState({ surveyId: survey._id, surveyCat: survey.category, questionGet: true });
												// this.getQuestion();
											}}>
												<span className='text-light'>Register test</span>
											</button>
										</div>
									</div>

								)
							})
							:
							<div>No Laboratories</div>
						}
					</div>
				</div >
			</div>

		)
	}


	render() {
		return (
			<div className='mx-3' >
				{this.navButton()}
				{this.pharmacy()}
				{/* {this.forms()} */}
			</div>
		)
	}
}

export default UserBoard;