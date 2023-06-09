import React, {useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { FaUserAstronaut } from "react-icons/fa";
import "./ProfileFollowers.scss";
import axios from "axios";
import { useParams, Link, useLocation } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";

export default function ProfileFollowers() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const userName = params.get("id");
  const [userInfo, setUserInfo] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [seePost, setSeePost] = useState(false);
  const [showFollowersList, setShowFollowersList] = useState(true);
  const [mockFollowers, setMockFollowers] = useState([
    { id: 1, username: "Mock User ", img: "img1" },
    { id: 2, username: "Mock User 2", img: "img2" },
    { id: 3, username: "Mock User 3", img: "img3" },
    { id: 4, username: "Mock User 4", img: "img3" },
  ]);
  const [mockFollowing, setMockFollowing] = useState([
    { id: 5, username: "Mock User 5", img: "img4" },
    { id: 6, username: "Mock User 6", img: "img5" },
    { id: 7, username: "Mock User 7", img: "img6" },
  ]);


 

  const handleFollow = async () => {
    try {
      const follow = await axios.post(
        `http://localhost:8080/follower/`,
        
        {
          followingId: params.id,
          // followingId: 2,
        },
        
      );
      console.log("Follow sent")
    } catch (error) {
      console.log("Error sending follower post");
    }
  };

 
  const handleFollowersClick = () => {
    setShowFollowersList(true);
  };

  const handleFollowingClick = () => {
    setShowFollowersList(false);
  };

    return (
        <div>
          <div className="follow">
            <Navbar />
            <div className="profile-follow-container">
              <div className="profile-follow">
              <div className="profile-follow-top">
                    <div className="profile-user-icon">
                      <div className="profile-user-container">
                        <FaUserAstronaut style={{ color: "yellow" }} size={180} />
                      </div>
                    </div>
                    <div className="follow-actions">
                      <div>
                        <p className="follow-user-name">
                          Test:{userName} {showFollowersList ? "Followers" : "Following"}
                        </p>
                        <div>
                               {/* //Followers button will spawn the followers list */}

                          <button
                            className={`follow-button ${showFollowersList ? "selected" : ""}`}
                            onClick={handleFollowersClick}
                          >
                            Followers <BsFillPeopleFill className="follower-icons" />
                          </button>
                            {/* //Following button will spawn the following list */}
                          <button
                            className={`follow-button ${!showFollowersList ? "selected" : ""}`}
                            onClick={handleFollowingClick}
                          >
                            Following <BsFillPeopleFill className="follower-icons" />
                          </button>
                        </div>
                      </div>
                  </div>
                  </div>
                  <div className="profile-follow-bottom">
                  {/* //Followers and following list */}
                  
                  {showFollowersList ? (
                    
                    <ul className="followers-list">
                      {/* followers if clicked will direct you to their page*/}
                      {mockFollowers.map((follower) => (
                        
                      <Link to={`/profile/${follower.id}`} style={{ textDecoration: 'none' }}>
                        <li className="follower-item" key={follower.id}>

                          <div className="icon">
                            {/* followers-icon */}
                          <FaUserAstronaut 
                          style={{ color: "yellow" }} 
                          size={80} 
                          />
                          </div>

                          <a>{follower.username}</a>
        
                        </li>
                        </Link>
                      ))}
                    </ul>
                  ) : (

                    <ul className="following-list">
                       {/* following if clicked will direct you to their page*/}
                      {mockFollowing.map((following) => (
                      <Link to={`/profile/${following.id}` } style={{ textDecoration: 'none' }}>
                        <li className="follower-item" key={following.id}>
                          {/* following icon */}

                          <div className="icon">
                            <FaUserAstronaut 
                            style={{ color: "yellow",}}                     
                            size={80} />
                          </div> 

                          <a>{following.username}</a>
                        </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
      
      );
}
