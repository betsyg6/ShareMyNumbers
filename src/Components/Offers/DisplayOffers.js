import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import AddOffer from './AddOffer';
import { Container, Spinner, Table } from 'react-bootstrap';
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
				<AddOffer />
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
		'Years of Coding Experience',
		'Base Salary',
		'Bonus',
		// 'Equity',
		'Remote',
		'Size of Company',
		'Comments',
	];
	let avgkeys = [
		'Number of Months Job Searching',
		'Years of Coding Experience',
		'Base Salary',
		'Bonus',
	];
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

	const avgYearsExp =
		offers
			.map((offer) => Number(offer.yearsOfCodingExp))
			.reduce((a, b) => a + b, 0) / length || 0;

	return (
		<div style={{ width: '90%', margin: '0 auto' }}>
			<h2 style={{ textAlign: 'center', margin: '20px auto auto' }}>Offers</h2>

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
									<td>{offer.yearsOfCodingExp}</td>
									<td>${offer.baseSalary}</td>
									<td>${offer.bonus}</td>
									{/* <td>{offer.equity}</td> */}
									<td>{offer.remote}</td>
									<td>{offer.sizeOfCompany}</td>
									<td>{offer.comments}</td>
								</tr>
							);
						})}
				</tbody>
			</Table>
			{error && <p>{error}</p>}

			<h2 style={{ textAlign: 'center', margin: '20px auto auto' }}>
				Averages
			</h2>
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
						<td>{avgYearsExp}</td>
						<td>{avgBase}</td>
						<td>{avgBonus}</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
};

const DisplayChartData = ({ offers }) => {
	const data = offers.map((offer) => {
		return [Number(offer.numOfMonthsJobSearching), Number(offer.baseSalary)];
	});
	const keys = [['Months Searching', 'Base Salary']];
	const combo = [...keys, ...data];

	return (
		<div>
			<h1>Chart Data</h1>
			<Chart
				width={'600px'}
				height={'400px'}
				chartType='ScatterChart'
				loader={<div>Loading Chart</div>}
				data={combo}
				options={{
					title: 'Months searching and Salary Comparison',
					hAxis: { title: 'Months Searching' },
					vAxis: { title: 'Base Salary' },
					legend: 'none',
				}}
				rootProps={{ 'data-testid': '1' }}
			/>
		</div>
	);
};

export default withFirebase(ListOffers);
