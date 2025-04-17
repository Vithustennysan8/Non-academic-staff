import { useState, useEffect, useRef } from 'react';

const NetworkStatusMonitor = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [initialCheckDone, setInitialCheckDone] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationColor, setNotificationColor] = useState('');
  
  const prevOnlineRef = useRef(navigator.onLine);
  const timerRef = useRef(null);

  useEffect(() => {
    // Mark that initial check is done after first render
    setInitialCheckDone(true);
    
    const handleOnlineChange = () => {
      setIsOnline(navigator.onLine);
    };
    
    window.addEventListener('online', handleOnlineChange);
    window.addEventListener('offline', handleOnlineChange);
    
    return () => {
      window.removeEventListener('online', handleOnlineChange);
      window.removeEventListener('offline', handleOnlineChange);
      
      // Clear any existing timeout when unmounting
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    // Skip initial render to avoid notification on page load
    if (!initialCheckDone) return;
    
    const prevOnline = prevOnlineRef.current;
    
    // Only show notification if there's a change in status
    if (prevOnline !== isOnline) {
      // Clear any existing timeout
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      
      if (isOnline) {
        setNotificationMessage('Connection restored');
        setNotificationColor('#4CAF50'); // Green
      } else {
        setNotificationMessage('No internet connection');
        setNotificationColor('#F44336'); // Red
      }
      
      setShowNotification(true);
      
      // Set new timeout to hide notification after 3 seconds
      timerRef.current = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
    
    prevOnlineRef.current = isOnline;
  }, [isOnline, initialCheckDone]);
  
  // If notification shouldn't be shown, don't render anything
  if (!showNotification) {
    return null;
  }
  
  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        padding: '10px 20px',
        backgroundColor: notificationColor,
        color: 'white',
        borderRadius: '4px',
        zIndex: 9999,
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      }}
    >
      {notificationMessage}
    </div>
  );
};

export default NetworkStatusMonitor;