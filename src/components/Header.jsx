import { useEffect, useState } from "react";
import "../css/header.css";
import SideNav from "./SideNav";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    const getUserDetail = async () => {
      if (token) {
        setIsLogin(true);
        const response = await axios.get(
          "http://localhost:8080/auth/user/info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      }
    };
    getUserDetail();
  }, []);
  
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const handleHeaderLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <header className="header-container">
        <div className="logo-head">
          <div className="nav-logo">
            <a href="#">
              <img
                src="https://w1.pngwing.com/pngs/659/960/png-transparent-gold-badge-university-of-ceylon-university-of-sri-lanka-higher-education-college-faculty-university-of-peradeniya-logo-thumbnail.png"
                alt="Uni-logo"
              />
            </a>
          </div>
          <div className="head">
            <h2>Non Academic Staffs</h2>
            <h5>University of Peradeniya</h5>
          </div>
        </div>

        <div className="nav">
          <p>
            <a href="/">Home</a>
          </p>
          <p>
            <a href="/staffs">Staffs</a>
          </p>
          <p>
            <a href="/forms">Forms</a>
          </p>
          <p>
            <a href="/forum">Forum</a>
          </p>
          <p>
            <a href="/contact">Contact</a>
          </p>
        </div>

        {isLogin ? (
          <div className="header-profile">
            <p className="username">{user.first_name}</p>
            <a href="/profile">
              <img
                src="https://cdn2.momjunction.com/wp-content/uploads/2015/08/33-Funky-Short-Hairstyles-For-Kids.jpg.webp"
                alt="Profile-image"
              />
            </a>
          </div>
        ) : (
          <div className="header-login">
            <button onClick={handleHeaderLogin}>Login</button>
          </div>
        )}
      </header>

      {/* Side Navbar buttton and component */}
      <button id="side-nav-btn" onClick={toggleSideNav}>
        <img
          id="side-nav-img"
          src="https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/chevron-direction-left-round-outline-icon.png"
          alt=""
        />
      </button>
      <SideNav isOpen={isSideNavOpen} toggleNav={toggleSideNav} />
    </>
  );
};

export default Header;
