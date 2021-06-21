import React, {
	useRef,
	useCallback,
	useEffect,
	useState,
} from 'react';
import {
	GoogleMap,
	useLoadScript,
	Marker,
	InfoWindow,
} from '@react-google-maps/api';
import { Title } from './styled-components/LiveFeedStyles';

const libraries = ['places'];
export default function Map() {
	const mapContainerStyle = {
		width: '70vw',
		height: '70vh',
	};

	const [places, setPlaces] = useState('');
	const mapRef = useRef();

	const center = {
		lat: 29.749907,
		lng: -95.358421,
	};

	const options = {
		disableDefaultUI: true,
		zoomControl: true,
	};

	const onMapMounted = useCallback((map) => {
		mapRef.current = map;
	}, []);

	const fetchPlaces = () => {
		const bounds = mapRef.current.getBounds();
		const service =
			new window.google.maps.places.PlacesService(
				mapRef.current
			);
		const request = {
			bounds: bounds,
			type: ['bar'],
		};
		service.nearbySearch(request, (results, status) => {
			if (
				status ===
				window.google.maps.places.PlacesServiceStatus.OK
			) {
				setPlaces(results);
			}
		});
	};

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey:
			process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries,
	});

	if (loadError) return 'Error loading maps';
	if (!isLoaded) return 'Loading Maps';

	return (
		<div>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={11}
				center={center}
				options={options}
				onLoad={onMapMounted}
				onTilesLoaded={fetchPlaces}
				onBoundsChanged={fetchPlaces}
			>
				<Title>
					Bars Near You{' '}
					<span role='img' aria-label='beer'>
						🍺 🍸
					</span>
				</Title>
				{places &&
					places.map((place, i) => (
						<Marker
							key={i}
							position={{
								lat: place.geometry.location.lat(),
								lng: place.geometry.location.lng(),
							}}
						/>
					))}
			</GoogleMap>
		</div>
	);
}
