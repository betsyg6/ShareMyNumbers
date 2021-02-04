import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Button } from 'react-bootstrap';

const AddBootcamp = () => {
	const [form, openForm] = useState(false);

	return (
		<div>
			<Button onClick={() => openForm(!form)}>Add a Bootcamp</Button>
			{form && <AddBootcampForm />}
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
			<form onSubmit={this.onSubmit}>
				<label>Bootcamp Name</label>
				<input
					type='text'
					name='bootcampName'
					value={this.state.bootcampName}
					onChange={this.handleChange}
					required
				/>
				<br />

				<button type='submit'>Submit</button>
			</form>
		);
	}
}

const AddBootcampForm = compose(withFirebase, withRouter)(AddBootcampFormBase);
export default AddBootcamp;
export { AddBootcampForm };
