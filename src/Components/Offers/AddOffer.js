import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Button, Modal, Form, Col } from 'react-bootstrap';

const INITIAL_STATE = {
	// companyName: '',
	dateRecieved: '',
	yearsOfCodingExp: 0,
	numOfMonthsJobSearching: 0,
	baseSalary: 0,
	bonus: 0,
	remote: false,
	equity: 0,
	sizeOfCompany: 'S',
	comments: '',
};

// const AddOffer = () => {
// 	const [show, setShow] = useState(false);

// 	const handleClose = () => setShow(false);
// 	const handleShow = () => setShow(true);

// 	return (
// 		<div>
// 			<Button onClick={handleShow}>Add an Offer</Button>

// 			<Modal show={show} onHide={handleClose}>
// 				<Modal.Header>Add Offer</Modal.Header>
// 				<AddOfferForm />
// 			</Modal>
// 		</div>
// 	);
// };

class AddOfferFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE, show: false };
	}

	handleClose = () => this.setState({ show: false });
	handleShow = () => this.setState({ show: true });

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	onSubmit = (event) => {
		event.preventDefault();

		const id = this.props.match.params.classId;
		const {
			// companyName,
			dateRecieved,
			yearsOfCodingExp,
			numOfMonthsJobSearching,
			baseSalary,
			bonus,
			remote,
			equity,
			sizeOfCompany,
			comments,
		} = this.state;
		this.props.firebase
			.addOffer(id)
			.push({
				// companyName,
				dateRecieved,
				yearsOfCodingExp,
				numOfMonthsJobSearching,
				baseSalary,
				bonus,
				remote,
				equity,
				sizeOfCompany,
				comments,
			})
			.then(() => {
				this.setState({ ...INITIAL_STATE, show: false });
			})
			.catch((error) => console.log(error));
	};

	render() {
		return (
			<div>
				<Button onClick={this.handleShow}>Add an Offer</Button>

				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header>Add Offer</Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.onSubmit}>
							<Form.Row>
								{/* <Form.Group as={Col} controlId='companyName'>
							<Form.Label>Company Name</Form.Label>
							<Form.Control
								type='text'
								onChange={this.handleChange}
								placeholder='Company Name'
								name='companyName'
								value={this.state.companyName}
								required
							/>
						</Form.Group> */}

								<Form.Group as={Col} controlId='dateRecieved'>
									<Form.Label>Date Recieved</Form.Label>
									<Form.Control
										type='date'
										name='dateRecieved'
										onChange={this.handleChange}
										value={this.state.dateRecieved}
										required
									/>
								</Form.Group>
							</Form.Row>

							<Form.Row>
								<Form.Group as={Col} controlId='sizeOfCompany'>
									<Form.Label>Size of Company</Form.Label>
									<Form.Control
										as='select'
										name='sizeOfCompany'
										value={this.state.sizeOfCompany}
										onChange={this.handleChange}
									>
										<option>S</option>
										<option>M</option>
										<option>L</option>
									</Form.Control>
								</Form.Group>

								{/* <Form.Group as={Col} controlId='yearsOfCodingExp'>
									<Form.Label>Years Coding</Form.Label>
									<Form.Control
										as='select'
										name='yearsOfCodingExp'
										value={this.state.yearsOfCodingExp}
										onChange={this.handleChange}
									>
										<option>0</option>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5+</option>
									</Form.Control>
								</Form.Group> */}

								<Form.Group as={Col} controlId='numOfMonthsJobSearching'>
									<Form.Label>Months Job Searching</Form.Label>
									<Form.Control
										as='select'
										name='numOfMonthsJobSearching'
										value={this.state.numOfMonthsJobSearching}
										onChange={this.handleChange}
									>
										<option>0</option>
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
										<option>6</option>
										<option>7</option>
										<option>8</option>
										<option>9</option>
										<option>10</option>
										<option>11</option>
										<option>12</option>
									</Form.Control>
								</Form.Group>
							</Form.Row>

							<Form.Row>
								<Form.Group as={Col} controlId='baseSalary'>
									<Form.Label>Base Salary</Form.Label>
									<Form.Control
										type='number'
										name='baseSalary'
										value={this.state.baseSalary}
										onChange={this.handleChange}
									/>
								</Form.Group>

								<Form.Group as={Col} controlId='bonus'>
									<Form.Label>Bonus</Form.Label>
									<Form.Control
										type='number'
										name='bonus'
										value={this.state.bonus}
										onChange={this.handleChange}
									/>
								</Form.Group>

								{/* <Form.Group as={Col} controlId='equity'>
							<Form.Label>Equity</Form.Label>
							<Form.Control
								type='number'
								name='equity'
								value={this.state.equity}
								onChange={this.handleChange}
							/>
						</Form.Group> */}
							</Form.Row>

							<Form.Group controlId='comments'>
								<Form.Label>Comments</Form.Label>
								<Form.Control
									type='text'
									name='comments'
									value={this.state.comments}
									onChange={this.handleChange}
									placeholder='...anything else we should know?'
								/>
							</Form.Group>

							<Form.Group id='formGridCheckbox'>
								<Form.Check type='checkbox' label='Remote' />
							</Form.Group>

							<Button variant='primary' type='submit'>
								Submit
							</Button>
						</Form>
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}

const AddOfferForm = compose(withFirebase, withRouter)(AddOfferFormBase);
export default AddOfferForm;
