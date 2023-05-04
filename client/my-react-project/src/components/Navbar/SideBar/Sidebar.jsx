import React from 'react';
import { useState } from 'react';
import "./sidebar.scss";
import { FaUserAstronaut, FaFileAlt, FaDiceFour, FaHome, FaGamepad, FaTerminal } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";

//This is to create the sidebar of the website
function SideBar(){
    const [isOpen, setOpen] = useState(true);
    //Handles the toggle of the sidebar
    function handleToggle(){
        setOpen(!isOpen);
    }

    return (
        <div className={`sidebar ${isOpen ? 'open': ''}`}>
            {/*The header of the side bar. I need to figure out how to make the toggle button to work. 
            Right now when I press toggle, the entire side bar disappears including the toggle button*/}
            <div className="sidebar--logo_content">
                <FaGamepad />
                <div className="logo_name">Game Way</div>
                <button onClick={handleToggle}><AiOutlineMenu /></button>
                
            </div>
            {/*The list of pages that are going to be in the side bar*/}
            <ul>
                <li>
                    <Link to="/">
                        <FaHome />
                        <span className='links-name'>Home</span>
                    </Link>
                    
                </li>
                <li>
                    <Link to="/games">
                        <FaDiceFour />
                        <span className='links-name'>Games</span>
                    </Link>
                </li>
                <li>
                    {/*I need to make the post page for me to link it. Do this later*/}
                    <FaFileAlt />
                    <span className='links-name'>Posts</span>
                </li>
                <li>
                    {/*The chat room page also needs to be made for me to link it*/}
                    <FaTerminal />
                    <span className='links-name'>Chat</span>
                </li>
                <li>
                    <Link to="/account">
                        <FaUserAstronaut />
                        <span className='links-name'>Profile</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
export default SideBar;