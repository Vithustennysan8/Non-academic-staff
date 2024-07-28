import { Link } from "react-router-dom";
import "../css/sideNav.css"

const SideNav = ({ isOpen, toggleNav }) => {
  return (
    <div className={`sidenav ${isOpen ? 'open' : ''}`}>
      <button className="closebtn" onClick={toggleNav}>×</button>
      <Link to="/">Home</Link>
      <Link to="/staffs">Staffs</Link>
      <Link to="/forms">Forms</Link>
      <Link to="/forum">Forum</Link>
      <Link to="/contact">Contact</Link>
    </div>
  );
};

export default SideNav;
