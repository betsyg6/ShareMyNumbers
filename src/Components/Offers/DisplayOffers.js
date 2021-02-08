import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import AddOffer from './AddOffer';
import { Container, Spinner, Table } from 'react-bootstrap';

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

	componentWillUnmount() {
		this.props.firebase.offers().off();
	}

	render() {
		const { offers, error } = this.state;

		return (
			<Container>
				<OffersList offers={offers} error={error} />
				<AddOffer />
			</Container>
		);
	}
}

const OffersList = ({ offers, error }) => {
	let keys = [
		'Company Name',
		'Date Recieved',
		'Number of Months Job Searching',
		'Years of Coding Experience',
		'Base Salary',
		'Bonus',
		'Equity',
		'Remote',
		'Size of Company',
		'Comments',
	];
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
					{offers.length > 0 ? (
						offers.map((offer) => {
							return (
								<tr key={offer.offerId}>
									<td>{offer.companyName}</td>
									<td>{offer.dateRecieved}</td>
									<td>{offer.numOfMonthsJobSearching}</td>
									<td>{offer.yearsOfCodingExp}</td>
									<td>{offer.baseSalary}</td>
									<td>{offer.bonus}</td>
									<td>{offer.equity}</td>
									<td>{offer.remote}</td>
									<td>{offer.sizeOfCompany}</td>
									<td>{offer.comments}</td>
								</tr>
							);
						})
					) : (
						<tr key='error'>
							<td>{error}</td>
						</tr>
					)}
				</tbody>
			</Table>
		</div>
	);
};

export default withFirebase(ListOffers);
