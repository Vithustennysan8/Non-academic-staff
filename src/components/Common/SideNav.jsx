import { Link } from "react-router-dom";
import "../../css/Common/sideNav.css"
import { useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";


const SideNav = ({ isOpen, toggleNav }) => {
  const {isLogin} = useContext(UserContext);
  
  return (
    <div className={`sidenav ${isOpen ? 'open' : ''}`} >
      <button className="closebtn" onClick={toggleNav}>×</button>
      <Link to="/" onClick={toggleNav}>Home</Link>
      {isLogin && <Link to="/staffs" onClick={toggleNav}>Staffs</Link>}
      <Link to="/forms" onClick={toggleNav}>Forms</Link>
      <Link to="/forum" onClick={toggleNav}>Forum</Link>
      <Link to="/contact" onClick={toggleNav}>Contact</Link>
      <Link to="/profile" onClick={toggleNav}>Profile</Link>
    </div>
  );
};

export default SideNav;
