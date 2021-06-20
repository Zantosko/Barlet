import React from 'react';
import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
} from '@react-google-maps/api';
import { process } from 'ipaddr.js';
import { Title } from './styled-components/LiveFeedStyles';

export default function Map() {
	const libraries = ['places'];
	const mapContainerStyle = {
		width: '60vw',
		height: '60vh',
	};

	const center = {
		lat: 29.749907,
		lng: -95.358421,
	};

	const options = {
		disableDefaultUI: true,
		zoomControl: true,
	};

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey:
			'AIzaSyAcAgtdILhGOPdU9rfavxLUNh12XlGHATQ',
		libraries,
	});

	if (loadError) return 'Error loading maps';
	if (!isLoaded) return 'Loading Maps';

	return (
		<div>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={8}
				center={center}
				options={options}
			>
				<Title>
					Bars Near You{' '}
					<span role='img' aria-label='beer'>
						🍺 🍸
					</span>
				</Title>
			</GoogleMap>
		</div>
	);
}
