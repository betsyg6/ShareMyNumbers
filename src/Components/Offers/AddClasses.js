import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Button } from 'react-bootstrap';

const AddClass = () => {
	const [form, openForm] = useState(false);

	return (
		<div>
			<Button onClick={() => openForm(!form)}>Add a Bootcamp Cohort</Button>
			{form && <AddClassForm />}
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

				<button type='submit'>Submit</button>
			</form>
		);
	}
}

const AddClassForm = compose(withFirebase, withRouter)(AddClassFormBase);
export default AddClass;
export { AddClassForm };
