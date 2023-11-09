"use client"
import React, {useEffect} from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';

export const HeatMap = ({ points }) => {
    const map = useMap();

    useEffect(() => {
        if (map && points) {
            const heatPoints = points;
            const heatLayer = L.heatLayer(heatPoints, { radius: 25 }).addTo(map);
            return () => {
                map.removeLayer(heatLayer);
            };
        }
    }, [map, points]);

    return null;
};

export const MapView = ({ data }) => {
    const position = [37.72458793701153, -122.38828501454333]; // Center of the map (San Francisco)

    return (
        <MapContainer center={position} zoom={20} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <HeatMap points={data} />
        </MapContainer>
    );
};

export default MapView;