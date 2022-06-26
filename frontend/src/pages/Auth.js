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
    const [loginDnone, setLoginDnone] = useState(false)
    const [registerDnone, setRegisterDnone] = useState(true)
    const [fadeIn, setFadeIn] = useState(false)
    const [fadeOut, setFadeOut] = useState(false)
    const [slideIn, setSlideIn] = useState(false)
    const [slideOut, setSlideOut] = useState(false)
    const [backNforth, setbackNforth] = useState(true)

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
                <form className={`${ fadeIn ? 'fade-out' : '' } ${ fadeOut ? 'fade-in' : '' } ${ loginDnone ? 'translate' : '' }`}
                    onAnimationEnd={() => {
                        if (backNforth) {
                            setLoginDnone(true); setRegisterDnone(false); setFadeIn(false); setSlideIn(true); setFadeOut(false); setSlideOut(false);
                        } else {
                            setLoginDnone(false); setRegisterDnone(true); setFadeIn(false); setSlideIn(false); setFadeOut(false); setSlideOut(false);
                        }
                    }}>
                    <div className='form-content'>
                        <Input type={'text'} name={'usernameLogin'} placeholder={'Username'} value={username} setValue={setUsername} />
                        <Input type={'password'} name={'passwordLogin'} placeholder={'Password'} value={password} setValue={setPassword} />
                        <Submit value={'Login'} run={handleLogin} />
                        <div className='form-footer'>Dont have an accout? <span className='form-action' onClick={() => { setFadeIn(true); setFadeOut(false); setSlideOut(false); setbackNforth(true) }}>Register</span></div>
                    </div>
                </form>
                <form className={`${ slideIn ? 'slide-in' : '' } ${ slideOut ? 'slide-out' : '' } ${ registerDnone ? 'translate' : '' }`}
                    onAnimationEnd={() => {
                        if (backNforth) {
                            setLoginDnone(true); setRegisterDnone(false); setFadeIn(false); setSlideIn(false); setFadeOut(false); setSlideOut(false);
                        } else {
                            setLoginDnone(false); setRegisterDnone(true); setFadeIn(false); setSlideIn(false); setFadeOut(true); setSlideOut(false);
                        }
                    }}>
                    <div className='form-content'>
                        <Input type={'text'} name={'usernameRegister'} placeholder={'Username'} value={username} setValue={setUsername} />
                        <Input type={'email'} name={'emailRegister'} placeholder={'Email'} value={email} setValue={setEmail} />
                        <Input type={'password'} name={'passwordRegister'} placeholder={'Password'} value={password} setValue={setPassword} />
                        <Submit value={'Sign up'} run={handleRegister} />
                        <span className='form-footer form-action' onClick={() => { setFadeIn(false); setSlideIn(false); setSlideOut(true); setbackNforth(false) }}>Back</span>
                    </div>
                </form>
            </div>
        </>
    )
}
