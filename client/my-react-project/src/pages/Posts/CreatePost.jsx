import React from "react";
import {useState} from "react";
import axios from "axios";
import "./createpost.scss";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

export default function CreatePost(){
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  let gameName = params.get("name");
  console.log(gameName);
  if(gameName == "" || gameName == null || gameName == "null"){
    gameName = "Music"
  }
  console.log(gameName);
  async function handleSubmit(){
    event.preventDefault()
    try{
      const token = localStorage.getItem("token");
      const response = axios.post('http://localhost:8080/post', {
        'title': title, 
        'body': body, 
        'game': gameName,
        'casual': true,
        'comp': false,
        'dontcare': true
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
    } catch(error) {
        console.log(error)
    };
    
  }

  return(
    <div className="div createPost">
        <Navbar/>
        <form className="form-container" >
            
            <div className="form--title">
                <label htmlFor="title" className="title">Post Title</label>
                <input type="text" className="title--input" onChange={e => setTitle(e.target.value)}></input>
            </div>
            
            <div className="form--body">
                <label htmlFor="title" className="body--title">Post Body</label>
                <br/>
                <textarea className="body--form" onChange={e => setBody(e.target.value)}></textarea>
            </div>
            
            <div className="submit">
                <button className="submit--button"onClick={handleSubmit}>Submit</button>
            </div>
            
        </form>
    </div>
    
  );
}