import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet'
import LocationMarker from './LocationMarker'

export default function ContactsCard(props) {

    return (
        <div className='card-container' id={props.id} key={props.id}>
            <div className='card'>
                <div>
                    {props.name}
                </div>
                <div>
                    {props.email}
                </div>
                <div>
                    {props.phone}
                </div>
                <div>
                    {props.status}
                </div>
                <div className='map'>
                    <MapContainer center={[33.8938, 35.5018]} zoom={12} scrollWheelZoom={false}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LocationMarker />
                    </MapContainer>
                    {/* {props.address.location ?? "Address not set"} */}
                </div>
            </div>
        </div>
    )
}
