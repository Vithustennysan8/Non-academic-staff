import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Forms from "./components/Forms";
import Staffs from "./components/Staffs";
import FullLeaveForm from "./components/FullLeaveForm";
import HalfLeaveForm from "./components/HalfLeaveForm";
import TransferForm from "./components/TransferForm";
import Subtitute from "./components/Subtitute";
import Forum from "./components/Forum";
import Contact from "./components/Contact";
import { useEffect, useState } from "react";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));


  useEffect(() => {
    const token = localStorage.getItem("token");
    
    setInterval(() => {
    if (token) {
      try {
        if (typeof token !== "string") {
          throw new Error("Token is not a string");
        }

        const tokenParts = token.split(".");
        if (tokenParts.length !== 3) {
          throw new Error("Invalid token format");
        }

        const base64Url = tokenParts[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(atob(base64));
        
        const currentTime = Math.floor(Date.now() / 1000);
        const expiryTime = payload.exp;
        
        if (currentTime > expiryTime) {
          console.log("Token is not valid");
          localStorage.removeItem("token");
          localStorage.setItem("isLogin",false);
          setIsLogin(false)
        } else {
          console.log("Token is valid");
          console.log("isLogin "+ isLogin);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem("token");
      }
    }
    else{
      console.log("No token found");
    }
    }, 60000);
  }, [isLogin]);

  return (
    <>
    <Router>
      <Header  isLogin={isLogin} setIsLogin={setIsLogin}/>
        <Routes>
          <Route path="/login" element={<Login setIsLogin={setIsLogin}/>} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile setIsLogin={setIsLogin}/>} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/staffs" element={<Staffs />} />
          <Route path="/fullLeaveForm" element={<FullLeaveForm />} />
          <Route path="/halfLeaveForm" element={<HalfLeaveForm />} />
          <Route path="/transferForm" element={<TransferForm />} />
          <Route path="/subtitute" element={<Subtitute />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resetPassword" element={<ResetPassword setIsLogin={setIsLogin}/>} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      <Footer/>
    </Router>
    </>
  );
}

export default App;
