import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Homepage from "./pages/Homepage/Homepage";

import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserHome from './pages/UserHome/UserHome'
import Account from './pages/AccountPage/AccountPage'
import Games from './pages/Games/games'
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/userHome" element={<UserHome/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/games" element={<Games />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
