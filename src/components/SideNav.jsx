import "../css/sideNav.css"

const SideNav = ({ isOpen, toggleNav }) => {
  return (
    <div className={`sidenav ${isOpen ? 'open' : ''}`}>
      <button className="closebtn" onClick={toggleNav}>×</button>
      <a href="/">Home</a>
      <a href="/staffs">Staffs</a>
      <a href="/forms">Forms</a>
      <a href="/profile">Profile</a>
      <a href="#">News</a>
    </div>
  );
};

export default SideNav;
