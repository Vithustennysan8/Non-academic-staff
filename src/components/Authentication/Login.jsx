import { Link, useNavigate } from "react-router-dom";
import "../../css/Authentication/login.css";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { LoginContext } from "../../Contexts/LoginContext";
import { Axios } from "../AxiosReqestBuilder";
import Swal from "sweetalert2";

const Login = () => {
  const Navigate = useNavigate();
  const { setIsLogin } = useContext(LoginContext);

  const {register, handleSubmit, formState: { errors }} = useForm();

  const handleSignup = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    Navigate("/signup");
  };

  const onSubmit = async (data) => {
    try {
      localStorage.removeItem("token");
      const response = await Axios.post("/auth/login", data);
      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token);
        sessionStorage.setItem("isLogin", true);
        console.log("Stored token:", token);
        setIsLogin(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        Navigate("/");
      } else {
        Swal.fire({
          title: "User not verified",
          icon: "error",
        })
        throw new Error("Token not received");
      }
    } catch (error) {
      if(error.response.data.message){
        console.log(error.response.data.message);
        Swal.fire({
          title: error.response.data.message,
          icon: "error",
        })
      }
      console.log(error)
    }
  };

  const handleVissiblePassword = (img, val) => {
    const element = document.getElementById(val);
    const images = document.getElementById(img);
    if (element.type === "password") {
      element.type = "text";
      images.src =
        "https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/see-icon.png";
    } else {
      element.type = "password";
      images.src =
        "https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/closed-eye-icon.png";
    }
  };

  return (
    <div className="login-main">
      <div className="login-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="logo">
            <img
              src="https://w1.pngwing.com/pngs/659/960/png-transparent-gold-badge-university-of-ceylon-university-of-sri-lanka-higher-education-college-faculty-university-of-peradeniya-logo-thumbnail.png"
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
                src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/closed-eye-icon.png"
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
