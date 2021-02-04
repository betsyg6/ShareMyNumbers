import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import AddOffer from './AddOffer';
import { Container, Spinner } from 'react-bootstrap';

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
				<h2>All offers</h2>
				<OffersList offers={offers} error={error} />
				<AddOffer />
			</Container>
		);
	}
}

const OffersList = ({ offers, error }) => {
	return (
		<div>
			{offers.length > 0 ? (
				offers.map((offer) => {
					return <li key={offer.offerId}>{offer.companyName}</li>;
				})
			) : (
				<p>{error}</p>
			)}
		</div>
	);
};

export default withFirebase(ListOffers);
