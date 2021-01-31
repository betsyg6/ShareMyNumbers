import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

const AddOffer = () => (
	<div>
		<AddOfferForm />
	</div>
);

class AddOfferFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offerName: '',
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
		const { offerName } = this.state;
		this.props.firebase
			.addOffer(id)
			.push({ offerName })
			.then(() => {
				this.setState({ offerName: '' });
			})
			.catch((error) => console.log(error));
	};

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<label>Add Offer</label>
				<input
					type='text'
					name='offerName'
					value={this.state.offerName}
					onChange={this.handleChange}
					required
				/>
				<button type='submit'>Submit</button>
			</form>
		);
	}
}

const AddOfferForm = compose(withFirebase, withRouter)(AddOfferFormBase);
export default AddOffer;
export { AddOfferForm };
