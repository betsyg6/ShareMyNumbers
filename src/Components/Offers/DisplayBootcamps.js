import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';

class ListBootcamps extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			currentBootcamp: {},
			bootcamps: [],
		};
	}

	componentDidMount() {
		this.setState({ loading: true });

		this.props.firebase.bootcamps().on('value', (snapshot) => {
			const bootcampsObj = snapshot.val();
			const bootcampsList = Object.keys(bootcampsObj).map((key) => ({
				...bootcampsObj[key],
				bootcampId: key,
			}));

			this.setState({
				bootcamps: bootcampsList,
				loading: false,
			});
		});
	}

	componentWillUnmount() {
		this.props.firebase.bootcamps().off();
	}

	render() {
		const { loading, currentBootcamp, bootcamps } = this.state;

		return (
			<div>
				<h1>All Bootcamps</h1>
				<BootcampsList
					currentBootcamp={currentBootcamp}
					bootcamps={bootcamps}
				/>
			</div>
		);
	}
}

const BootcampsList = ({ currentBootcamp, bootcamps }) => {
	return (
		<div>
			{bootcamps.map((bootcamp) => {
				return (
					<li key={bootcamp.bootcampId}>
						<Link to={`/bootcamps/${bootcamp.bootcampId}`}>
							{bootcamp.bootcampName}
						</Link>
					</li>
				);
			})}
		</div>
	);
};

export default withFirebase(ListBootcamps);
