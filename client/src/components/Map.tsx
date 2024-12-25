import { useNavigate } from 'react-router-dom';
import styles from './Map.module.css';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../context/useCities';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Buttons/Button';
import { useURLPosition } from '../hooks/useURLPosition';

export default function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState({ lat: 51.505, lng: -0.09 });
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const { latitude: lat, longitude: lng } = useURLPosition();

  useEffect(
    function () {
      if (!isNaN(lat) && !isNaN(lng)) {
        setMapPosition({ lat, lng });
      }
    },
    [lat, lng]
  );

  useEffect(
    function () {
      if (geoLocationPosition) {
        setMapPosition(geoLocationPosition);
      }
    },
    [geoLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button style='position' onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use my position'}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={[mapPosition.lat, mapPosition.lng]}
        zoom={13}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map(city => (
          <Marker position={city.position} key={city.id}>
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({
  position,
}: {
  position: { lat: number; lng: number };
}) {
  const map = useMap();
  useEffect(() => {
    map.setView([position.lat, position.lng]);
  }, [position, map]);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
