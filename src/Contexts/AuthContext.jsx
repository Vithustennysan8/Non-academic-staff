import { createContext, useContext, useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isAuthenticated, getStoredToken, storeToken, clearAuthData, getTimeUntilExpiry } from '../utils/tokenUtils';

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

  // Handle token expiry event from axios interceptor
  useEffect(() => {
    const handleTokenExpiry = () => {
      setIsLogin(false);
      setUser({});
      navigate('/login', { replace: true });
    };

    window.addEventListener('tokenExpired', handleTokenExpiry);
    return () => window.removeEventListener('tokenExpired', handleTokenExpiry);
  }, [navigate]);

  // Set up token expiry monitoring
  useEffect(() => {
    // Clear any existing timer
    if (tokenExpiryTimerRef.current) {
      clearTimeout(tokenExpiryTimerRef.current);
      tokenExpiryTimerRef.current = null;
    }

    if (isLogin) {
      const token = getStoredToken();
      if (token) {
        const timeUntilExpiry = getTimeUntilExpiry(token);
        
        if (timeUntilExpiry && timeUntilExpiry > 0) {
          // Set timer to clear auth data 1 minute before expiry
          const warningTime = Math.max(timeUntilExpiry - 60000, 30000); // At least 30 seconds
          
          const timer = setTimeout(() => {
            clearAuthData();
            setIsLogin(false);
            setUser({});
            navigate('/login', { replace: true });
          }, warningTime);
          
          tokenExpiryTimerRef.current = timer;
        }
      }
    }

    return () => {
      if (tokenExpiryTimerRef.current) {
        clearTimeout(tokenExpiryTimerRef.current);
        tokenExpiryTimerRef.current = null;
      }
    };
  }, [isLogin, navigate]);

  const login = useCallback((token, userData) => {
    storeToken(token);
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
      role: '',
      ...userData
    });
    setIsLogin(true);
  }, []);

  const logout = useCallback(() => {
    // Clear any existing timer
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
    window.scrollTo({top: 0, behavior: "smooth"});
  }, [navigate]);

  const value = useMemo(() => ({
    isLogin,
    setIsLogin,
    user,
    setUser,
    login,
    logout,
  }), [isLogin, setIsLogin, user, setUser, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
