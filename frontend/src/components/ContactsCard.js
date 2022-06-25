import React from 'react'


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
                <div onClick={() => {
                    props.address && props.setPosition(props.address.geometry.coordinates);
                    props.address && props.setMapDisplay(true)
                }}>
                    {props.address ? props.address.location : "Address not set"}
                </div>
            </div>
        </div>
    )
}
