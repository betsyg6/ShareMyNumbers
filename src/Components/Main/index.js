import React from 'react';
import { Button, Carousel, Container, Row, Col } from 'react-bootstrap';
import * as ROUTES from '../../Constants/routes';

//this page might end up getting deleted
const Main = () => {
	return (
		<Container>
			<Row>
				<Col>
					<h1>Welcome to Share My Numbers</h1>
					<p>
						Share My Numbers is a place for bootcamp grads to share their offers
						anonymously.
					</p>
				</Col>
			</Row>
			<Row>
				<Col>
					<Button href={ROUTES.BOOTCAMPS} variant='outline-info'>
						Enter
					</Button>
				</Col>
			</Row>

			<Row>
				<Col>
					<Carousel className='carousel'>
						<Carousel.Item>
							<img
								src='thisisengineering-raeng-pIdteYOzGFY-unsplash.jpg'
								height='600px'
								width='100%'
								alt='pic1'
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
								alt='pic2'
							/>
							<Carousel.Caption>
								<h3>Support Your Community</h3>
								<p>Lift others up</p>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item>
							<img
								src='heylagostechie-IgUR1iX0mqM-unsplash.jpg'
								height='600px'
								width='100%'
								alt='pic3'
							/>
							<Carousel.Caption>
								<h3>Empower the Future</h3>
								<p>Lower the wage gap</p>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
				</Col>
			</Row>
		</Container>
	);
};

export default Main;
