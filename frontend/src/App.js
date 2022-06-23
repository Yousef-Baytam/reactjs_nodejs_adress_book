import { Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Auth from './pages/Auth'
import './App.css';



function App() {
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
