import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ className = "", children = "Logout" }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

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
