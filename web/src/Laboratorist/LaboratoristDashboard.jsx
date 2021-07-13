/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { axiosInstance } from '../axios/axiosConfig';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { Table } from 'reactstrap';
class LaboratoristDashboard extends Component {
  state = {
    user: {},
    token: '',
    laboratories: [],
    laboratory: {},
    cart: {}
  }
  async componentDidMount() {
    await axiosInstance
      .get('/get/laboratories', {
        headers: {
          authorization: this.props.token
        }
      })
      .then(async (res) => {
        await this.setState({ laboratories: res.data.laboratories, user: this.props.user, token: this.props.token });
        console.log(this.state)

      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <Container style={{ height: '42rem' }} className="overflow-scroll w-100" id='lab'>
        {/* <Row>
            <Col lg={4}>
              <h3 style={{ color: "darkblue", textAlign: "justify" }}>Search Lab Tests</h3>
            </Col>
            <Col lg={8}><Input type="text" value="" name="search" id="search-text" placeholder="Search"></Input></Col>
          </Row> */}
        {/* <h3 style={{ textAlign: "center", color: "darkblue" }} className="mt-3" > Book Your Home Sampling / Appointment Today!</h3>
        <Form>
          <Row>
            <Col lg={6}>
              <TextField id="labname" label="Name" />
            </Col>
            <Col lg={6}>
              <TextField id="phonenumber" label="Phone Number" />
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <TextField label='Username' placeholder='Enter username' fullWidth required />
            </Col>
            <Col lg={6}>
              <TextField label='Appointment Date' placeholder='Appointment Date ' fullWidth required />
            </Col>
          </Row>
          <Row>
            <Col lg={6} > <TextField label='Details And Instruction' placeholder='Details And instructions' fullWidth required /></Col>
          </Row>
          <Row className="mt-3">
            <Col lg={6}>
              <Button className="btn btn-danger" style={{ width: "100px" }}>Send</Button>
            </Col>
          </Row>
        </Form> */}
        <div >
          <h3 className="mt-3" style={{ color: "darkblue", textAlign: "left" }} >
            Most Common Lab Tests and Rates:
          </h3>
          <Table bordered className="mt-3" style={{ width: "140%" }}>
            <thead style={{ backgroundColor: "darkblue", color: "white" }}>
              <tr>
                <th>#</th>
                <th>Test Name</th>
                <th>Sample Required</th>
                <th>Performed</th>
                <th>Reporting Day</th>
                <th>Rates</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>25-Hydroxy Vitamin-D</td>
                <td>3-5cc Clotted Blood or Serum</td>
                <td>DAILY</td>
                <td> DAILY</td>
                <td>3200</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>ANTI HCV</td>
                <td>3-5cc Clotted Blood or Serum</td>
                <td>	DAILY</td>
                <td>	DAILY</td>
                <td>	3200</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>ANTI HIV - 1&2</td>
                <td>	3-5cc Clotted Blood or Serum</td>
                <td>	DAILY</td>
                <td>	DAILY</td>
                <td>	2500</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Blood C/E (Complete, CBC)</td>
                <td>		3cc EDTA BLOOD (CBC VIAL)</td>
                <td>	DAILY</td>
                <td>	DAILY</td>
                <td>	680</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>Blood Glucose Random</td>
                <td>	Sodium Fluoride Vial (Sugar Vial)</td>
                <td>	DAILY</td>
                <td>	DAILY</td>
                <td>	300</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>CHOLESTEROL / HDL CHOLESTEROL RATIO</td>
                <td>		3-5cc Clotted Blood or Serum</td>
                <td>	DAILY</td>
                <td>	DAILY</td>
                <td>	700</td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>HbA1C (Glycosylated Hemoglobin)</td>
                <td>	3cc EDTA BLOOD (CBC VIAL)</td>
                <td>	DAILY</td>
                <td>	DAILY</td>
                <td>	1650</td>
              </tr>

              <tr>
                <th scope="row">8</th>
                <td>HBsAg (Quantitative)</td>
                <td>	3-5cc Clotted Blood or Serum</td>
                <td>	DAILY</td>
                <td>	After Three Days</td>
                <td>	3000</td>
              </tr>
              <tr>
                <th scope="row">9</th>
                <td>HBV BY PCR (Qualitative)</td>
                <td>	10cc EDTA Whole Blood</td>
                <td>	DAILY</td>
                <td>	After Two Days</td>
                <td>	7000</td>
              </tr>
              <tr>
                <th scope="row">10</th>
                <td>HBV BY PCR (Viral Load / Quantitation)</td>
                <td>	10cc EDTA Whole Blood</td>
                <td>	DAILY</td>
                <td>	After Two Days</td>
                <td>	11000</td>
              </tr>


            </tbody>

          </Table>
        </div>
        {/* <h5>showing 1 to 10</h5> */}
        <div>
          <h3 style={{ color: "darkblue" }} className="mt-3">

            All Lab Tests Information and Test Rates:
          </h3>
          <Table bordered className="mt-3" style={{ width: "140%" }}>
            <thead style={{ backgroundColor: "darkblue", color: "white" }}>
              <tr>
                <th>#</th>
                <th>Test Name</th>
                <th>Sample Required</th>
                <th>Performed</th>
                <th>Reporting Day</th>
                <th>Rates</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>17-OH Progesterone</td>
                <td>3-5cc Clotted Blood or Serum</td>
                <td>Next Day</td>
                <td> Next Day</td>
                <td>3650</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>ANTI HCV</td>
                <td>3-5cc Clotted Blood or Serum</td>
                <td>	DAILY</td>
                <td>	DAILY</td>
                <td>	3200</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>3D Hematology (From NIBD)</td>
                <td>	3cc EDTA Blood & 2 Stain Smear & 1 Unstain</td>
                <td>	DAILY</td>
                <td>	After Two Weeks </td>
                <td>	2250</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>33gAllergy Specific IgE Universal Food Allergens Profile)</td>
                <td>		8cc Clotted Blood or Serum</td>
                <td>	  After Three Days</td>
                <td>	Next Day</td>
                <td>	6050</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>3gAllergy Specific IgE Universal Inhalant Allergens Profile</td>
                <td>		8cc Clotted Blood or Serum</td>
                <td>	DAILY</td>
                <td>After Three Days</td>
                <td>	6050</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>5 HIAA (24 Hrs Urine) (5-Hydroxyindoleacetic Acid)</td>
                <td>		24 Hrs Urine</td>
                <td>	DAILY</td>
                <td>	After Three Days</td>
                <td>	4200</td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>A/G Ratio</td>
                <td>	3-5cc Clotted Blood or Serum</td>
                <td>	DAILY</td>
                <td>	DAILY</td>
                <td>	800</td>
              </tr>

              <tr>
                <th scope="row">8</th>
                <td>ABO Isohemagglutinin Titre (IHA)</td>
                <td>	EDTA And Clotted Blood</td>
                <td>	DAILY</td>
                <td>	Next Day</td>
                <td>	1650</td>
              </tr>
              <tr>
                <th scope="row">9</th>
                <td>Abscess for Bacterial C/S (Aerobic) with Gram Stain</td>
                <td>		Abscess</td>
                <td>	DAILY</td>
                <td>	After Three Days</td>
                <td>	1950</td>
              </tr>
              <tr>
                <th scope="row">10</th>
                <td>Absolute Eosinophil Count</td>
                <td>	3cc EDTA BLOOD (CBC VIAL)</td>
                <td>	DAILY</td>
                <td>	DAILY</td>
                <td>	220</td>
              </tr>


            </tbody>
          </Table>
        </div>
        <div>

          <h4 style={{ color: "darkblue", textAlign: "center" }} className=",mt-3">
            Get in Touch with Lab
          </h4>
          <h6 className="mt-3" style={{ textAlign: "center" }}>

            For more information please email us at ali.arifbhatti98@gmail.com or  / Whatsapp
          </h6>
          <Row>
            {/* WhatsApp icon */}
            <a
              href="https://wa.me/03486678511"
              class="whatsapp_float"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fa fa-whatsapp whatsapp-icon" ></i>
            </a>

          </Row>
        </div>
      </Container>
    );
  }
}

export default LaboratoristDashboard;

