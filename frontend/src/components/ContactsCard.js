import React from 'react'


export default function ContactsCard(props) {

    return (
        <div className='card-container' id={props.id} key={props.id}>
            <div className='card'>
                <i class="fa-solid fa-pen-to-square"></i>
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
                <div onClick={() => {
                    props.address && props.setPosition(props.address.geometry.coordinates);
                    props.address && props.setMapDisplay(true)
                }} style={{ cursor: 'pointer' }}>
                    {props.address ? props.address.location : "Address not set"} {props.address && <i class="fa-solid fa-map-location-dot" style={{ color: "darkblue" }}></i>}
                </div>
                <i class="fa-solid fa-trash" onClick={() => { props.deleteContact(props.id); console.log(props.id) }}></i>
            </div>
        </div>
    )
}
