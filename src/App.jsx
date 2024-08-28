import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Forms from "./components/Forms";
import Staffs from "./components/Staffs";
import FullLeaveForm from "./components/forms/NormalLeaveForm";
import HalfLeaveForm from "./components/forms/AccidentLeaveForm";
import TransferForm from "./components/forms/TransferForm";
import Subtitute from "./components/forms/Subtitute";
import Forum from "./components/Forum";
import Contact from "./components/Contact";
import { useEffect, useState } from "react";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { LoginContext } from "./Contexts/LoginContext";
import { UserContext } from "./Contexts/UserContext";
import RequestedForms from "./components/forms/RequestedForms";
import LeaveForms from "./components/forms/LeaveForms";

function App() {
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem("isLogin"));
  const [user, setUser] = useState({});
  
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    setInterval(() => {
      console.log("token: "+token);
      if (localStorage.getItem("token")) {
        try {
          if (typeof localStorage.getItem("token") !== "string") {
              throw new Error("Token is not a string");
            }
            
          let Token = localStorage.getItem("token");
          const tokenParts = Token.split(".");
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
            sessionStorage.setItem("isLogin",false);
            setIsLogin(false);
          } else {
            console.log("Token is valid");
          }
        } catch (error) {
          console.error("Failed to decode token:", error);
          localStorage.removeItem("token");
        }
      }
      else{
        console.log("Err token: "+token);
        console.log("No token found");
      }
    }, 60000);

  }, [isLogin]);

  return (
    <>  
    <LoginContext.Provider value={{isLogin, setIsLogin}}>
    <UserContext.Provider value={{user, setUser}}>

    <Router>
      <Header/>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/staffs" element={<Staffs />} />
          <Route path="/leaveForms" element={<LeaveForms />} />
          <Route path="/fullLeaveForm" element={<FullLeaveForm />} />
          <Route path="/halfLeaveForm" element={<HalfLeaveForm />} />
          <Route path="/transferForm" element={<TransferForm />} />
          <Route path="/subtitute" element={<Subtitute />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resetPassword" element={<ResetPassword/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/requestedForms" element={<RequestedForms />} />
        </Routes>
      <Footer/>
    </Router>

    </UserContext.Provider>
    </LoginContext.Provider>
    </>
  );
}

export default App;
