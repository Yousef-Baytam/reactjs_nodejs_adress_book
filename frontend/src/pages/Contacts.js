import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContactsCard from '../components/ContactsCard'
import Input from '../components/Input'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Submit from '../components/Submit'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import LocationMarker from '../components/LocationMarker'
import Filter from '../components/Filter'

export default function Contacts(props) {
    const navigate = useNavigate()

    const mapRef = useRef()
    const [formDisplay, setFormDisplay] = useState(false)
    const [mapDisplay, setMapDisplay] = useState(false)
    const [nameFilter, setNameFilter] = useState({ "atr": 'contains', "value": '' })
    const [emailFilter, setEmailFilter] = useState({ "atr": 'contains', "value": '' })
    const [phoneFilter, setPhoneFilter] = useState({ "atr": 'contains', "value": '' })
    const [statusFilter, setStatusFilter] = useState({ "atr": 'contains', "value": '' })

    useEffect(() => {
        !props.loggedIn && navigate('/')
        props.handleContacts()

    }, [])

    window.dispatchEvent(new Event('resize'))

    // useEffect(() => {
    //     const { current = {} } = mapRef
    //     // const { leafletElement: map } = current
    //     // current.invalidateSize()
    //     setTimeout(() => {
    //         current.flyTo(props.position, current.getZoom())
    //     }, 500)
    // }, [mapRef])

    const handleContacts = () => {
        if (props.gotContacts)
            return props.contacts.map((i) => <ContactsCard name={i.fullName}
                phone={i.phone}
                email={i.email}
                status={i.relationshipStatus}
                address={i.address}
                id={i.id}
                key={i.id}
                setPosition={props.setPosition}
                setMapDisplay={setMapDisplay} />)
    }

    const handleFilters = () => {
        props.setFilters({ "name": nameFilter, "email": emailFilter, "phone": phoneFilter, "status": statusFilter })
    }

    useEffect(() => {
        handleFilters()
    }, [nameFilter, emailFilter, phoneFilter, statusFilter])
    return (
        <>

            {/* header tools  */}
            <div className='contacts-header-container'>
                <div className='options'>
                    <div>
                        Apply Filters
                    </div>
                    <div>
                        Clear Filters
                    </div>
                </div>
                <div>
                    <button onClick={() => setFormDisplay(!formDisplay)}>
                        Add new Contact
                    </button>
                </div>
            </div>

            {/* new contact form */}
            <div className={`form ${ formDisplay ? 'expanded' : 'hidden' }`}>
                <Input type={'text'} name={'Full Name'} placeholder={'Full Name'} value={props.fullName} setValue={props.setFullName} />
                <Input type={'text'} name={'Email'} placeholder={'Email'} value={props.email} setValue={props.setEmail} />
                <PhoneInput
                    placeholder="Enter phone number"
                    value={props.phone}
                    onChange={props.setPhone} />
                <label htmlFor='status'> Relationship Status</label><br />
                <select value={props.relationshipStatus} onChange={(e) => props.setRelationshipStatus(e.target.value)} id='status'>
                    <option value="None">None</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Separated">Separated</option>
                    <option value="Divorced">Divorced</option>
                </select>
                <Input type={'text'} name={'Address'} placeholder={'Address'} value={props.address} setValue={props.setAddress} />
                <div onClick={() => { setMapDisplay(true); }} style={{ color: props.position ? 'green' : 'red' }}>
                    Pick a location
                </div>
                <Submit value={'Add Contact'} run={props.addContact} />
            </div>

            {/* Map */}
            <div className={`mapBG ${ mapDisplay ? '' : 'd-none' }`}>
                <div className={`map ${ mapDisplay ? '' : 'd-none' }`}>
                    <div className='close' onClick={() => { setMapDisplay(false) }}>
                        Close
                    </div>
                    <MapContainer ref={mapRef} center={[33.8938, 35.5018]} zoom={14} scrollWheelZoom={true}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LocationMarker setPosition={props.setPosition} position={props.position} />
                    </MapContainer>
                </div>
            </div>

            {/* contacts header  */}
            <div className='header-container'>
                <div className='card'>
                    <div>
                        Full Name <i class="fa-solid fa-filter" id='name'>
                            <Filter name={"Name"} setNameFilter={setNameFilter} />
                        </i>
                    </div>
                    <div>
                        Email <i class="fa-solid fa-filter" id='email'>
                            <Filter name={"Email"} setNameFilter={setEmailFilter} />
                        </i>
                    </div>
                    <div>
                        Phone Number <i class="fa-solid fa-filter" id='phone'>
                            <Filter name={"Phone"} setNameFilter={setPhoneFilter} />
                        </i>
                    </div>
                    <div>
                        Relationship Status <i class="fa-solid fa-filter" id='status'>
                            <Filter name={"Status"} setNameFilter={setStatusFilter} />
                        </i>
                    </div>
                    <div>
                        Adress
                    </div>
                </div>
            </div>
            <div className='container'>
                {handleContacts()}
            </div>
        </>
    )
}
