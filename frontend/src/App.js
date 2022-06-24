import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Auth from './pages/Auth'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Contacts from './pages/Contacts'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
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

  const handleContacts = async () => {
    try {
      let res = await axios({
        url: `http://127.0.0.1:777/contacts`,
        method: "Get",
        headers: {
          Authorization: `bearer ${ localStorage.getItem('token') }`
        },
      })
      if (res.data.results) {
        setContacts(res.data.results)
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loggedIn ? navigate('/contacts') : localStorage.getItem('token') && handleAuthentication()
    handleContacts()
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
            element={<Contacts loggedIn={loggedIn} user={user} contacts={contacts} setContacts={setContacts} />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
