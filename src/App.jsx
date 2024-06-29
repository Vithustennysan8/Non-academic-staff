import Home from "./components/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Forms from "./components/Forms";
import Staffs from "./components/Staffs";

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
      </Routes>
    </Router>
    </>
  )
}

export default App
