import { Link } from "react-router-dom";
import "../../css/Common/sideNav.css"
import { useContext } from "react";
import { LoginContext } from "../../Contexts/LoginContext";
import { UserContext } from "../../Contexts/UserContext";


const SideNav = ({ refFunc, isOpen, toggleNav }) => {
  const {isLogin} = useContext(LoginContext);
  const {user} = useContext(UserContext);
  
  return (
    <div ref={refFunc} className={`sidenav ${isOpen ? 'open' : ''}`} >
      <button className="closebtn" onClick={toggleNav}>×</button>
      <Link to="/" onClick={toggleNav}>Home</Link>
      {isLogin && <Link to="/staffs" onClick={toggleNav}>Staffs</Link>}
      { user.role === "USER" && <Link to="/forms" onClick={toggleNav}>Applications</Link> }
      {isLogin && <Link to="/forum" onClick={toggleNav}>Forum</Link>}
      <Link to="/contact" onClick={toggleNav}>Contact</Link>
      <Link to="/profile" onClick={toggleNav}>Profile</Link>
    </div>
  );
};

export default SideNav;
