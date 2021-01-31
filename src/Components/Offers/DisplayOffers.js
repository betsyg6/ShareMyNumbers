import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import AddOffer from './AddOffer';

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
			<div>
				<h1>All offers</h1>
				<OffersList offers={offers} />
				<AddOffer />
			</div>
		);
	}
}

const OffersList = ({ offers }) => {
	return (
		<div>
			{offers.length &&
				offers.map((offer) => {
					return <li key={offer.offerId}>{offer.offerName}</li>;
				})}
		</div>
	);
};

export default withFirebase(ListOffers);
