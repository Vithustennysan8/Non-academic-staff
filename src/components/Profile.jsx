import "../css/profile.css";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getUserDetail = async () => {
      if (token) {
        const response = await axios.get(
          "http://localhost:8080/auth/user/info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } else {
        navigate("/login");
      }
    };
    getUserDetail();
  }, [navigate]);

  const handleLogout =() =>{
    localStorage.removeItem("token");
    alert("Are you sure!");
    navigate("/login");
  }

  return (
    <div>
      <Header />
      <div id="profile-container">
        <div className="profile-bar">
          <div className="profile-heading">
            <h3>Personal</h3>
          </div>
        </div>

        <div className="small-navbar">
          <p>
            <a href="#">
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/8188/8188360.png"
                  alt="icon1"
                />
                Edit Profile
              </span>
            </a>
          </p>
          <p>
            <a href="#">
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/25/25215.png"
                  alt="icon2"
                />
                Security Settings
              </span>
            </a>
          </p>
          <p>
            <a href="#">
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3602/3602123.png"
                  alt="icon3"
                />
                Notification
              </span>
            </a>
          </p>
          <p>
            <a href="#">
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10541/10541390.png"
                  alt="icon3"
                />
                Subscriptions
              </span>
            </a>
          </p>
        </div>

        <div className="profile-img">
          <img
            src="https://cdn2.momjunction.com/wp-content/uploads/2015/08/33-Funky-Short-Hairstyles-For-Kids.jpg.webp"
            alt=""
          />
        </div>
        <div className="profile-detail-container">
          <div className="profile-namebox">
            <label htmlFor="firstname">
              First Name
              <input
                type="text"
                name="first_name"
                id="firstname"
                value={user.first_name}
                required
                placeholder=""
              />
            </label>
            <label htmlFor="lastname">
              Last Name
              <input
                type="text"
                name="last_name"
                value={user.last_name}
                id="lastname"
                required
                placeholder=""
              />
            </label>
          </div>

          <div className="profile-emailbox">
            <label htmlFor="emailAddress">
              Email Address
              <input
                type="text"
                name="emailAddress"
                id="emailAddress"
                value={user.email}
                required
                placeholder=""
              />
            </label>
          </div>

          <div className="profile-phoneNumber">
            <label htmlFor="phoneNumber">
              Phone Number
              <input
                type="number"
                name="phoneNumber"
                id="phoneNumber"
                value={user.phone_no}
                required
                placeholder=""
              />
            </label>
          </div>

          <div className="profile-streetAddress">
            <label htmlFor="streetAddress">
              Address
              <input
                type="text"
                name="streetAddress"
                id="streetAddress"
                value={user.address}
                required
              />
            </label>
          </div>

          <div className="profile-city">
            <label htmlFor="zipCode">
              Postal Code
              <input
                type="number"
                name="postal_code"
                id="zipCode"
                value={user.postal_code}
              />
            </label>
            <label htmlFor="city">
              City
              <input
                type="text"
                name="city"
                id="city"
                value={user.city}
              />
            </label>
          </div>

          <div className="profile-state">
            <label htmlFor="faculty">
              Faculty
              <input
                type="text"
                name="faculty"
                id="faculty"
                required
                value={user.faculty}
                placeholder=""
              />
            </label>
            <label htmlFor="department">
              Department
              <input
                type="text"
                name="department"
                id="department"
                value={user.department}
                required
                placeholder=""
              />
            </label>
          </div>

          <div className="submit_btn">
            <input type="button" value="Update" />
          </div>
          <div className="submit_btn logout-btn">
            <input type="button" value="Logout" onClick={handleLogout}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
