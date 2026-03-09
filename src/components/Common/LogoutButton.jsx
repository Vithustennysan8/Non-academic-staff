import { useAuth } from "../../Contexts/AuthContext";

const LogoutButton = ({ className = "", children = "Logout" }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <button 
      className={className} 
      onClick={handleLogout}
      type="button"
    >
      {children}
    </button>
  );
};

export default LogoutButton;
