import { Link, useNavigate } from "react-router-dom";
import "../../css/Authentication/login.css";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { Axios } from "../AxiosReqestBuilder";
import closedEye from "../../assets/images/login/closed-eye-icon.png";
import openEye from "../../assets/images/login/see-icon.png";
import uopLogo from "../../assets/University_of_Peradeniya_crest-150x150.png"
import { toast } from "react-toastify";

const Login = () => {
  const Navigate = useNavigate();
  const { isLogin, login } = useAuth();

  const {register, handleSubmit, formState: { errors }} = useForm();

  const handleSignup = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    Navigate("/signup");
  };

  useEffect(()=>{
    if(isLogin){
      Navigate("/")
    }
  },[])

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post("/auth/login", data);
      const token = response.data.token;
      const userData = response.data.user;
      if (token) {
        toast.success("Login successful");
        login(token, userData);
        console.log("Stored token:", token);
        window.scrollTo({ top: 0, behavior: "smooth" });
        Navigate("/");
      } else {
        toast.error("Token not received");
        console.log("Token not received");
      }
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  const handleVissiblePassword = (img, val) => {
    const element = document.getElementById(val);
    const images = document.getElementById(img);
    if (element.type === "password") {
      element.type = "text";
      images.src = openEye;
    } else {
      element.type = "password";
      images.src = closedEye;
    }
  };

  return (
    <div className="login-main">
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="logo">
            <img
              src= {uopLogo}
              alt="Uni-logo"
            />
          </div>

          <h1>UOP</h1>

          <div className="email-box">
            {/* <label htmlFor="login-email">Email Address</label> */}
            <input
              type="email"
              name="email"
              id="login-email"
              placeholder="Enter email-address"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email is not valid",
                },
              })}
            />
            <span className="error">
              {errors.email && errors.email.message}
            </span>
          </div>

          <div className="passwd-box">
            {/* <label htmlFor="password">Password</label> */}
            <div>
              <img
                id="loginPasswordimg"
                src= {closedEye}
                alt=""
                title="show password"
                onClick={() =>
                  handleVissiblePassword("loginPasswordimg", "login-password")
                }
              />
              <input
                type="password"
                name="password"
                id="login-password"
                placeholder="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
              />
            </div>
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>

          <div className="login-btn">
            <input type="submit" className="bttn redbtn" value="Log in" />
          </div>

          <div className="signup-opt">
            <p>Do you need new account?</p>
            <input
              type="button"
              className="bttn ashbtn"
              onClick={handleSignup}
              value="Sign up"
            />
          </div>

          <div className="others">
            <Link to="/forgotPassword">Forget Password?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
