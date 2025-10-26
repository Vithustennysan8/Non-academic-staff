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
import { AuthProvider } from "./Contexts/AuthContext";
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
import ProtectedRoute from "./components/Common/ProtectedRoute";
import { ToastContainer } from "react-toastify";


function App() {
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

  return (
    <>
      <NetworkStatusContext.Provider value={{isOnline, setIsOnline}}>
          <Router>
        <AuthProvider>
            <Header />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/news" element={<News />} />
              
              {/* Protected Routes */}
              <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/forms" element={<ProtectedRoute><Forms /></ProtectedRoute>} />
              <Route path="/staffs" element={<ProtectedRoute><Staffs /></ProtectedRoute>} />
              <Route path="/leaveForms" element={<ProtectedRoute><LeaveForms /></ProtectedRoute>} />
              <Route path="/fullLeaveForm" element={<ProtectedRoute><FullLeaveForm /></ProtectedRoute>} />
              <Route path="/halfLeaveForm" element={<ProtectedRoute><HalfLeaveForm /></ProtectedRoute>} />
              <Route path="/transferForm" element={<ProtectedRoute><TransferForm /></ProtectedRoute>} />
              <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
              <Route path="/resetPassword" element={<ProtectedRoute><ResetPassword /></ProtectedRoute>} />
              <Route path="/requestedForms" element={<ProtectedRoute><RequestedForms /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/approvalFlowManager" element={<ProtectedRoute><ApprovalFlowManager /></ProtectedRoute>} />
              <Route path="/createForm" element={<ProtectedRoute><CreateForm /></ProtectedRoute>} />
              <Route path="/dynamicForm" element={<ProtectedRoute><DynamicForms /></ProtectedRoute>} />
              <Route path="/manageDepartment" element={<ProtectedRoute><ManageDepartments /></ProtectedRoute>} />
              <Route path="/manageFaculty" element={<ProtectedRoute><ManageFaculties /></ProtectedRoute>} />
              <Route path="/managePosition" element={<ProtectedRoute><ManagePositions /></ProtectedRoute>} />
              <Route path="/subIncharge" element={<ProtectedRoute><SubIncharge /></ProtectedRoute>} />
              
              <Route path="/*" element={<NotFound />} />
            </Routes>
            <Footer />
        </AuthProvider>
          </Router>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
      </NetworkStatusContext.Provider>
    </>
  );
}

export default App;
