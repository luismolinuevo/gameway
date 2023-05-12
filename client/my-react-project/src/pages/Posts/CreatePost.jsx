import React from "react";
import {useState} from "react";
import axios from "axios";
import "./createpost.scss";
import { useLocation } from "react-router-dom";

export default function CreatePost(){
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const gameName = params.get("name");

  async function handleSubmit(){
    try{
      const token = localeStorage.getItem(jwt);
      const response = axios.post('https://localhost:8080/post', {
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
    <form >
      <label for="title" className="title">Post Title</label>
      <input type="text" className="title--input" onChange={e => setTitle(e.target.value)}></input>
      <label for="title" className="title">Post Body</label>
      <input type="text" className="title--body" onChange={e => setBody(e.target.value)}></input>
      <button className="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
}