import "../css/sideNav.css"

const SideNav = ({ isOpen, toggleNav }) => {
  return (
    <div className={`sidenav ${isOpen ? 'open' : ''}`}>
      <button className="closebtn" onClick={toggleNav}>×</button>
      <a href="#">Home</a>
      <a href="#">Staffs</a>
      <a href="#">Forms</a>
      <a href="#">Profile</a>
      <a href="#">News</a>
    </div>
  );
};

export default SideNav;
