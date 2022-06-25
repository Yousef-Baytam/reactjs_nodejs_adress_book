import React, { useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet';
import { useMapEvents } from 'react-leaflet'

export default function LocationMarker(props) {

    const map = useMapEvents({
        click(e) {
            props.setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        }
    })

    useEffect(() => {
        setTimeout(() => {
            props.position && map.flyTo(props.position, map.getZoom())
        }, 100)
    }, [props.position])

    return props.position === null ? null : (
        <Marker position={props.position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}
