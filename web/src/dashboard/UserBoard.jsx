import React, { Component } from 'react'
import { Button, Card, Col, Nav, Row, Tab, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import axiosInstance from '../axios/axiosConfig';
import Modal from 'react-modal';
import navVector from '../images/navVector.svg';
import './dashboard.css'

class UserBoard extends Component {
	state = {
		token: '',
		user: {},
		pharmacies: [],
		pharmacyId: '',
		laboratories: [],
		laboratoryId: '',
		current: 0,
		pages: 0,

		pageLoad: true,
		activeForm: null,
		activeSubPlan: {},
		file: '',
		filename: 'No File Uploaded',
		uploadedFile: {},
		modelIsOpen: false,
		notes: "",

		errors: {},
		showError: null,
	}

	async componentDidMount() {
		await this.setState({
			token: JSON.parse(sessionStorage.getItem('authToken')),
			user: JSON.parse(sessionStorage.getItem('user'))
		})
		axiosInstance.get('/dashboard', { headers: { token: this.state.token } })
			.then(async res => {
				console.log(res.data)
			})
			.catch(err => { console.error(err); })
	}

	componentDidUpdate() {
		axiosInstance.get('/dashboard', { headers: { token: this.state.token } })
			.then(async res => {
				console.log(res.data)
			})
			.catch(err => { console.error(err); })
	}
	componentWillUnmount() {
		this.setState({
			token: '',
			user: {},
		})

	}

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
		const { pharmacies } = this.state;
		console.log(pharmacies)

		return (
			<div className='mt-2 d-flex align-items-flex-start flex-column '>
				<div>
					<h4>Latest Pharmacies</h4>
				</div>
				<div className='d-flex align-items-center justify-content-space-between mb-3' id='pharmacyList'>

				</div>
			</div>
		)
	}
	getQuestion() {
		console.log('getQuestion')
		let { surveyId, token, current } = this.state;
		const count = current + 1;
		axiosInstance
			.get('/posts/survey/question/' + surveyId + '/' + count, { headers: { token: token } })
			.then(async (res) => {
				console.log(res.data)
				const { surveyQuestions, pages } = res.data;
				await this.setState({ surveyQuestions: surveyQuestions, pages: pages, current: count });
			})
			.catch((error) => {
				console.error(error);
			});
		return this.showQuestions();
	}

	showQuestions() {
		let { q, current, pages } = this.state;
		console.log("pages " + pages);
		console.log("current " + current);
		let count = 0;
		if (current === 1) count = 1
		if (current > 1) count = (current * 2) - 1


		return (
			<div className='w-75 d-flex flex-column justify-content-center'>
				<div className=' d-flex flex-column  w-100 align-items-center'>
					{this.state.surveyQuestions.map((question, index) => {
						let n = index + count
						return (
							<div className='d-flex flex-column w-50 my-3' key={index}>
								<div className='d-flex mt-3'>
									<h5 className='bg-light py-1 px-2 border border-light rounded-circle'>{n}: </h5>
									<h5 className='ml-3 p-1' name='QuestionStatement'>	{question.questionStatement}			</h5>
								</div>
								<div className='mt-3 w-100 align-self-center d-flex'>
									<select type="text" name="option" id='option'
										className="border border-2 select2-selection select2-selection--multiple w-100 bg-white p-2 rounded" required
										onChange={(e) => {
											document.getElementById('defaultOption').style.display = 'none'
											q[index] = { surveyQuestion: question._id, option: e.target.value }
											this.setState({ q: q })
										}}>
										<option default id='defaultOption'></option>
										{question.option.map((option, index2, next) => {
											return (<option value={option} key={index2} >{option}</option>);
										})}
									</select>
								</div>
							</div>
						)
					})}
				</div>
				<div>
					{current !== pages ?
						<button className="btn bg-danger text-white px-3 py-2 float-right mr-5 mt-3" type="btn"
							onClick={(e) => {
								e.preventDefault();
								this.getQuestion()
							}}>
							<span> Next </span>
						</button>
						:
						<button className="btn bg-danger text-white px-3 py-2 float-right mr-5 mt-3" type="btn"
							onClick={(e) => {
								e.preventDefault();
								this.submitQuestion()
							}}>
							<span> Submit </span>
						</button>

					}
				</div>
			</div >
		)
	}
	submitQuestion() {
		let { q, surveyId, surveyCat, token } = this.state;
		let user = this.state.user._id;
		axiosInstance
			.post('/posts/survey/' + surveyId, { q, user, surveyCat }, { headers: { token: token } })
			.then((res) => {
				this.setState({ surveyId: '', surveysList: [] })
			})
			.catch((error) => {
				if (error.response.status === 422) {
					let errors = {};
					error.response.data.map((error) => {
						errors[error.path[0]] = error.message;
						return null;
					});
					this.setState({ errors: errors, showError: error.response.data, surveyId: '', surveysList: [] });
				}
			});
	}

	forms() {
		const { forms } = this.state;
		return (
			<div className='mt-2 d-flex flex-column '>
				<div>
					<h4>Latest Forms</h4>
				</div>
				<div className=' mb-3' id='formsList'>
					<div className='d-flex'>
						{forms.map((forms, index) => {
							return (
								<div key={index}>
									{forms.form.map((form, index) => {
										return (
											<div key={index} className=' bg-danger rounded-lg w-auto d-flex pt-3 px-2 mr-2 mb-2 d-flex align-items-center'>
												<div className='d-flex flex-column mr-5'>
													<p className='surveyName text-light font-weight-bold'>
														{form.title}
													</p>
													<p className='surveyInfo text-light'>
														{form.category.title}
													</p>
												</div>
												<div className='surveyStatus ml-3 mb-3 d-flex  align-content-center'>
													<button className='btn btn-success text-light font-weight-bold' id='PerformBtn' onClick={async () => {
														this.setState({ activeForm: form })
														this.formDetails();
													}}>
														<span>Perform</span>
													</button>
												</div>
											</div>
										)
									})}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		)
	}

	formDetails() {
		const { activeForm, filename } = this.state;
		console.log(activeForm)
		return (
			activeForm !== null ?
				<div className='px-3 py-3' >
					<Tab.Container id="left-tabs-example" defaultActiveKey="survey-list" className='d-flex justify-content-between'>
						<Row className='d-flex justify-content-between flex-wrap'>
							<Col sm={1} className='w-auto '>
								<Card>
									<ListGroup variant="flush">
										{activeForm.subPlan.map((subPlan, index) => {
											return (
												<ListGroup.Item key={index}>
													<Nav.Item>
														<Nav.Link eventKey={subPlan._id} className='text-dark text-nowrap py-2 px-0' onClick={() => {
															this.setState({ activeSubPlan: subPlan._id })
														}}>{subPlan.name}</Nav.Link>
													</Nav.Item>
												</ListGroup.Item>
											)
										})}
									</ListGroup>
								</Card>
							</Col>
							<Col className='w-100'>
								<Tab.Content>
									{activeForm.subPlan.map((subPlan, index) => {
										return (
											<Tab.Pane eventKey={subPlan._id}>
												<div className='px-2 d-flex flex-column  align-items-center' id='survey-list'>
													<h2>{subPlan.name}</h2>
													<div className='w-100 my-2'>
														{/* <ProgressBar animated now={50} variant='danger'></ProgressBar> */}
													</div>
													<Card className='w-100'>
														<Card.Header className='d-flex justify-content-between'>
															<h3>{subPlan.name}</h3>
															<Button variant='success' onClick={() => { this.Submit() }}>
																<span>Update</span>
															</Button>
														</Card.Header>
														<Card.Body>
															<div className='mb-2'>
																<h4>Description</h4>
																<span>{subPlan.description}</span>
															</div>
															<div className='my-2'>
																<h4>Templates</h4>
																<div className='card '>
																	<div className='card-body '>
																		{this.state.activeForm.template.map((template, index) => {
																			return template.subPlan === subPlan._id ?
																				<a href={template.file.path} download target="_blank"
																					rel="noopener noreferrer">
																					<Button variant='info'>Download</Button></a>
																				:
																				<div></div>
																		})}
																	</div>
																</div>
															</div>
															<div className='my-2'>
																<h4>Service Provider</h4>
																<div className='card '>
																	{this.state.activeForm.provider.map((provider, index) => {
																		return provider.subPlan === subPlan._id ?
																			<div className='card-body d-flex  flex-column align-items-center'>
																				<img src="/provider.png" alt="provider" />
																				<p>{provider.name}</p>
																				<p>{provider.email}</p>
																				<p>{provider.contact}</p>
																				<p>{provider.intro}</p>
																			</div>
																			:
																			<div></div>
																	})}
																</div>
															</div>
															<div className='my-2'>
																<h4>Saved Files</h4>
																<div className='d-flex '>
																	<Button variant='success' className='py-1 px-2 mr-3 h-25' onClick={async () => {
																		await this.setState({ modelIsOpen: true, filename: "No File Uploaded" })
																	}}><span>Upload</span></Button>
																	<div>
																		<div className='mt-4'>
																			<h4 className='display-4 text-center mb-4'> </h4>
																			<Modal isOpen={this.state.modelIsOpen} id='model' ariaHideApp={false}>
																				{this.FileUpload()}
																			</Modal>
																		</div>
																	</div>
																	{
																		filename === 'No File Uploaded' ?
																			<div className="alert alert-danger w-25 py-1 px-2">
																				<strong className='text-nowrap'>{this.state.filename}</strong>
																			</div>
																			:
																			<div className="alert alert-success w-25  py-1 px-2">
																				<strong className='text-nowrap'>{this.state.filename}</strong>
																			</div>
																	}
																</div>
															</div>
															<div className='my-2'>
																<h4>Note</h4>
																<textarea type="test" name="Note" className="form-control border border-secondary mt-2" rows="4"
																	id="exampleFormControlTextarea1" onChange={async (e) => {
																		await this.setState({ notes: e.target.value })
																	}}></textarea>
															</div>
														</Card.Body>
													</Card>
												</div>
											</Tab.Pane>
										)
									})}
								</Tab.Content>
							</Col>
						</Row>
					</Tab.Container>
				</div >
				:
				<div>Form Details</div>
		);
	}

	FileUpload() {
		let { filename } = this.state;
		return (
			<div>
				<button type="btn " className="close" data-dismiss="modal" aria-label="Close" onClick={(e) => {
					e.preventDefault();
					this.setState({ modelIsOpen: false })
				}} >
					<span aria-hidden="true">&times;</span>
				</button>
				<div className='fileUpload'>
					<div className='mb-4'>
						<input type='file' placeholder={filename} accept=".pdf" id='customFile' className='customFile'
							onChange={async (e) => {
								await this.setState({
									file: e.target.files[0], filename: e.target.files[0].name
								});
							}} />
						<label className='custom-file-label' htmlFor='customFile'>{filename}</label>
					</div>
				</div>
				<input type='button' value='Upload' className='button upload-btn' onClick={(e) => {
					e.preventDefault();
					this.setState({ modelIsOpen: false })
				}} />
			</div>
		);
	}

	async Submit() {
		const { notes, activeForm, activeSubPlan, token, file } = this.state;
		const formData = new FormData()
		await formData.append('file', file);
		await formData.append('activeForm', activeForm._id);
		await formData.append('activeSubPlan', activeSubPlan);
		await formData.append('notes', notes);
		try {
			await axiosInstance.post('/posts/form-save/' + this.state.activeForm._id, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'token': token
				},
			}).then(async (res) => {
				document.getElementById('save').style.display = 'none';
				document.getElementById('saved').style.display = 'flex'
			}).catch((err) => { console.error(err); })

		} catch (err) {
			if (err.response.status === 500) { this.setState.message('There was a problem with the server'); }
			else { this.setState.message(err.response.data.msg); }
			console.error(err);
		}
	};


	render() {
		const { surveyId, activeForm } = this.state;
		if (surveyId === '' && activeForm === null) {
			return (
				<div className='mx-3' >
					{this.navButton()}
					{this.survey()}
					{/* {this.forms()} */}
				</div>
			)
		}
		else if (surveyId !== '' && activeForm === null) {
			// return this.showQuestions()
		}
		else if (surveyId === '' && activeForm !== null) {
			// return this.formDetails()
		}
		else {
			return <div>Hello</div>
		}
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