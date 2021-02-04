import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

class ListBootcamps extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			bootcamps: [],
		};
	}

	componentDidMount() {
		this.setState({ loading: true });

		this.props.firebase.bootcamps().on('value', (snapshot) => {
			const bootcampsObj = snapshot.val();
			if (bootcampsObj) {
				const bootcampsList = Object.keys(bootcampsObj).map((key) => ({
					...bootcampsObj[key],
					bootcampId: key,
				}));

				this.setState({
					bootcamps: bootcampsList,
					loading: false,
				});
			}
		});
	}

	componentWillUnmount() {
		this.props.firebase.bootcamps().off();
	}

	render() {
		const { loading, bootcamps } = this.state;

		return (
			<div>
				<h2>All Bootcamps</h2>
				<BootcampsList bootcamps={bootcamps} />
			</div>
		);
	}
	ß;
}

const BootcampsList = ({ bootcamps }) => {
	return (
		<div>
			{bootcamps.length ? (
				bootcamps.map((bootcamp) => {
					return (
						<li key={bootcamp.bootcampId}>
							<Link to={`/bootcamps/${bootcamp.bootcampId}`}>
								{bootcamp.bootcampName}
							</Link>
						</li>
					);
				})
			) : (
				<Spinner animation='border' variant='primary' />
			)}
		</div>
	);
};

export default withFirebase(ListBootcamps);
