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
import ApprovalFlowManager from "./components/Admin/ApprovalFlowManager";
import CreateForm from "./components/Admin/CreateForm";
import DynamicForms from "./components/Admin/DynamicForms";
import ManageDepartments from "./components/Admin/ManageDepartments";
import ManageFaculties from "./components/Admin/ManageFaculty";
import ManagePositions from "./components/Admin/ManageJobPosition";
import { NetworkStatusContext } from "./Contexts/NetworkStatusContext";
import SubIncharge from "./components/Admin/SubIncharge";
import News from "./components/NewsPage/News";
import NotFound from "./components/Common/NotFound";


function App() {
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem("isLogin"));
  const [user, setUser] = useState({});

  // check the network connectivity
  const [isOnline, setIsOnline] = useState(navigator.onLine);  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  

  useEffect(() => {
    // document.addEventListener("contextmenu", (event)=>{event.preventDefault()})

    setInterval(() => {
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
          }
        } catch (error) {
          console.error("Failed to decode token:", error);
          localStorage.removeItem("token");
        }
      } else {
        console.log("No token found");
      }
    }, 10000);

    return () => clearInterval();
  }, [isLogin]);

  return (
    <>
      <NetworkStatusContext.Provider value={{isOnline, setIsOnline}}>
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
              <Route path="/approvalFlowManager" element={<ApprovalFlowManager/>}/>
              <Route path="/createForm" element={<CreateForm/>}/>
              <Route path="/dynamicForm" element={<DynamicForms/>} />
              <Route path="/manageDepartment" element={<ManageDepartments/>}/>
              <Route path="/manageFaculty" element={<ManageFaculties/>}/>
              <Route path="/managePosition" element={<ManagePositions/>}/>
              <Route path="/subIncharge" element={<SubIncharge />} />
              <Route path="/news" element={<News />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
            <Footer />
          </Router>
        </UserContext.Provider>
      </LoginContext.Provider>
      </NetworkStatusContext.Provider>
    </>
  );
}

export default App;
