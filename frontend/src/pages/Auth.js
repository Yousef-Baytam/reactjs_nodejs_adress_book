import React from 'react'
import { useNavigate } from 'react-router-dom'
import Submit from '../components/Submit'
import Input from '../components/Input'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Auth(props) {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            let res = await axios({
                url: "http://127.0.0.1:777/login",
                method: "POST",
                data: {
                    "username": username,
                    "password": password
                },
            })
            console.log(res)
            props.setLoggedIn(true)
            localStorage.setItem('token', res.data.token.token)
            navigate('/contacts')
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleRegister = async () => {
        try {
            let res = await axios({
                url: "http://127.0.0.1:777/register",
                method: "POST",
                data: {
                    "username": username,
                    "email": email,
                    "password": password
                },
            })
            console.log(res)
            props.setLoggedIn(true)
            localStorage.setItem('token', res.data.token.token)
            navigate('/contacts')
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className='auth-container'>
                <div>
                    My Phone Book
                </div>
                <form className=''>
                    <div className='form-content'>
                        <Input type={'text'} name={'usernameLogin'} placeholder={'Username'} value={username} setValue={setUsername} />
                        <Input type={'password'} name={'passwordLogin'} placeholder={'Password'} value={password} setValue={setPassword} />
                        <Submit value={'Login'} run={handleLogin} />
                        <div className='form-footer'>Dont have an accout? <span className='form-action'>Register</span></div>
                    </div>
                </form>
                <form className=''>
                    <div>
                        <Input type={'text'} name={'usernameRegister'} placeholder={'Username'} value={username} setValue={setUsername} />
                        <Input type={'email'} name={'emailRegister'} placeholder={'Email'} value={email} setValue={setEmail} />
                        <Input type={'password'} name={'passwordRegister'} placeholder={'Password'} value={password} setValue={setPassword} />
                        <Submit value={'Sign up'} run={handleRegister} />
                        <span className='form-footer form-action'>Back</span>
                    </div>
                </form>
            </div>
        </>
    )
}
