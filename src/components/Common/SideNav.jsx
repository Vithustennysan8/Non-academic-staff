import { Link } from "react-router-dom";
import "../../css/Common/sideNav.css"
import { useAuth } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";

const SideNav = ({ refFunc, isOpen, toggleNav }) => {
  const { isLogin, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    toggleNav();
    toast.success("Logged out successfully!");
  };

  return (
    <div ref={refFunc} className={`sidenav ${isOpen ? 'open' : ''}`} >
      <button className="closebtn" onClick={toggleNav}>×</button>
      <Link to="/" onClick={toggleNav}>Home</Link>
      {isLogin && <Link to="/staffs" onClick={toggleNav}>Staffs</Link>}
      <Link to="/forms" onClick={toggleNav}>Applications</Link>
      {isLogin && <Link to="/forum" onClick={toggleNav}>Forum</Link>}
      <Link to="/contact" onClick={toggleNav}>Contact</Link>
      <Link to="/Dashboard" onClick={toggleNav}>Dashboard</Link>
      <div className="logout">
        <button className="bttn redbtn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default SideNav;
