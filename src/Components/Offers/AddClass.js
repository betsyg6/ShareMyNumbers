import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../Constants/routes';
// import { FirebaseContext } from 'react-router-dom';
import { withFirebase } from '../Firebase';

const AddClass = () => (
	<div>
		<AddClassForm />
	</div>
);

class AddClassForm extends Component {
	constructor(props) {
		this.state = {
			name: '',
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	render() {
		return (
			<form>
				<label>Class Name</label>
				<input
					type='text'
					name='name'
					value={this.state.name}
					onChange={this.handleChange}
					required
				/>
				<button type='submit'>Submit</button>
			</form>
		);
	}
}
