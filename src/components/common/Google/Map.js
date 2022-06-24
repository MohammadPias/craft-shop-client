import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 23.4610615,
    lng: 91.1808748
};

const position = {
    lat: 23.4610634,
    lng: 91.182343
}

const Map = () => {
    const onLoad = marker => {
        // console.log('marker: ', marker)
    }
    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={14}
            >
                <Marker
                    onLoad={onLoad}
                    position={position}
                />
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;