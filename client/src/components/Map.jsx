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
import {
	Title,
	CompassIcon,
} from './styled-components/LiveFeedStyles';
import Icon from '../assets/Bottle.png';
import Compass from '../assets/compass.svg';

const libraries = ['places'];
export default function Map() {
	const mapContainerStyle = {
		width: '70vw',
		height: '70vh',
	};

	const [places, setPlaces] = useState('');
	const [selected, setSelected] = useState(null);

	const mapRef = useRef();

	const options = {
		disableDefaultUI: true,
		zoomControl: true,
	};

	const onMapMounted = useCallback((map) => {
		mapRef.current = map;
	}, []);

	const panTo = useCallback(({ lat, lng }) => {
		mapRef.current.panTo({ lat, lng });
		mapRef.current.setZoom(13);
	}, []);

	const fetchPlaces = () => {
		const bounds = mapRef.current.getBounds();
		const service = new window.google.maps.places.PlacesService(
			mapRef.current
		);
		const request = {
			bounds: bounds,
			type: ['bar'],
		};
		service.nearbySearch(request, (results, status) => {
			if (
				status === window.google.maps.places.PlacesServiceStatus.OK
			) {
				setPlaces(results);
			}
		});
	};

	//* Allows for map scrolling and causes re-render once finished
	//* Initial center
	const [position, setPosition] = useState({
		lat: 29.749907,
		lng: -95.358421,
	});

	//* Reset center point
	function handleCenter() {
		if (!mapRef.current) return;

		const newPos = mapRef.current.getCenter().toJSON();
		setPosition(newPos);
	}

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		libraries,
	});

	if (loadError) return 'Error loading maps';
	if (!isLoaded) return 'Loading Maps';

	return (
		<div>
			<GoogleMap
				mapContainerStyle={mapContainerStyle}
				zoom={13}
				center={position}
				options={options}
				onLoad={onMapMounted}
				onTilesLoaded={fetchPlaces}
				onBoundsChanged={fetchPlaces}
				onDragEnd={handleCenter}
			>
				<Title>
					Bars Near You{' '}
					<span role='img' aria-label='beer'>
						🍺 🍸
					</span>
				</Title>
				<Locate panTo={panTo} />
				{places &&
					places.map((place, i) => (
						<Marker
							key={i}
							position={{
								lat: place.geometry.location.lat(),
								lng: place.geometry.location.lng(),
							}}
							icon={{
								url: Icon,
								scaledSize: new window.google.maps.Size(30, 47),
							}}
							onClick={() => {
								setSelected(place);
							}}
						/>
					))}
				{selected ? (
					<InfoWindow
						position={{
							lat: selected.geometry.location.lat(),
							lng: selected.geometry.location.lng(),
						}}
						onCloseClick={() => {
							setSelected(null);
						}}
					>
						<div>
							<img
								src={
									selected.photos ? selected.photos[0].getUrl() : null
								}
								alt='Photo Unavailable'
								height='100'
								width='200'
							/>
							<h2>{selected.name}</h2>
							<h4>{selected.vicinity}</h4>
							<h4>rating: {selected.rating}</h4>
						</div>
					</InfoWindow>
				) : null}
			</GoogleMap>
		</div>
	);
}

function Locate({ panTo }) {
	return (
		<button
			className='locate'
			onClick={() => {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						panTo({
							lat: position.coords.latitude,
							lng: position.coords.longitude,
						});
					},
					() => null
				);
			}}
		>
			<CompassIcon src={Compass} alt='' width='50' height='50' />
		</button>
	);
}
