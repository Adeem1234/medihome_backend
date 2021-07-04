/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Button, Card, Col, ListGroup, Nav, ProgressBar, Row, Tab } from 'react-bootstrap';
import axiosInstance from '../axios/axiosConfig';
import Modal from 'react-modal';

class UserForms extends Component {
    state = {
        forms: [],
        pageLoad: true,
        activeForm: {},
        activeSubPlan: {},
        file: '',
        filename: 'No File Uploaded',
        uploadedFile: {},
        modelIsOpen: false,
        notes: "",
        token: ''
    }
    async componentDidMount() {
        const authToken = JSON.parse(localStorage.getItem('authToken'))
        await this.setState({ token: authToken })
        axiosInstance.get('/posts/forms', { headers: { token: authToken } })
            .then(async (res) => {
                this.setState({ forms: res.data.userForms })
            })
            .catch(err => {
                console.error(err)
            })
    }
    render() {
        const { pageLoad } = this.state;
        return pageLoad ?
            this.formList()
            :
            this.formDetails()
    }
    formList() {
        const { forms } = this.state;
        return (
            <div className='px-5 py-3 justify-content-center'>
                <Tab.Container id="left-tabs-example" defaultActiveKey="survey-list" className='d-flex justify-content-between'>
                    <Row className='d-flex justify-content-between flex-wrap'>
                        <Col sm={1} className='w-auto '>
                            <Card >
                                <ListGroup variant="flush">
                                    {forms.map((form, index) => {
                                        return (
                                            <ListGroup.Item key={index}>
                                                <Nav.Item className='mb-2'>
                                                    <Nav.Link eventKey={form._id} className='text-dark text-nowrap p-0'>{form.title}</Nav.Link>
                                                </Nav.Item>
                                            </ListGroup.Item>
                                        )
                                    })}
                                </ListGroup>
                            </Card>
                        </Col>
                        <Col className='w-100'>
                            <Tab.Content>
                                {forms.map((form, index) => {
                                    return (<div key={index}>
                                        <Tab.Pane eventKey={form._id}>
                                            <Card>
                                                <Card.Header>Progress</Card.Header>
                                                <Card.Body>
                                                    <div className='mb-3 mt-1'>
                                                        <h4>Totol Progress</h4>
                                                        <div className='w-100 my-2'>
                                                            <ProgressBar animated now={50} variant='info' ></ProgressBar>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4>Plans Progress</h4>
                                                        <div className='card'>
                                                            <div className='card-body'>
                                                                {form.plan.map((plan, index) => {
                                                                    return (<div>
                                                                        <div className='w-100 my-2'>
                                                                            <b>{plan.title} </b>
                                                                            <ProgressBar animated now={50} variant='info' ></ProgressBar>
                                                                        </div>
                                                                    </div>)
                                                                })}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                                <Card.Footer>
                                                    <Button variant='success' onClick={async () => {
                                                        await this.setState({ activeForm: form, pageLoad: false });
                                                    }}> Perform
                                                    </Button>
                                                </Card.Footer>
                                            </Card>
                                        </Tab.Pane>
                                    </div>)
                                })}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        )
    }

    formDetails() {
        const { activeForm, filename } = this.state;
        return (
            <div className='px-5 py-3'>
                <Tab.Container id="left-tabs-example" defaultActiveKey="survey-list" className='d-flex justify-content-between'>
                    <Row className='d-flex justify-content-between flex-wrap'>
                        <Col sm={1} className='w-auto '>
                            <Card >
                                <ListGroup variant="flush">
                                    {activeForm.subPlan.map((subPlan, index) => {
                                        return (
                                            <ListGroup.Item key={index}>
                                                <Nav.Item>
                                                    <Nav.Link eventKey={subPlan._id} className='text-dark text-nowrap p-0' onClick={() => {
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
                                                    <ProgressBar animated now={50} variant='danger' ></ProgressBar>
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
                                                                    {activeForm.template.map((template, index) => {
                                                                        return template.subPlan === subPlan._id ?
                                                                            <a href={template.file.path} download target="_blank" rel="noopener noreferrer">
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
                                                                {activeForm.provider.map((provider, index) => {
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
                                                                <div >
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
                                                            <textarea type="test" name="Note" className="form-control border border-secondary mt-2"
                                                                id="exampleFormControlTextarea1" rows="4" onChange={async (e) => {
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
            </div>
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
                        <input type='file' placeholder={filename}
                            accept=".pdf "
                            id='customFile' className='customFile'
                            onChange={async (e) => {
                                await this.setState({ file: e.target.files[0], filename: e.target.files[0].name });
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
}

export default UserForms;