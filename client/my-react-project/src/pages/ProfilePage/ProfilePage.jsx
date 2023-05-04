import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { FaUserAstronaut } from "react-icons/fa";
import "./ProfilePage.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
    const params = useParams();
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {

        const findUser =  async () => {
            try {
                const user = await axios.get(`http://localhost:8080/auth/${1}`);

                if(user.status == 200) {
                    setUserInfo(user.data);
                    console.log(user.data)
                } else {
                    console.log("Error fetching data")
                }
            } catch(error) {
                console.log(error)
            }
        }

        findUser();

        return () => {
        };
      }, []);

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
              <p className="profile-user-name">Tom</p>
              <div>
                <button className="profile-buttons">
                    Follow
                </button>
                <button className="profile-buttons">
                    Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
