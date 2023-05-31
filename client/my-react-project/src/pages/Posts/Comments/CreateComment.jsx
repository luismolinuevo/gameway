import React from "react";
import {useState} from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import '../Comments/createcomment.scss';
export default function CreateComment(){
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
    <div className="comment-Post">
        <form className="form-container" >
            
            
            <div className="form--body">
              
                <br/>
                <textarea className="body--form" onChange={e => setBody(e.target.value)}placeholder="Leave a comment here..."></textarea>
            </div>
            
            <div className="submit">
                <button className="submit--button"onClick={handleSubmit}>Submit</button>
            </div>
            
        </form>
    </div>
    
  );
}