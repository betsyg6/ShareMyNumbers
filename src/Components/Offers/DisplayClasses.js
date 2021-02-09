import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import { Spinner, Container } from 'react-bootstrap';
import AddClasses from './AddClasses';

class ListClasses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			classes: [],
		};
	}

	componentDidMount() {
		this.setState({ loading: true });

		const id = this.props.match.params.bootcampId;

		this.props.firebase.classes(id).on('value', (snapshot) => {
			const classesObj = snapshot.val();

			if (classesObj) {
				const classesList = Object.keys(classesObj).map((key) => ({
					...classesObj[key],
					classId: key,
				}));

				this.setState({
					classes: classesList,
					loading: false,
					id,
				});
			} else {
				this.setState({
					loading: false,
				});
			}
		});
	}

	componentWillUnmount() {
		this.props.firebase.classes(this.state.id).off();
	}

	render() {
		const { loading, classes, id } = this.state;

		return (
			<Container>
				<h2>All classes</h2>
				<ClassesList classes={classes} id={id} loading={loading} />
				<AddClasses />
			</Container>
		);
	}
}

const ClassesList = ({ classes, id, loading }) => {
	return (
		<div>
			{classes.length && !loading ? (
				classes.map((classObj) => (
					<li key={classObj.classId}>
						<Link to={`/bootcamps/${id}/${classObj.classId}`}>
							{classObj.className}
						</Link>
					</li>
				))
			) : (
				<Spinner animation='border' variant='primary' />
			)}
		</div>
	);
};

export default withFirebase(ListClasses);
