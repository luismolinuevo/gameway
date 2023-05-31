import React from "react";
import './comments.scss';
import Navbar from '../../../components/Navbar/Navbar'
import CommentPostCard from "./CommentPostCard";
import CommentCard from "./CommentCard"
import CreateComment from "./CreateComment"

/*
    The layout of this page would be similar to that of a blog post
    The page is going to start out with the post contents
    then we are going to have the section where they are going to create the post
    then we are going to show all of the posts below
*/

/*
    This is going to be to create the Post Card for the comments page
    It is basically going to be the same as the PostCard function minus the 
*/

export default function Comments(){

    return (
        <div className="comments--main">
            <Navbar />
            <CommentPostCard />
            <CreateComment />
            <CommentCard />
        </div>
        
    );
}