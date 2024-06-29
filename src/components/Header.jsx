import { useState } from "react";
import "../css/header.css";
import SideNav from "./SideNav";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const headerLoginNavigate = useNavigate();

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const handleHeaderLogin = ()=>{
    headerLoginNavigate("/login")
  }

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
            <p><a href="/">Home</a></p>
            <p><a href="/staffs">Staffs</a></p>
            <p><a href="/forms">Forms</a></p>
            <p><a href="/profile">Profile</a></p>
            <p><a href="#">News</a></p>
        </div>

        {isLogin? 
          <div className="header-profile">
            <p className="username">Tharanka</p>
            <img src="https://www.befunky.com/images/wp/wp-2021-01-linkedin-profile-picture-after.jpg?auto=avif,webp&format=jpg&width=944" alt="Profile-image" />
          </div>
        :
          <div className="header-login">
            <button onClick={handleHeaderLogin}>Login</button>
          </div>
        }
      </header>

    {/* Side Navbar buttton and component */}
      <button id="side-nav-btn" onClick={toggleSideNav}>
        <img id="side-nav-img" src="https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/chevron-direction-right-round-outline-icon.png" alt="" />
      </button>
      <SideNav isOpen={isSideNavOpen} toggleNav={toggleSideNav} />
      
    </>
  );
};

export default Header;
