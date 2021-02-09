import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Button, Modal } from 'react-bootstrap';

const AddClass = () => {
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div>
			<Button onClick={handleShow}>Add a Class</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header>Add Class</Modal.Header>
				<AddClassForm />
			</Modal>
		</div>
	);
};

class AddClassFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			className: '',
			graduationDate: '',
		};
	}

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
				this.setState({ className: '', graduationDate: '' });
			})
			.catch((error) => console.log(error));
	};

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<label>Class Name</label>
				<input
					type='text'
					name='className'
					value={this.state.className}
					onChange={this.handleChange}
					required
				/>
				<br />
				<label>Graduation Date</label>
				<input
					type='month'
					name='graduationDate'
					value={this.state.graduationDate}
					onChange={this.handleChange}
					required
				/>

				<Modal.Footer>
					<button type='submit'>Submit</button>
				</Modal.Footer>
			</form>
		);
	}
}

const AddClassForm = compose(withFirebase, withRouter)(AddClassFormBase);
export default AddClass;
export { AddClassForm };
