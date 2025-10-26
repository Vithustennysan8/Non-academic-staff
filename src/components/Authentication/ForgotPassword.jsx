import { useForm } from "react-hook-form";
import "../../css/Authentication/forgotPassword.css"
import { useState } from "react";
import { Axios } from "../AxiosReqestBuilder";
import {  useNavigate } from "react-router-dom";
import { handleError } from "../../utils/errorHandler";
import { toast } from "react-toastify";
import LoadingAnimation from "../Common/LoadingAnimation";

const EmailDiv = ({setPage, setUserMail}) => {
  const {handleSubmit, register, formState: {errors}} = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data)=>{
    try {
      setIsLoading(true);
      const response = await Axios.post('/auth/user/forgotPassword/sendOTP', data);
      console.log(response.data);
      if(response.data === "success"){
        setIsLoading(false);
        setUserMail(data.email);
        setPage("OTPPage");
      }else{
        setUserMail("");
      }
    } catch (error) {
      if(error.response.data.message){
        console.log("Error sending OTP", error);
      }
      console.log(error);
    }
  }

  if(isLoading){
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return(
    <>
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Forgot your password? Don't worry we are just here to sove your problem! Just enter your e-mail address to proceed.</p>
          <input type="email" name="email" placeholder="Your e-mail address" {...register("email", {required:{
            value: true,
            message: "Email is required"
          }})}/>
          {errors.email && <span className="error">{errors.email.message}</span>}
          <button className="bttn redbtn" >Submit</button>
        </form>
      </div>
    </>
  );
}

const OTPDiv = ({setPage}) => {

  const {register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit =async (data)=>{
    try {
      const response = await Axios.post('/auth/user/forgotPassword/confirmation', data);
      console.log(response.data);
      setPage("newPasswordPage");
    } catch (error) {
      console.log(error);
    }
  }
  return(
    <>
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Please check, We have sent a 6 digit OTP to your e-mail address. Put that below field.</p>
          <input type="number" name="otp" placeholder="######" {...register("otp", {required:{
            value: true,
            message: "OTP is required"
          }})}/>
          {errors.otp && <span className="error">{errors.otp.message}</span>}
          <button className="bttn redbtn">Submit</button>
        </form>
      </div>
    </>
  );
}

const NewPasswordDiv = ({userMail}) => {
  const {formState: {errors}, register, handleSubmit} = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data)=>{
    console.log(userMail);
    
    try {
      const response = await Axios.post("auth/user/forgotPassword/reset", {"newPassword":data.newPassword, "email":userMail});
      console.log(response.data);
      if(response.data === "Reset success"){
        toast.success("Password reset successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.log("Error resetting password",   error);
    }
  }
  return(
    <>
      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p>You have successfully confirm your account. Now you can enter new password to your account, we you will remember this password!</p>
            <input type="password" name="newPassword" placeholder="NewPassword" {...register("newPassword", {required:{
              value: true,
              message: "Password is required"
            }})}/>
            {errors.newPassword && <span className="error">{errors.newPassword.message}</span>}
          </div>
          <div>
            <input type="password" name="confirmPassword" placeholder="Confirm NewPassword" {...register("confirmPassword",{required:{
              value:true,
              message: "Confirm Password is required"
            }})}/>
            {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
          </div>
          <button className="bttn redbtn">Submit</button>
        </form>
      </div>
    </>
  );
}

const ForgotPassword = () => {
  const [page, setPage] = useState("emailPage");
  const [userMail, setUserMail] = useState('');
  const pages = {
    emailPage: { component: <EmailDiv setPage={setPage} setUserMail={setUserMail}/>, next: "OTPPage" },
    OTPPage: { component: <OTPDiv setPage={setPage} />, next: "newPasswordPage", prev: "emailPage" },
    newPasswordPage: { component: <NewPasswordDiv userMail={userMail}/>, prev: "OTPPage" }
  };


  // const handleNextPage = () => {
  //   if (pages[page].next) {
  //     setPage(pages[page].next);
  //   }
  // };

  const handlePreviousPage = () => {
    if (pages[page].prev) {
      setPage(pages[page].prev);
    }
  };

  return (
    <div className="forgotPasswordPage">
      <div className="forgotPasswordPageContainer">
        <h2>Forgot Password</h2>
        {pages[page].component}
        <div className="pageChange">
          {pages[page].prev && <p onClick={handlePreviousPage}>Previous</p>}
          {/* {pages[page].next && page !== "emailPage" && <p onClick={handleNextPage}>Next</p>} */}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword