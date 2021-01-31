import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import AddOffer from './AddOffer';
import { Container } from 'react-bootstrap';

class ListOffers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			offers: [{ offerName: 'No Offers Yet!', offerId: 1 }],
		};
	}

	componentDidMount() {
		this.setState({ loading: true });

		const id = this.props.match.params.bootcampId;
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
			}
		});
	}

	componentWillUnmount() {
		this.props.firebase.offers().off();
	}

	render() {
		const { loading, offers } = this.state;

		return (
			<Container>
				<h1>All offers</h1>
				<OffersList offers={offers} />
				<AddOffer />
			</Container>
		);
	}
}

const OffersList = ({ offers }) => {
	return (
		<div>
			{offers.length &&
				offers.map((offer) => {
					return <li key={offer.offerId}>{offer.companyName}</li>;
				})}
		</div>
	);
};

export default withFirebase(ListOffers);
