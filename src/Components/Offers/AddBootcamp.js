import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
//material ui
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const AddBootcamp = () => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button variant='outlined' color='primary' onClick={handleClickOpen}>
				Add a Bootcamp Cohort
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'
			>
				<AddBootcampForm />
			</Dialog>
		</div>
	);
};

class AddBootcampFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bootcampName: '',
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

		const { bootcampName, className, graduationDate } = this.state;
		this.props.firebase
			.bootcamps()
			.push({ bootcampName, className, graduationDate })
			.then(() => {
				this.setState({ bootcampName: '', className: '', graduationDate: '' });
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

const AddBootcampForm = compose(withFirebase, withRouter)(AddBootcampFormBase);
export default AddBootcamp;
export { AddBootcampForm };
