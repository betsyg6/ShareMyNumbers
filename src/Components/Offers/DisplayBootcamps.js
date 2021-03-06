import React, { Component, useState } from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import { Spinner, Form, Container, Col, Row, ListGroup } from 'react-bootstrap';

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
			<Container>
				<Row>
					<Col>
						<h2>All Bootcamps</h2>
					</Col>
				</Row>
				<Row>
					<Col>
						<BootcampsList bootcamps={bootcamps} loading={loading} />
					</Col>
				</Row>
			</Container>
		);
	}
	ß;
}

const BootcampsList = ({ bootcamps, loading }) => {
	const [filter, setFilter] = useState('');

	const handleChange = (event) => {
		setFilter(event.target.value);
	};

	return (
		<div>
			<Form>
				<Form.Group controlId='filter'>
					<Form.Label>Search</Form.Label>
					<Form.Control
						type='text'
						name='filter'
						onChange={handleChange}
						value={filter}
					/>
				</Form.Group>
			</Form>
			<ListGroup>
				{bootcamps.length && !loading ? (
					bootcamps
						.filter((bootcamp) => {
							return bootcamp.bootcampName.includes(filter);
						})
						.map((bootcamp) => {
							return (
								<ListGroup.Item
									action
									variant='light'
									key={bootcamp.bootcampId}
								>
									<Link to={`/bootcamps/${bootcamp.bootcampId}`}>
										{bootcamp.bootcampName}
									</Link>
								</ListGroup.Item>
							);
						})
				) : (
					<Spinner animation='border' variant='primary' />
				)}
			</ListGroup>
		</div>
	);
};

export default withFirebase(ListBootcamps);
