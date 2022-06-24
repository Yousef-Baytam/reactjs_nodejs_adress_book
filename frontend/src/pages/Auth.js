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
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div>
                <div>
                    Survey Champ
                </div>
                <form>
                    <div>
                        <Input type={'username'} name={'username'} placeholder={'Username'} value={username} setValue={setUsername} />
                        <Input type={'password'} name={'password'} placeholder={'Password'} value={password} setValue={setPassword} />
                        <Submit value={'Login'} run={handleLogin} />
                        <div>Dont have an accout? <span>Register</span></div>
                    </div>
                </form>
            </div>
            <div>
                <div>
                    Survey Champ
                </div>
                <form>
                    <div>
                        <Input type={'text'} name={'username'} placeholder={'Username'} value={username} setValue={setUsername} />
                        <Input type={'email'} name={'email'} placeholder={'Email'} value={email} setValue={setEmail} />
                        <Input type={'password'} name={'password'} placeholder={'Password'} value={password} setValue={setPassword} />
                        <Submit value={'Sign up'} />
                        <span>Back</span>
                    </div>
                </form>
            </div>
        </>
    )
}
