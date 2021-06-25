import React from 'react';
import Navbar from './Navbar';
import {
	Container,
	Logo,
	Demo,
	VideoBorder,
	Grid,
	GridLeft,
	GridRight,
	WelcomeText,
	WelcomeText2,
} from './styled-components/HomeStyles';
import Pic from '../assets/Barlet_TEXT-LOGO.png';
import Video from '../assets/Map_Demo.mov';
import Footer from './Footer';
import ReactPlayer from 'react-player';

export default function Home() {
	return (
		<>
			<Navbar />
			<Container>
				<WelcomeText>Welcome to,</WelcomeText>
				<Logo src={Pic} alt='' />
				<Grid>
					<GridLeft>
						<ReactPlayer
							url={Video}
							playing={true}
							loop={true}
							playbackRate={1.2}
							height='100%'
							width='100%'
						/>
					</GridLeft>
					<GridRight>
						<WelcomeText2>
							An easier way to find good bars in big cities!
						</WelcomeText2>
					</GridRight>
				</Grid>
			</Container>
			<Footer />
		</>
	);
}
