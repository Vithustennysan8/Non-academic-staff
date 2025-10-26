// Token utility functions for handling JWT tokens
export const TOKEN_KEY = 'token';
export const LOGIN_KEY = 'isLogin';

/**
 * Decode JWT token and extract payload
 * @param {string} token - JWT token
 * @returns {object|null} - Decoded payload or null if invalid
 */
export const decodeToken = (token) => {
  try {
    if (!token || typeof token !== 'string') {
      return null;
    }

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return null;
    }

    const base64Url = tokenParts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    
    return payload;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} - True if expired, false otherwise
 */
export const isTokenExpired = (token) => {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= payload.exp;
};

/**
 * Get token expiry time in milliseconds
 * @param {string} token - JWT token
 * @returns {number|null} - Expiry time in ms or null if invalid
 */
export const getTokenExpiryTime = (token) => {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) {
    return null;
  }
  
  return payload.exp * 1000; // Convert to milliseconds
};

/**
 * Get time until token expires in milliseconds
 * @param {string} token - JWT token
 * @returns {number|null} - Time until expiry in ms or null if invalid/expired
 */
export const getTimeUntilExpiry = (token) => {
  const expiryTime = getTokenExpiryTime(token);
  if (!expiryTime) {
    return null;
  }
  
  const timeUntilExpiry = expiryTime - Date.now();
  return timeUntilExpiry > 0 ? timeUntilExpiry : 0;
};

/**
 * Clear authentication data from storage
 */
export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(LOGIN_KEY);
};

/**
 * Get token from localStorage
 * @returns {string|null} - Token or null if not found
 */
export const getStoredToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Store token in localStorage
 * @param {string} token - JWT token
 */
export const storeToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(LOGIN_KEY, 'true');
};

/**
 * Check if user is authenticated (has valid token)
 * @returns {boolean} - True if authenticated, false otherwise
 */
export const isAuthenticated = () => {
  const token = getStoredToken();
  return token && !isTokenExpired(token);
};
