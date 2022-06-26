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
        <div>
            <div>
                All Contacts
            </div>
            <div onClick={() => { handleLogout() }}>
                Logout
            </div>
        </div>
    )
}
