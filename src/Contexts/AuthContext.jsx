import { createContext, useContext, useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  isAuthenticated, 
  getStoredToken, 
  storeToken, 
  clearAuthData, 
  getTimeUntilExpiry 
} from '../utils/tokenUtils';
import { refreshToken } from '../utils/refreshToken';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(isAuthenticated());
  const [user, setUser] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_no: '',
    address: '',
    postal_code: '',
    city: '',
    ic_no: '',
    emp_id: '',
    date_of_birth: '',
    job_type: '',
    faculty: '',
    department: '',
    normalEmail: '',
    image_data: '',
    image_type: '',
    role: ''
  });
  
  const tokenExpiryTimerRef = useRef(null);
  const navigate = useNavigate();
  
  // 🚪 Logout function
  const logout = useCallback(() => {
    if (tokenExpiryTimerRef.current) {
      clearTimeout(tokenExpiryTimerRef.current);
      tokenExpiryTimerRef.current = null;
    }
  
    clearAuthData();
    setUser({
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      phone_no: '',
      address: '',
      postal_code: '',
      city: '',
      ic_no: '',
      emp_id: '',
      date_of_birth: '',
      job_type: '',
      faculty: '',
      department: '',
      normalEmail: '',
      image_data: '',
      image_type: '',
      role: ''
    });
    setIsLogin(false);
    navigate('/login', { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);
  
  // Handle forced token expiry event (e.g. from Axios interceptor)
  useEffect(() => {
    const handleTokenExpiry = () => {
      logout();
    };
    window.addEventListener('tokenExpired', handleTokenExpiry);
    return () => window.removeEventListener('tokenExpired', handleTokenExpiry);
  }, []);

  // Schedule token refresh recursively
  const scheduleTokenRefresh = useCallback(
    async (token) => {
      if (!token) return;

      const timeUntilExpiry = getTimeUntilExpiry(token);
      if (!timeUntilExpiry || timeUntilExpiry <= 0) return;

      const refreshTime = Math.max(timeUntilExpiry - 60000, 30000); // refresh 1 min before expiry

      // Clear existing timer
      if (tokenExpiryTimerRef.current) {
        clearTimeout(tokenExpiryTimerRef.current);
      }

      tokenExpiryTimerRef.current = setTimeout(async () => {
        const newToken = await refreshToken();

        if (newToken) {
          storeToken(newToken);
          // Recursively schedule next refresh
          scheduleTokenRefresh(newToken);
        } else {
          // If refresh fails, log out
          logout();
        }
      }, refreshTime);
    },
    [logout]
  );

  // Set up refresh cycle when logged in
  useEffect(() => {
    if (isLogin) {
      const token = getStoredToken();
      if (token) {
        scheduleTokenRefresh(token);
      }
    } else if (tokenExpiryTimerRef.current) {
      clearTimeout(tokenExpiryTimerRef.current);
      tokenExpiryTimerRef.current = null;
    }

    return () => {
      if (tokenExpiryTimerRef.current) {
        clearTimeout(tokenExpiryTimerRef.current);
        tokenExpiryTimerRef.current = null;
      }
    };
  }, [isLogin, scheduleTokenRefresh]);

  // 🚪 Login function
  const login = useCallback(
    (token, userData) => {
      storeToken(token);
      setUser((prev) => ({ ...prev, ...userData }));
      setIsLogin(true);
      scheduleTokenRefresh(token); // start refresh cycle immediately
    },
    [scheduleTokenRefresh]
  );


  const value = useMemo(
    () => ({
      isLogin,
      setIsLogin,
      user,
      setUser,
      login,
      logout,
    }),
    [isLogin, user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
