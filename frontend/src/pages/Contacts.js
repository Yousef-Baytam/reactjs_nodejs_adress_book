import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ContactsCard from '../components/ContactsCard'

export default function Contacts(props) {
    const navigate = useNavigate()

    useEffect(() => {
        !props.loggedIn && navigate('/')
        props.handleContacts()
    }, [])

    const handleContacts = () => {
        if (props.gotContacts)
            return props.contacts.map((i) => <ContactsCard name={i.fullName} phone={i.phone} email={i.email} status={i.relationshipStatus} address={i.address} id={i.id} />)
    }

    return (
        <>
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
