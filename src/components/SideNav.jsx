import { Link } from "react-router-dom";
import "../css/sideNav.css"


const SideNav = ({ isOpen, toggleNav }) => {
  
  return (
    <div className={`sidenav ${isOpen ? 'open' : ''}`} >
      <button className="closebtn" onClick={toggleNav}>×</button>
      <Link to="/" onClick={toggleNav}>Home</Link>
      <Link to="/staffs" onClick={toggleNav}>Staffs</Link>
      <Link to="/forms" onClick={toggleNav}>Forms</Link>
      <Link to="/forum" onClick={toggleNav}>Forum</Link>
      <Link to="/contact" onClick={toggleNav}>Contact</Link>
      <Link to="/profile" onClick={toggleNav}>Profile</Link>
    </div>
  );
};

export default SideNav;
