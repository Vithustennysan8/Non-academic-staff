import { useContext, useEffect, useRef, useState } from "react";
import "../../css/Common/header.css";
import SideNav from "./SideNav";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../Contexts/LoginContext";
import { UserContext } from "../../Contexts/UserContext";
import { Axios } from "../AxiosReqestBuilder";

const Header = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [src, setSrc] = useState("https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg");
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
    const token = localStorage.getItem("token");
    const getUserDetail = async () => {
      if (token) {
        try {
          const response = await Axios.get("/auth/user/info");
          setUser(response.data);
        } catch (error) {
          console.log(error);
        }

        if (user.image_data) {
          setSrc(`data:${user.image_type};base64,${user.image_data}`);
        } else {
          setSrc(
            "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
          );
        }
      } else {
        setUser({});
        setIsLogin(false);
      }
    };
    getUserDetail();
  }, [user.image_data, user.image_type, isLogin, setIsLogin, setUser]);


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
                  <img src={src} alt="Profile-image" />
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
          src="https://uxwing.com/wp-content/themes/uxwing/download/arrow-direction/chevron-direction-left-round-outline-icon.png"
          alt=""
        />
      </button>
      <SideNav refFunc={sideNavRef} isOpen={isSideNavOpen} toggleNav={toggleSideNav} />
    </>
  );
};

export default Header;
