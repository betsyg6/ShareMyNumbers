import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Button, Modal, Form } from 'react-bootstrap';

const AddBootcamp = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div>
			<Button onClick={handleShow}>Add a Bootcamp</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header>Add Bootcamp</Modal.Header>
				<AddBootcampForm />
			</Modal>
		</div>
	);
};

class AddBootcampFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bootcampName: '',
		};
	}

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
				this.setState({ bootcampName: '' });
			})
			.catch((error) => console.log(error));
	};

	render() {
		return (
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
		);
	}
}

const AddBootcampForm = compose(withFirebase, withRouter)(AddBootcampFormBase);
export default AddBootcamp;
export { AddBootcampForm };
