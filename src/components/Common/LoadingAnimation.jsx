const LoadingAnimation = () => (
    <div className="loading-container">
      <div className="spinner"></div>
      <style>{`
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          z-index: 20;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          opacity: 0.8;
          background-color: #000;
        }
        .spinner {
          border: 8px solid #fff;
          border-top: 8px solid rgb(39, 39, 39);
          border-radius: 50%;
          width: 80px;
          height: 80px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  export default LoadingAnimation;