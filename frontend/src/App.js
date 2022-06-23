import { Route, Routes, useNavigate } from 'react-router-dom'
import Header from './pages/Header'
import Auth from './pages/Auth'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

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
        // headers: {
        //   Cookie: `bearer ${ localStorage.getItem('token') }`
        // },
      })
      console.log(res)
    }
    catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    handleAuthentication()
  }, [])

  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Auth />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
