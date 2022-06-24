import { Route, Routes, useNavigate } from 'react-router-dom'
import Header from './pages/Header'
import Auth from './pages/Auth'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Contacts from './pages/Contacts'

function App() {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(false)
  const [contacts, setContacts] = useState([])

  const handleAuthentication = async () => {
    try {
      let res = await axios({
        url: `http://127.0.0.1:777/me`,
        method: "Get",
        headers: {
          Authorization: `bearer ${ localStorage.getItem('token') }`
        },
      })
      if (res.data.user) {
        setLoggedIn(true)
        setUser(res.data.user)
        navigate('/contacts')
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loggedIn ? navigate('/contacts') : handleAuthentication()
  }, [])

  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} />}
          ></Route>
          <Route
            path="/contacts"
            element={<Contacts />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
