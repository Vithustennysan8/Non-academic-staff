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
import { useEffect } from "react";

function App() {

  useEffect(() => {
    setInterval(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("Token is not found");
        return;
      }

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
        } else {
          console.log("Token is valid");
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem("token");
      }
    }, 60000);
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/staffs" element={<Staffs />} />
          <Route path="/fullLeaveForm" element={<FullLeaveForm />} />
          <Route path="/halfLeaveForm" element={<HalfLeaveForm />} />
          <Route path="/transferForm" element={<TransferForm />} />
          <Route path="/subtitute" element={<Subtitute />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
