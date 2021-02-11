import React from 'react';
import { Jumbotron, Button, Carousel } from 'react-bootstrap';
import * as ROUTES from '../../Constants/routes';

//this page might end up getting deleted
const Main = () => {
	return (
		<>
			<Jumbotron>
				<h1>Welcome to Share My Numbers</h1>
				<p>
					Share My Numbers is a place for bootcamp grads to share their offers
					anonymously.
				</p>
				<Carousel className='carousel'>
					<Carousel.Item>
						<img
							src='joshua-reddekopp-SyYmXSDnJ54-unsplash.jpg'
							height='600px'
							width='100%'
						/>
						<Carousel.Caption>
							<h3>Share Salaries</h3>
							<p>Promote equity in tech</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img
							src='alexandru-acea-XEB8y0nRRP4-unsplash.jpg'
							height='600px'
							width='100%'
						/>
						<Carousel.Caption>
							<h3>Support Your Community</h3>
							<p>Lift others up</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img
							src='safar-safarov-LKsHwgzyk7c-unsplash.jpg'
							height='600px'
							width='100%'
						/>
						<Carousel.Caption>
							<h3>Empower the Future</h3>
							<p>Lower the wage gap</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
				<p>
					<Button href={ROUTES.BOOTCAMPS} variant='primary'>
						Enter
					</Button>
				</p>
			</Jumbotron>
		</>
	);
};

export default Main;
