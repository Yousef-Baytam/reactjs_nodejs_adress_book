import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContactsCard from '../components/ContactsCard'
import Input from '../components/Input'

export default function Contacts(props) {
    const navigate = useNavigate()

    const [search, setSearch] = useState('')

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
            <div>
                <div>
                    <div>
                        Filter
                    </div>
                    <div>
                        <Input type={'text'} name={'Search'} placeholder={'Search'} value={search} setValue={setSearch} />
                    </div>
                </div>
                <div>
                    <button>
                        Add new Contact
                    </button>
                </div>
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
