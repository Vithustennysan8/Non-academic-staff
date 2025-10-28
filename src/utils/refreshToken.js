// utils/tokenUtils.js
import { Axios } from '../components/AxiosReqestBuilder';
import { storeToken, getStoredToken } from './tokenUtils';

export const refreshToken = async () => {
    const token = getStoredToken();

  try {
    const response = await Axios.post('/auth/refresh', {token});
    const newToken = response.data.token;
    console.log(newToken);
    
    if (newToken) {
      storeToken(newToken);
      return newToken;
    }
    return null;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
};
