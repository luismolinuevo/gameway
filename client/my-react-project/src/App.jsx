import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Homepage from "./pages/Homepage/Homepage";

import './App.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserHome from './pages/UserHome/UserHome'
import Account from './pages/AccountPage/AccountPage'
import Games from './pages/Games/games'
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProfileFollowers from "./pages/ProfileFollowers/ProfileFollowers";
import SpecficChat from "./pages/Chat/SpecificChat/SpecficChat";
import CreatePost from "./pages/Posts/CreatePost";
import Posts from "./pages/Posts/Posts";
import ChatPage from "./pages/Chat/ChatPage"
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
        <Route path="/profile/:id" element={<ProfilePage/>}/>
        <Route path="/profileFollowers" element={<ProfileFollowers/>}/>
        <Route path="/createPost" element={<CreatePost/>}/>
        <Route path="/viewPost" element={<Posts/>}/>
        <Route path="/chat/:id" element={<SpecficChat/>} />
        <Route path="/chatPage" element={<ChatPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
