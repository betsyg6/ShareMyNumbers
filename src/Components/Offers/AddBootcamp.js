import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Button, Modal, Form } from 'react-bootstrap';

class AddBootcampFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			bootcampName: '',
		};
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

		const { bootcampName } = this.state;
		this.props.firebase
			.bootcamps()
			.push({ bootcampName })
			.then(() => {
				this.setState({ bootcampName: '', show: false });
			})
			.catch((error) => console.log(error));
	};

	render() {
		return (
			<div>
				<Button onClick={this.handleShow}>Add a Bootcamp</Button>
				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header>Add Bootcamp</Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.onSubmit}>
							<Form.Group>
								<Form.Label>Bootcamp Name</Form.Label>
								<Form.Control
									type='text'
									name='bootcampName'
									placeholder='Name goes here...'
									value={this.state.bootcampName}
									onChange={this.handleChange}
									required
								/>
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

const AddBootcampForm = compose(withFirebase, withRouter)(AddBootcampFormBase);
export default AddBootcampForm;
