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
  const [contactsCopy, setContactsCopy] = useState([])
  const [gotContacts, setGotContacts] = useState(false)
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [relationshipStatus, setRelationshipStatus] = useState('')
  const [address, setAddress] = useState(null)
  const [position, setPosition] = useState(null)
  const [filters, setFilters] = useState(null)

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
        setGotContacts(true)
        setContactsCopy(res.data.results)
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const addContact = async () => {
    try {
      let res = await axios({
        url: `http://127.0.0.1:777/contacts`,
        method: "post",
        data: {
          "fullName": fullName,
          "phone": phone,
          "email": email,
          "relationshipStatus": relationshipStatus.toLowerCase(),
          "address": {
            "location": address,
            "geometry": {
              "type": "point",
              "coordinates": position
            }
          }
        },
        headers: {
          Authorization: `bearer ${ localStorage.getItem('token') }`
        },
      })
      if (res.data.success) {
        setContacts([...contacts, res.data.results])
        setContactsCopy([...contacts, res.data.results])
        setFullName('')
        setPhone('')
        setEmail('')
        setRelationshipStatus('')
        setAddress(null)
        setPosition(null)
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  const patchContact = async (id) => {
    try {
      let res = await axios({
        url: `http://127.0.0.1:777/contacts/${ id }`,
        method: "patch",
        data: {
          "fullName": fullName,
          "phone": phone,
          "email": email,
          "relationshipStatus": relationshipStatus,
          "address": address
        },
        headers: {
          Authorization: `bearer ${ localStorage.getItem('token') }`
        },
      })
      // if (res.data.success) {
      //   setContacts([...contacts, res.data.results])
      // }
    }
    catch (e) {
      console.log(e);
    }
  }

  const deleteContact = async (id) => {
    try {
      let res = await axios({
        url: `http://127.0.0.1:777/contacts/${ id }`,
        method: "delete",
        headers: {
          Authorization: `bearer ${ localStorage.getItem('token') }`
        },
      })
      console.log(res)
      setContacts(contacts.filter((e) => e._id != id))
      setContactsCopy(contacts.filter((e) => e._id != id))
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loggedIn ? navigate('/contacts') : localStorage.getItem('token') && handleAuthentication()
  }, [loggedIn])

  return (
    <>
      {location.pathname != '/' && <Header setLoggedIn={setLoggedIn} setUser={setUser} />}
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Auth loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} />}
          ></Route>
          <Route
            path="/contacts"
            element={<Contacts loggedIn={loggedIn}
              user={user}
              contacts={contacts}
              setContacts={setContacts}
              handleContacts={handleContacts}
              gotContacts={gotContacts}
              fullName={fullName}
              setFullName={setFullName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              relationshipStatus={relationshipStatus}
              setRelationshipStatus={setRelationshipStatus}
              address={address}
              setAddress={setAddress}
              addContact={addContact}
              setPosition={setPosition}
              position={position}
              filters={filters}
              setFilters={setFilters}
              contactsCopy={contactsCopy}
              deleteContact={deleteContact} />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
