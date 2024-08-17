import { useContext, useEffect, useState } from "react";
import "../css/header.css";
import SideNav from "./SideNav";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../Contexts/LoginContext";
import { UserContext } from "../Contexts/UserContext";
import { Axios } from "./AxiosReqestBuilder";

const Header = () => {
  const {isLogin, setIsLogin} = useContext(LoginContext);

  const {user, setUser} = useContext(UserContext);
  const navigate = useNavigate();
  const [src, setSrc] = useState("https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg");
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const getUserDetail = async () => {
      if (token) {

        try {
          const response = await Axios.get("/auth/user/info",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }

        if(user.image_data){
          setSrc(`data:${user.image_type};base64,${user.image_data}`)
        }else{
          setSrc("https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg")
        }
        
      }else{
        setUser({});
        setIsLogin(false);
      }
    };
    getUserDetail();
  },[user.image_data, user.image_type, isLogin, setIsLogin, setUser]);
  
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
            <Link to={"/"}>
              <img
                src="https://w1.pngwing.com/pngs/659/960/png-transparent-gold-badge-university-of-ceylon-university-of-sri-lanka-higher-education-college-faculty-university-of-peradeniya-logo-thumbnail.png"
                alt="Uni-logo"
              />
            </Link>
          </div>
          <div className="head">
            <h2>Non Academic Staffs</h2>
            <h5>University of Peradeniya</h5>
            <p>Leave & Transfer Management System</p>
          </div>
        </div>

        <div className="nav">
          <p>
            <Link to={"/"}>Home</Link>
          </p>
          <p>
            <Link to="/staffs">Staffs</Link>
          </p>
          <p>
            <Link to="/forms">Forms</Link>
          </p>
          <p>
            <Link to="/forum">Forum</Link>
          </p>
          <p>
            <Link to="/contact">Contact</Link>
          </p>
        </div>

        {isLogin ? <>
          <div className="header-profile">
            <p className="username">{user.first_name}</p>
            <Link to="/profile">
              <img
                src={src}
                alt="Profile-image"
              />
            </Link>
          </div>
        </> : <>
          <div className="header-login">
            <button onClick={handleHeaderLogin}>Login</button>
          </div>
        </>}
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
