import React from 'react'

export default function Auth(props) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        try {
            let res = await axios({
                url: "http://127.0.0.1:8000/api/login",
                method: "POST",
                data: {
                    "email": email,
                    "password": password
                },
            })
            console.log(res)
        }
        catch (e) {
            console.log(e);
        }

        return (
            <>

            </>
        )
    }
}