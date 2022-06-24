import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContactsCard from '../components/ContactsCard'
import Input from '../components/Input'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function Contacts(props) {
    const navigate = useNavigate()

    const [search, setSearch] = useState('')
    const [formDisplay, setFormDisplay] = useState(false)

    useEffect(() => {
        !props.loggedIn && navigate('/')
        props.handleContacts()
    }, [])

    const handleContacts = () => {
        if (props.gotContacts)
            return props.contacts.map((i) => <ContactsCard name={i.fullName} phone={i.phone} email={i.email} status={i.relationshipStatus} address={i.address} id={i.id} key={i.id} />)
    }

    return (
        <>
            <div className='contacts-header-container'>
                <div className='options'>
                    <div>
                        Filter
                    </div>
                    <div>
                        <Input type={'text'} name={'Search'} placeholder={'Search'} value={search} setValue={setSearch} />
                    </div>
                </div>
                <div>
                    <button onClick={() => setFormDisplay(!formDisplay)}>
                        Add new Contact
                    </button>
                </div>
            </div>
            <div className='form'>
                <Input type={'text'} name={'Full Name'} placeholder={'Full Name'} value={props.fullName} setValue={props.setFullName} />
                <Input type={'text'} name={'Email'} placeholder={'Email'} value={props.email} setValue={props.setEmail} />
                <PhoneInput
                    placeholder="Enter phone number"
                    value={props.phone}
                    onChange={props.setPhone} />
                <Input type={'text'} name={'relationshipStatus'} placeholder={'Relationship Status'} value={props.relationshipStatus} setValue={props.setRelationshipStatus} />
                <Input type={'text'} name={'Address'} placeholder={'Address'} value={props.address} setValue={props.setAdress} />
            </div>
            <div className='header-container'>
                <div className='card'>
                    <div>
                        Full Name
                    </div>
                    <div>
                        Email
                    </div>
                    <div>
                        Phone Number
                    </div>
                    <div>
                        Relationship Status
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
