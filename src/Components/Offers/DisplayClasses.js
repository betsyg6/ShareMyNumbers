import React, { Component, useState } from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import { Spinner, Container, ListGroup, Form } from 'react-bootstrap';
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
	const [filter, setFilter] = useState('');

	const handleChange = (event) => {
		setFilter(event.target.value);
	};

	//experimenting with sorting by month and year
	if (classes.length) {
		let day = new Date(classes[0].graduationDate);
		day.setDate(day.getDate() + 1);
		console.log(day);
		//then i can access the month and the year and sort by month/year
	}

	return (
		<>
			<Form>
				<Form.Group controlId='filter'>
					<Form.Label>Search by Name</Form.Label>
					<Form.Control
						type='text'
						name='filter'
						onChange={handleChange}
						value={filter}
					/>
				</Form.Group>
			</Form>
			<ListGroup>
				{loading && <Spinner animation='border' variant='primary' />}
				{classes.length ? (
					classes
						.filter((classObj) => {
							return classObj.className.includes(filter);
						})
						.map((classObj) => (
							<ListGroup horizontal key={classObj.classId}>
								<ListGroup.Item action variant='light'>
									<Link to={`/bootcamps/${id}/${classObj.classId}`}>
										{classObj.className} | {classObj.graduationDate}
									</Link>
								</ListGroup.Item>
							</ListGroup>
						))
				) : (
					<p>No Classes Yet!</p>
				)}
			</ListGroup>
		</>
	);
};

export default withFirebase(ListClasses);
