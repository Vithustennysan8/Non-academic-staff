import { useContext, useEffect, useRef, useState } from "react";
import "../../css/Common/header.css";
import SideNav from "./SideNav";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { Axios } from "../AxiosReqestBuilder";
import { NetworkStatusContext } from "../../Contexts/NetworkStatusContext";
import userIcon from "../../assets/images/header/default-avatar-profile-icon-social-600nw-1677509740.webp"
import logo from "../../assets/University_of_Peradeniya_crest-150x150.png"
import sideNav from "../../assets/images/header/sideNav.png";
import NetworkStatusMonitor from "./NetworkStatusMonitor";

const Header = () => {
  const { isLogin, user, setUser } = useAuth();
  const {isOnline} = useContext(NetworkStatusContext);
  const navigate = useNavigate();
  const [src, setSrc] = useState(userIcon);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const sideNavRef = useRef(null);
  const sideNavImg = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if( sideNavRef.current && !event.composedPath().includes(sideNavRef.current) && !event.composedPath().includes(sideNavImg.current)){
        setIsSideNavOpen(false);
      }
    }
    
    const handleEscape = (event) => {
      if(event.code === "Escape" || event.keyCode === 27){
        setIsSideNavOpen(false);
      }
    }

    document.body.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEscape)

    return ()=>{
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEscape)
    }
  }, [])

  useEffect(() => {
    const getUserDetail = async () => {
      if (isLogin) {
        try {
          const response = await Axios.get("/user/info");
          setUser(response.data);
        } catch (error) {
          console.log("Error fetching user details", error);
        }
      }
    };
    getUserDetail();
  }, [isLogin, setUser]);

  useEffect(() => {
    if (user.image_data) {
      setSrc(`data:${user.image_type};base64,${user.image_data}`);
    } else {
      setSrc(userIcon);
    }
  }, [user.image_data, user.image_type]);


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
                src={logo}
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
          <p><Link to={"/"}>Home</Link></p>
          { isLogin && <p><Link to="/staffs">Staffs</Link></p>}
          <p><Link to="/forms">Applications</Link></p>
          { isLogin && <p><Link to="/forum">Forum</Link></p> }
          <p><Link to="/contact">Contact</Link></p>
          <p><Link to="/Dashboard">Dashboard</Link></p>
        </div>

        {isLogin ? (
          <>
            <div className="header-profile">
              <p className="username">{user.first_name}</p>
              <div>
                <Link to="/Dashboard">
                  <img className={isOnline? "online":"offline"} src={src} alt="Profile-image" />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="header-login">
              <button className="bttn" onClick={handleHeaderLogin}>
                Login
              </button>
            </div>
          </>
        )}
      </header>

      {/* Side Navbar buttton and component */}
      <button ref={sideNavImg} id="side-nav-btn" onClick={toggleSideNav}>
        <img
          id="side-nav-img"
          src={sideNav}
          alt=""
        />
      </button>
      <SideNav refFunc={sideNavRef} isOpen={isSideNavOpen} toggleNav={toggleSideNav} />
      <NetworkStatusMonitor/>
    </>
  );
};

export default Header;
