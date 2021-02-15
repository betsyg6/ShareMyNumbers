import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import AddOffer from './AddOffer';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

class ListOffers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			offers: [],
			error: '',
		};
	}

	componentDidMount() {
		this.setState({ loading: true });

		const id = this.props.match.params.classId;
		this.props.firebase.offers(id).on('value', (snapshot) => {
			const offersObj = snapshot.val();
			if (offersObj) {
				const offersList = Object.keys(offersObj).map((key) => ({
					...offersObj[key],
					offerId: key,
				}));

				this.setState({
					offers: offersList,
					loading: false,
				});
			} else {
				this.setState({
					loading: false,
					error: 'No offers yet!',
				});
			}
		});
	}

	render() {
		const { offers, error } = this.state;

		return (
			<Container>
				<OffersList offers={offers} error={error} />

				<DisplayChartData offers={offers} />
			</Container>
		);
	}
}

const OffersList = ({ offers, error }) => {
	let keys = [
		// 'Company Name',
		'Date Recieved',
		'Number of Months Job Searching',
		'Base Salary',
		'Bonus',
		// 'Equity',
		// 'Remote',
		'Size of Company',
		'Comments',
	];
	let avgkeys = ['Number of Months Job Searching', 'Base Salary', 'Bonus'];
	const length = offers.length;
	const avgBase =
		offers.map((offer) => Number(offer.baseSalary)).reduce((a, b) => a + b, 0) /
			length || 0;

	const avgMonths =
		offers
			.map((offer) => Number(offer.numOfMonthsJobSearching))
			.reduce((a, b) => a + b, 0) / length || 0;

	const avgBonus =
		offers.map((offer) => Number(offer.bonus)).reduce((a, b) => a + b, 0) /
			length || 0;

	return (
		<Container>
			<Row>
				<Col>
					<h2>Offers</h2>
				</Col>
			</Row>

			<Row>
				<Col>
					<Table
						variant='default'
						style={{ width: '100%', margin: '20px auto' }}
						striped
						bordered
						responsive
					>
						<thead>
							<tr>
								{keys.map((heading) => {
									return <td key={heading}>{heading}</td>;
								})}
							</tr>
						</thead>
						<tbody>
							{offers.length > 0 &&
								offers.map((offer) => {
									return (
										<tr key={offer.offerId}>
											{/* <td>{offer.companyName}</td> */}
											<td>{offer.dateRecieved}</td>
											<td>{offer.numOfMonthsJobSearching}</td>

											<td>${Number(offer.baseSalary).toLocaleString()}</td>
											<td>${Number(offer.bonus).toLocaleString()}</td>
											{/* <td>{offer.equity}</td> */}
											{/* <td>{offer.remote}</td> */}
											<td>{offer.sizeOfCompany}</td>
											<td>{offer.comments}</td>
										</tr>
									);
								})}
						</tbody>
					</Table>
					{error && <p>{error}</p>}

					<Row>
						<Col>
							<AddOffer />
						</Col>
					</Row>
					<h2>Averages</h2>
					<Table
						variant='default'
						style={{ width: '100%', margin: '20px auto' }}
						striped
						bordered
						responsive
					>
						<thead>
							<tr>
								{avgkeys.map((heading) => {
									return <td key={heading}>{heading}</td>;
								})}
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{avgMonths}</td>
								<td>${Number(avgBase).toLocaleString()}</td>
								<td>${Number(avgBonus).toLocaleString()}</td>
							</tr>
						</tbody>
					</Table>
				</Col>
			</Row>
		</Container>
	);
};

const DisplayChartData = ({ offers }) => {
	const data = offers.map((offer) => {
		return [Number(offer.numOfMonthsJobSearching), Number(offer.baseSalary)];
	});
	const keys = [['Months Searching', 'Base Salary']];
	const combo = [...keys, ...data];

	const small = offers.filter((offer) => {
		return offer.sizeOfCompany === 'S';
	});

	const medium = offers.filter((offer) => {
		return offer.sizeOfCompany === 'M';
	});

	const large = offers.filter((offer) => {
		return offer.sizeOfCompany === 'L';
	});

	return (
		<Container>
			<Row>
				<Col>
					<h2>Data Visualization</h2>
				</Col>
			</Row>
			<Row>
				<Col>
					<Chart
						width={'500px'}
						height={'300px'}
						chartType='ScatterChart'
						loader={<div>Loading Chart</div>}
						data={combo}
						options={{
							title: 'Months searching and Salary Comparison',
							hAxis: { title: 'Months Searching' },
							vAxis: { title: 'Base Salary' },
							legend: 'none',
							animation: {
								startup: true,
								easing: 'linear',
								duration: 1500,
							},
							enableInteractivity: false,
						}}
						chartEvents={[
							{
								eventName: 'animationfinish',
								callback: () => {
									console.log('Animation Finished');
								},
							},
						]}
						rootProps={{ 'data-testid': '1' }}
					/>
				</Col>
				<Col>
					<Chart
						width={'500px'}
						height={'300px'}
						chartType='PieChart'
						loader={<div>Loading Chart</div>}
						data={[
							['Task', 'Hours per Day'],
							['Small', small.length],
							['Medium', medium.length],
							['Large', large.length],
						]}
						options={{
							title: 'Company Sizes',
						}}
						rootProps={{ 'data-testid': '1' }}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default withFirebase(ListOffers);
