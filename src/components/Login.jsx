import { useNavigate } from 'react-router-dom'
import '../css/login.css'
import axios from 'axios';
import { useForm } from 'react-hook-form';


const Login = ({setIsLogin}) => {
    const Navigate = useNavigate();


    const {register, handleSubmit, formState:{errors}} = useForm();


    const handleSignup = ()=>{
        Navigate("/signup")
    }

    const onSubmit = async (data) => {

        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", data,);
            const token = response.data.token
            if (token) {
                localStorage.setItem("token", token); 
                localStorage.setItem("isLogin", true);  
                console.log("Stored token:", token);
                setIsLogin(localStorage.getItem("isLogin"))
                Navigate("/");
            }
            else{
                throw new Error("Token not received");
            }
        } catch (error) {
            console.log(error.message);
            alert("Invalid Credentials")        
        }
    }

    const handleVissiblePassword = (img,val) => {
        const element = document.getElementById(val)
        const images = document.getElementById(img)
        if (element.type === "password") {
          element.type = "text";
          images.src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/see-icon.png"
        }else{
          element.type = "password";
          images.src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/closed-eye-icon.png"
        }
      }
    
  return (
    <div className='login-main'>
        <div className="login-container">
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="logo">
                    <img src="https://w1.pngwing.com/pngs/659/960/png-transparent-gold-badge-university-of-ceylon-university-of-sri-lanka-higher-education-college-faculty-university-of-peradeniya-logo-thumbnail.png" alt="Uni-logo" />
                </div>

                <h1>UOP</h1>

                <div className="email-box">
                    <label htmlFor="login-email" >Email Address</label>
                        {/* <input type="email" name="email" id="login-email" placeholder='abc123@gmail.com' onChange={handleChange} value={loginUser.email} required/> */}
                        <input type="email" name="email" id="login-email" placeholder='abc123@gmail.com' {...register("email", {required:{
                            value: true,
                            message: "Email is required"
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ,
                            message: "Email is not valid"
                        }
                        })} />
                        <span className="error">{errors.email && errors.email.message}</span>
                </div>

                <div className="passwd-box">
                    <label htmlFor="password">Password</label>
                        <div>
                            <img id="loginPasswordimg" src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/closed-eye-icon.png" alt="" title="show password" onClick={()=>handleVissiblePassword("loginPasswordimg","login-password")}/>
                            {/* <input type="password" name="password" id="login-password" placeholder='password' onChange={handleChange} value={loginUser.password} required/> */}
                            <input type="password" name="password" id="login-password" placeholder='password' {...register("password",{required:{
                                value: true,
                                message: "Password is required"
                            }})}/>
                        </div>
                        {errors.password && <span className="error">{errors.password.message}</span>}
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