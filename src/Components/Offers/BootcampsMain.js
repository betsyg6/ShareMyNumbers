import React from 'react';
import { Container } from 'react-bootstrap';
import AddBootcamp from '../Offers/AddBootcamp';
import DisplayBootcamps from '../Offers/DisplayBootcamps';

const BootcampsMain = () => {
	return (
		<Container className='main'>
			<DisplayBootcamps />
			<AddBootcamp />
		</Container>
	);
};

export default BootcampsMain;
