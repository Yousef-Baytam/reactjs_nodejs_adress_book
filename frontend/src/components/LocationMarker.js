import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet'

export default function LocationMarker(props) {
    const [test, setTest] = useState(null)
    const map = useMapEvents({
        click(e) {
            console.log(e)
            props.setPosition([e.latlng.lng, e.latlng.lat])
            setTest(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        }
    })

    return props.position === null ? null : (
        <Marker position={test}>
            <Popup>You are here</Popup>
        </Marker>
    )
}
