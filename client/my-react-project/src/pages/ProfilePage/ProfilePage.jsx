import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { FaUserAstronaut } from "react-icons/fa";
import "./ProfilePage.scss";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";

export default function ProfilePage() {
  const params = useParams();
  const [userInfo, setUserInfo] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [seePost, setSeePost] = useState(false);

  //TODO make params work , fetch all post, maybe see followers, and following
  //TODO show all post with button
  //TODO make buttons work

  useEffect(() => {
    const findUser = async () => {
      try {
        const user = await axios.get(`http://localhost:8080/auth/${params.id}`);

        if (user.status == 200) {
          setUserInfo(user.data);
        } else {
          console.log("Error fetching data");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const userPost = async () => {
      try {
        const userPost = await axios.get(
          `http://localhost:8080/post/userspost/${params.id}`
        );
        if (userPost.status == 200) {
          setUserPost(userPost.data);
          console.log(userPost.data);
        }
      } catch (error) {
        console.log("Error fetching user post");
      }
    };

    findUser();
    userPost();

    return () => {};
  }, []);

  const handleFollow = async () => {
    try {
      const follow = await axios.post(
        `http://localhost:8080/follower/${params.id}`,
        {
          followingId: params.id,
          // followingId: 2,
        }
      );
    } catch (error) {
      console.log("Error sending follower post");
    }
  };

  const handleSeePost = () => {
    setSeePost((prevValue) => !prevValue);
  };

  return (
    <div>
      <div className="profile">
        <Navbar />
        <div className="profile-info-container">
          <div className="profile-info-left">
            <div className="profile-user-icon">
              <div className="profile-user-container">
                <FaUserAstronaut style={{ color: "yellow" }} size={180} />
              </div>
            </div>
            <div className="profile-actions">
              <div>
                <p className="profile-user-name">{userInfo.username}</p>
                <div>
                  <button className="profile-buttons">Follow</button>
                  <button className="profile-buttons">Message</button>
                </div>
              </div>
              <div className="following">
                <div className="follower-actions">
                  <p>Following</p>
                  <Link to="">
                    <BsFillPeopleFill className="follower-icons" />
                  </Link>
                </div>
                <div className="follower-actions">
                  <p>Followers</p>
                  <Link to="">
                    <BsFillPeopleFill className="follower-icons" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="see-post-toggle-container">
            <button className="see-post" onClick={() => handleSeePost()}>
              {seePost ? "Close Post" : "See Post"}
            </button>
          </div>
        </div>
        <div className={`${seePost === true ? "see-post-container" : "off"}`}>
          {/**map through data in here */}
        </div>
      </div>
    </div>
  );
}
