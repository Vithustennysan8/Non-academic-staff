import Home from "./components/Home"
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

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/forms" element={<Forms/>} />
        <Route path="/staffs" element={<Staffs/>} />
        <Route path="/fullLeaveForm" element={<FullLeaveForm/>} />
        <Route path="/halfLeaveForm" element={<HalfLeaveForm/>} />
        <Route path="/transferForm" element={<TransferForm/>} />
        <Route path="/subtitute" element={<Subtitute/>} />
        <Route path="/forum" element={<Forum/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
