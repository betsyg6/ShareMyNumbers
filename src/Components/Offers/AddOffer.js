import React, { Component, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { Button } from 'react-bootstrap';

const INITIAL_STATE = {
	companyName: '',
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

const AddOffer = () => {
	const [form, openForm] = useState(false);

	return (
		<div>
			<Button onClick={() => openForm(!form)}>Add an Offer</Button>
			{form && <AddOfferForm />}
		</div>
	);
};

class AddOfferFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = { ...INITIAL_STATE };
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	onSubmit = (event) => {
		event.preventDefault();

		const id = this.props.match.params.bootcampId;
		const {
			companyName,
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
				companyName,
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
				this.setState({ ...INITIAL_STATE });
			})
			.catch((error) => console.log(error));
	};

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<label>Company Name</label>
				<input
					type='text'
					name='companyName'
					value={this.state.companyName}
					onChange={this.handleChange}
					required
				/>
				<br />
				<label>Date Received</label>
				<input
					type='date'
					name='dateRecieved'
					value={this.state.dateRecieved}
					onChange={this.handleChange}
					required
				/>
				<br />
				<label>Years of Coding Experience</label>
				<input
					type='number'
					name='yearsOfCodingExp'
					value={this.state.yearsOfCodingExp}
					onChange={this.handleChange}
					required
				/>
				<br />
				<label>Number of Months Job Searching</label>
				<input
					type='number'
					name='numOfMonthsJobSearching'
					value={this.state.numOfMonthsJobSearching}
					onChange={this.handleChange}
					required
				/>
				<br />
				{/* need to format this into a salary */}
				<label>Base Salary</label>
				<input
					type='number'
					name='baseSalary'
					value={this.state.baseSalary}
					onChange={this.handleChange}
					required
				/>
				<br />
				<label>Bonus</label>
				<input
					type='text'
					name='bonus'
					value={this.state.bonus}
					onChange={this.handleChange}
					required
				/>
				<br />
				{/* need to edit this part with the checkbox */}
				<label>Remote</label>
				<input
					type='checkbox'
					name='remote'
					value={this.state.remote}
					onChange={this.handleChange}
					required
				/>
				<br />
				<label>Equity</label>
				<input
					type='number'
					name='equity'
					value={this.state.equity}
					onChange={this.handleChange}
					required
				/>
				<br />
				{/* need to edit this into a dropdown */}
				<label>Size of Company</label>
				<input
					type='text'
					name='sizeOfCompany'
					value={this.state.sizeOfCompany}
					onChange={this.handleChange}
					required
				/>
				<br />
				<label>Comments</label>
				<input
					type='text'
					name='comments'
					value={this.state.comments}
					onChange={this.handleChange}
				/>
				<br />
				<button type='submit'>Submit</button>
			</form>
		);
	}
}

const AddOfferForm = compose(withFirebase, withRouter)(AddOfferFormBase);
export default AddOffer;
export { AddOfferForm };
