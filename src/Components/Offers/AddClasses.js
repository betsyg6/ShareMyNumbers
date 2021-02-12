import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Button, Modal, Form } from 'react-bootstrap';

class AddClassFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			className: '',
			graduationDate: '',
			show: false,
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

		const id = this.props.match.params.bootcampId;
		const { className, graduationDate } = this.state;

		this.props.firebase
			.classes(id)
			.push({ className, graduationDate })
			.then(() => {
				this.setState({ className: '', graduationDate: '', show: false });
			})
			.catch((error) => console.log(error));
	};

	render() {
		return (
			<div>
				<Button onClick={this.handleShow}>Add a Class</Button>
				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header>Add Class</Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.onSubmit}>
							<Form.Group>
								<Form.Label>Class Name</Form.Label>
								<Form.Control
									type='text'
									name='className'
									value={this.state.className}
									onChange={this.handleChange}
									required
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Graduation Date</Form.Label>
								<Form.Control
									type='month'
									name='graduationDate'
									value={this.state.graduationDate}
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

const AddClassForm = compose(withFirebase, withRouter)(AddClassFormBase);
export default AddClassForm;
