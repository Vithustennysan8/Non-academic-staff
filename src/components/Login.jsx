import { useNavigate } from 'react-router-dom'
import '../css/login.css'
import { useState } from 'react';
import axios from 'axios';


const Login = () => {
    const Navigate = useNavigate();
    const [loginUser, setLoginUser] = useState({
        email:"",
        password:""
    });

    const handleChange = (e) => {
        const {name,value} = e.target;
        setLoginUser(prev => ({...prev, [name] : value}));
    }

    const handleSignup = ()=>{
        Navigate("/signup")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = loginUser;

        try{
            const response = await axios.post("http://localhost:8080/auth/login", {email,password} );
            const token = response.data.token
            if (token) {
                localStorage.setItem("token", token); // Store token as a string
                console.log("Stored token:", token);
                alert("Login successfully");
                Navigate("/");
            } else {
                throw new Error("Token not received");
            }
        }catch{
            alert("Invalid Credentials")
            setLoginUser({ email:"", password:"" });
        }
    }
    
  return (
    <div className='login-main'>
        <div className="login-container">
            <form onSubmit={handleSubmit}>

                <div className="logo">
                    <img src="https://w1.pngwing.com/pngs/659/960/png-transparent-gold-badge-university-of-ceylon-university-of-sri-lanka-higher-education-college-faculty-university-of-peradeniya-logo-thumbnail.png" alt="Uni-logo" />
                </div>

                <h1>UOP</h1>

                <div className="email-box">
                    <label htmlFor="login-email">Email Address
                        <input type="email" name="email" id="login-email" placeholder='abc123@gmail.com' onChange={handleChange} value={loginUser.email} required/>
                    </label>
                </div>

                <div className="passwd-box">
                    <label htmlFor="password">Password
                        <input type="password" name="password" id="login-password" placeholder='password' onChange={handleChange} value={loginUser.password} required/>
                    </label>
                </div>

                <div className="login-btn">
                    <input type="submit" value="Log in"/>
                </div>

                <div className="signup-opt">
                    <p>Do you need new account?</p>
                    <input type="button" onClick={handleSignup}  value="Sign up"/>
                </div>

                <div className="others">
                    <a href="">Forget Password?</a>
                </div>

            </form>

        </div>
    </div>
  )
}

export default Login