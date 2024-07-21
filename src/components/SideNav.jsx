import { Link } from "react-router-dom";
import "../css/sideNav.css"

const SideNav = ({ isOpen, toggleNav }) => {
  return (
    <div className={`sidenav ${isOpen ? 'open' : ''}`}>
      <button className="closebtn" onClick={toggleNav}>×</button>
      <Link href="/">Home</Link>
      <Link href="/staffs">Staffs</Link>
      <Link href="/forms">Forms</Link>
      <Link href="/forum">Forum</Link>
      <Link href="/contact">Contact</Link>
    </div>
  );
};

export default SideNav;
