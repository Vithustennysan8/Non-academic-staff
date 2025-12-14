import "../../css/Profile_page/resetPassword.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { Axios } from "../AxiosReqestBuilder";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import closedEye from "../../assets/images/login/closed-eye-icon.png";
import openEye from "../../assets/images/login/see-icon.png";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { isLogin, logout, user } = useAuth();

  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [reset, setReset] = useState({
    password_for_delete: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!isLogin) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate("/login");
    }
    setTimeout(() => {
    }, 600);
  });

  const onSubmit = async (data) => {
    if (data.new_password != data.confirm_new_password) {
      toast.error("Password and Confirm Password are not same!");
      return;
    }

    try {
      const response = await Axios.put("/auth/user/reset", data);
      console.log(response.data);
      toast.success("Password changed successfully!");
      if (response.status === 200) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate("/login");
      }
    } catch (err) {
      console.log("Error changing password", err.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (reset.password_for_delete === "") {
      toast.error("Please enter your password!");
      return;
    }

    try {
      const response = await Axios.delete("/user/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: reset,
      });
      console.log(response.data);
      localStorage.removeItem("token");
      sessionStorage.setItem("isLogin", true);
      logout();
      toast.success("Account deleted successfully!");
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate("/login");
    }
    catch (error) {
      console.log("Error deleting account", error.message);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReset({ ...reset, [name]: value });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {(
        <div className="resetPassword">
          <h1>SECURITY</h1>
          <div className="resetPassword_container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Change Password</h2>
              <p>
                To change the old Password, you should enter the old password
                <span> *</span>
              </p>
              <div>
                <img
                  id="resetOldPasswordImg"
                  src={closedEye}
                  alt="hiden password icon"
                  title="show password"
                  onClick={() =>
                    handleVissiblePassword(
                      "resetOldPasswordImg",
                      "resetOldPassword"
                    )
                  }
                />
                <input
                  type="password"
                  placeholder="Old Password"
                  id="resetOldPassword"
                  name="old_password"
                  {...register("old_password", {
                    required: {
                      value: true,
                      message: "Please enter your old password",
                    },
                  })}
                />
                {errors.old_password && (
                  <span className="error">{errors.old_password.message}</span>
                )}
              </div>
              <hr />
              <p>
                Your new password must be at least six characters and not same
                as the old password!<span> *</span>
              </p>
              <div>
                <img
                  id="resetNewPasswordImg"
                  src={closedEye}
                  alt="hiden password icon"
                  title="show password"
                  onClick={() =>
                    handleVissiblePassword(
                      "resetNewPasswordImg",
                      "resetNewPassword"
                    )
                  }
                />
                <input
                  type="password"
                  placeholder="New Password"
                  id="resetNewPassword"
                  name="new_password"
                  {...register("new_password", {
                    required: {
                      value: true,
                      message: "Please enter your new password",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$]).{8,}$/,
                      message: "Password is not valid",
                    },
                  })}
                />
                {errors.new_password && (
                  <span className="error">{errors.new_password.message}</span>
                )}
              </div>
              <div>
                <img
                  id="resetConfirmNewPasswordImg"
                  src={closedEye}
                  alt="Hiden password icon"
                  title="show password"
                  onClick={() =>
                    handleVissiblePassword(
                      "resetConfirmNewPasswordImg",
                      "resetNewConfirmPassword"
                    )
                  }
                />
                <input
                  id="resetNewConfirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirm_new_password"
                  {...register("confirm_new_password", {
                    required: {
                      value: true,
                      message: "Please enter your confirm password",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$]).{8,}$/,
                      message: "Password is not valid",
                    },
                  })}
                />
                {errors.confirm_new_password && (
                  <span className="error">
                    {errors.confirm_new_password.message}
                  </span>
                )}
              </div>
              <button
                className="resetPassword_button bttn redbtn"
                type="submit"
              >
                Change Password
              </button>
            </form>
          </div>

          {/* { user.role === "ADMIN" && <div className="deleteAccountContainer">
            <hr />
            <form>
              <h2>Delete Account</h2>
              <p className="deleteInfo">
                To delete your account permanately, please provide the correct
                password of your account
              </p>
              <div>
                <img
                  id="PasswordForDeleteImg"
                  src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/closed-eye-icon.png"
                  alt=""
                  title="show password"
                  onClick={() => handleVissiblePassword("PasswordForDeleteImg","PasswordForDelete")
                  }
                />
                <input
                  type="password"
                  placeholder="Current Password"
                  id="PasswordForDelete"
                  name="password_for_delete"
                  value={reset.password_for_delete}
                  onChange={handleChange}
                />
              </div>
              <p className="deleteConfirmInfo">
                Are you sure you want to delete your account?
                <span className="importantastrick"> *</span>
              </p>
              <button
                className="deleteAccount_button bttn redbtn"
                onClick={handleDelete}
              >
                Delete Account
              </button>
            </form>
          </div>
          } */}
        </div>
      )}
    </motion.div>
  );
};

export default ResetPassword;
