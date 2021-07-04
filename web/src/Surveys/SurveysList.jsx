/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axiosInstance from '../axios/axiosConfig';
import { Button, Card, Col, ListGroup, Nav, ProgressBar, Row, Tab } from 'react-bootstrap';


class SurveysList extends Component {
	state = {
		user: {},
		surveysList: [],
		performedSurvey: [],
		categoriesList: [],
		surveyId: '',
		surveyCat: '',
		surveyQuestions: [],
		q: [],
		errors: {},
		showError: null,
		questionGet: false,
		current: 0,
		pages: 0
	};
	componentDidMount() {
		let user = JSON.parse(localStorage.getItem('user'));
		const token = JSON.parse(localStorage.getItem('authToken'))
		this.setState({ user: user, token: token });
		axiosInstance
			.get('/posts/survey', { headers: { token: token } })
			.then(async (res) => {
				const { surveysList, performedSurvey, categoriesList } = res.data;
				console.log(categoriesList)
				await this.setState({
					surveysList: surveysList,
					performedSurvey: performedSurvey,
					categoriesList: categoriesList
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}
	componentDidUpdate() {
		const { token } = this.state
		axiosInstance
			.get('/posts/survey', { headers: { token: token } })
			.then(async (res) => {
				const { surveysList, performedSurvey, categoriesList } = res.data;
				console.log(categoriesList)
				await this.setState({
					surveysList: surveysList,
					performedSurvey: performedSurvey,
					categoriesList: categoriesList
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	show() {
		if (this.state.surveyId === '') {
			return this.surveyList2()
		}
		else {
			return this.showQuestions()
		}
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
	getList() {
		const { surveysList, user, questionGet, performedSurvey } = this.state;
		let puser = true
		return (
			<div className='d-flex mx-3 my-3 flex-column w-auto' >
				<div className='d-flex flex-column justify-content-between '>
					<div className='mb-3'>
						<h2>Survey</h2>
					</div>
					<div className='d-flex flex-shrink-1 flex-wrap'>
						{surveysList.map((survey, index) => {
							puser = true;
							if (survey.user.length === 0) {
								return (
									<div key={index} className=' bg-danger border rounded-lg w-auto d-flex pt-3 px-2
										mr-2 mb-2 d-flex align-items-center'>
										<div className='d-flex flex-column mr-2'>
											<p className='surveyName text-light font-weight-bold'>
												{survey.title}
											</p>
											<p className='surveyInfo text-light'>
												{survey.description}
											</p>
										</div>
										<div className='surveyStatus ml-2 d-flex  align-content-center'>
											<button className='btn btn-success text-light' id='PerformBtn' onClick={async () => {
												await this.setState({ surveyId: survey._id, surveyCat: survey.category, questionGet: true });
												this.getQuestion();
											}}>
												<span>Perform</span>
											</button>
										</div>
									</div>
								)
							} else {
								return (
									<div key={index}
										className=' bg-danger border rounded-lg w-auto d-flex p-2 align-items-center mb-2 mr-2'>
										<div className='d-flex flex-column mr-2'>
											<p className='surveyName text-light'>
												{survey.title}
											</p>
											<p className='surveyInfo text-light'>
												{survey.description}
											</p>
										</div>
										<div className='surveyStatus ml-2'>
											{performedSurvey.map((performedSurvey) => {
												return performedSurvey.surveyId === survey._id
													?
													performedSurvey.performed.map((performed, index) => {
														if (performed.user === user._id) {
															puser = false;
															return (
																<label className='btn btn-primary font-weight-bold' key={index} disable='true'>
																	Performed
																</label>
															)
														}
													})
													:
													<div></div>
											})}
											{puser ?
												<button className='btn btn-danger' id='PerformBtn' onClick={async () => {
													await this.setState({ surveyId: survey._id, surveyCat: survey.category });
													this.getQuestion();
												}}>
													<span>Perform</span>
												</button>
												: <div></div>
											}
										</div>
									</div>
								)
							}
						})}
					</div>
				</div>
			</div>
		);
	}

	showQuestions() {
		let { q, current, pages } = this.state;
		console.log("pages " + pages);
		console.log("current " + current);
		let count = 0;
		if (current === 1) count = 1;
		if (current > 1) count = (current * 2) - 1;

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
							<span> Next </span>
						</button>

					}
				</div>
			</div >
		)
	}

	surveyList2() {
		const { categoriesList, performedSurvey, user } = this.state;
		let puser = true
		return (
			<div className='px-5 py-3 justify-content-center w-100'>
				<Tab.Container id="left-tabs-example" className='d-flex justify-content-between'>
					<Row className='d-flex  justify-content-between flex-wrap'>
						<Col sm={2} className='w-100 '>
							<div className='my-1'>
								<h4 className='text-nowrap'>Survey Categories</h4>
							</div>
							<Card>
								<div className='d-flex border-none outline-none bg-light rounded-lg py-1' id='categoriesList'>
									{categoriesList.map((category, index) => {
										return (
											<Nav.Link eventKey={category._id} key={index} className='text-dark text-nowrap px-2'>{category.title}</Nav.Link>
										)
									})}
								</div>
							</Card>
						</Col>
					</Row>
					<Row className='d-flex  justify-content-between flex-wrap'>
						<Col className='w-100'>
							<Tab.Content>
								<div className='d-flex  my-3 flex-column w-auto' >
									<div className='d-flex flex-column justify-content-between '>
										<div className='mb-3'>
											<h2>Survey</h2>
										</div>

										<div className='d-flex flex-shrink-1 flex-wrap'>
											{categoriesList.map((category, index) => {
												return (
													<Tab.Pane eventKey={category._id} className='d-flex' key={index}>
														{category.survey.map((survey, index) => {
															puser = true;
															if (survey.user.length === 0) {
																return (
																	<div key={index} className='bg-danger border rounded-lg w-auto d-flex pt-3 px-2 mr-2 mb-2 d-flex align-items-center'>
																		<div className='d-flex flex-column mr-2'>
																			<p className='surveyName text-light font-weight-bold'>
																				{survey.title}
																			</p>
																			<p className='surveyInfo text-light'>
																				{survey.description}
																			</p>
																		</div>
																		<div className='surveyStatus ml-2 d-flex  align-content-center'>
																			<button className='btn btn-success text-light' id='PerformBtn' onClick={async () => {
																				await this.setState({ surveyId: survey._id, surveyCat: survey.category, questionGet: true });
																				this.getQuestion();
																			}}>
																				<span>Perform</span>
																			</button>
																		</div>
																	</div>
																)
															} else {
																return (
																	<div key={index}
																		className=' bg-danger border rounded-lg w-auto d-flex p-2 align-items-center mb-2 mr-2'>
																		<div className='d-flex flex-column mr-2'>
																			<p className='surveyName text-light'>
																				{survey.title}
																			</p>
																			<p className='surveyInfo text-light'>
																				{survey.description}
																			</p>
																		</div>
																		<div className='surveyStatus ml-2'>
																			{performedSurvey.map((performedSurvey) => {
																				return performedSurvey.surveyId === survey._id
																					?
																					performedSurvey.performed.map((performed, index) => {
																						if (performed.user === user._id) {
																							puser = false;
																							return (
																								<label className='btn btn-primary font-weight-bold' key={index} disable='true'>
																									Performed
																								</label>
																							)
																						}
																					})
																					:
																					<div></div>
																			})}
																			{puser ?
																				<button className='btn btn-danger' id='PerformBtn' onClick={async () => {
																					await this.setState({ surveyId: survey._id, surveyCat: survey.category });
																					this.getQuestion();
																				}}>
																					<span>Perform</span>
																				</button>
																				: <div></div>
																			}
																		</div>
																	</div>
																)
															}
														})}
													</Tab.Pane>
												)
											})}
										</div>

									</div>
								</div>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</div>
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
	render() {
		return this.show();
	}
}

export default SurveysList;