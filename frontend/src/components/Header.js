import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Header(props) {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        props.setLoggedIn(false)
        props.setUser({})
        navigate('/')
    }
    return (
        <div className='header'>
            <div onClick={() => { navigate('/contacts') }} className='button'>
                All Contacts
            </div>
            <div onClick={() => { handleLogout() }} className='button'>
                Logout
            </div>
        </div>
    )
}
