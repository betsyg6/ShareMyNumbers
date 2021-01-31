import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
//material ui
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
				<h1>All Bootcamps</h1>
				<BootcampsList bootcamps={bootcamps} />
			</div>
		);
	}
}

const BootcampsList = ({ bootcamps }) => {
	return (
		<div>
			{bootcamps.length &&
				bootcamps.map((bootcamp) => {
					return (
						<ListItem key={bootcamp.bootcampId}>
							<Link to={`/bootcamps/${bootcamp.bootcampId}`}>
								<ListItemText>{bootcamp.bootcampName}</ListItemText>
							</Link>
						</ListItem>
					);
				})}
		</div>
	);
};

export default withFirebase(ListBootcamps);
