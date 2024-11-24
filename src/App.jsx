import Home from "./components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import Dashboard from "./components/Profile_page/Dashboard";
import Forms from "./components/Forms_page/Forms";
import Staffs from "./components/Staff_page/Staffs";
import FullLeaveForm from "./components/forms/NormalLeaveForm";
import HalfLeaveForm from "./components/forms/AccidentLeaveForm";
import TransferForm from "./components/forms/TransferForm";
import Forum from "./components/Forum_page/Forum";
import Contact from "./components/Contact_page/Contact";
import { useEffect, useState } from "react";
import ResetPassword from "./components/Profile_page/ResetPassword";
import Footer from "./components/Common/Footer";
import Header from "./components/Common/Header";
import { LoginContext } from "./Contexts/LoginContext";
import { UserContext } from "./Contexts/UserContext";
import RequestedForms from "./components/notifications/LeaveRequests";
import LeaveForms from "./components/forms/LeaveForms";
import Notifications from "./components/forms/Notifications";
import ForgotPassword from "./components/Authentication/ForgotPassword";

function App() {
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem("isLogin"));
  const [user, setUser] = useState({});

  useEffect(() => {
    // document.addEventListener("contextmenu", (event)=>{event.preventDefault()})

    setInterval(() => {
      // console.log("token: "+token);
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
            sessionStorage.setItem("isLogin", false);
            setIsLogin(false);
          } else {
            console.log("Token is valid");
          }
        } catch (error) {
          console.error("Failed to decode token:", error);
          localStorage.removeItem("token");
        }
      } else {
        console.log("No token found");
        // window.location.href = "/login";
      }
    }, 10000);
  }, [isLogin]);

  return (
    <>
      <LoginContext.Provider value={{ isLogin, setIsLogin }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Router>
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="/staffs" element={<Staffs />} />
              <Route path="/leaveForms" element={<LeaveForms />} />
              <Route path="/fullLeaveForm" element={<FullLeaveForm />} />
              <Route path="/halfLeaveForm" element={<HalfLeaveForm />} />
              <Route path="/transferForm" element={<TransferForm />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/requestedForms" element={<RequestedForms />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
            </Routes>
            <Footer />
          </Router>
        </UserContext.Provider>
      </LoginContext.Provider>
    </>
  );
}

export default App;
