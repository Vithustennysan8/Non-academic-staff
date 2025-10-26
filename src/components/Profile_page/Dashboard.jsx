import "../../css/Profile_page/profile.css"
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { Axios } from "../AxiosReqestBuilder";
import ResetPassword from "./ResetPassword";
import Notifications from "../forms/Notifications";
import UserDashboard from "./Dashboard/UserDashboard";
import AdminDashboard from "./Dashboard/AdminDashboard";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import defaultAvatar from "../../assets/defaultImage.webp";

const Dashboard = () => {
  const { isLogin, user, setUser, logout } = useAuth();
  const [dashboardContent, setDashboardContent] = useState("Profile");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [src, setSrc] = useState(defaultAvatar);
  const [readOnly, setReadOnly] = useState(true);
  const [leave, setLeave] = useState([]);
  const [transfer, setTranfer] = useState([]);
  const [register, setRegister] = useState([]);
  const [appliedDynamics, setAppliedDynamics] = useState([]);
  const [dynamicsRequests, setDynamicsRequests] = useState([]);
  const [appliedLeave, setAppliedLeave] = useState([]);
  const [appliedTransfer, setAppliedTransfer] = useState([]);
  const [image, setImage] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [outline] = useState("2px solid #ccc");
  const hasFetchedUser = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initial data fetch - runs only once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (hasFetchedUser.current) return;
    
    setTimeout(() => {
      const getUserDetail = async () => {
        try {
          const response = await Axios.get("/auth/user/info");
          const userData = response.data;
          setUser(userData);
          hasFetchedUser.current = true;
          if (userData.image_data) {
            setSrc(`data:${userData.image_type};base64,${userData.image_data}`);
          }
          setTimeout(() => {
            setIsLoading(false);
          }, [500])
        } catch (error) {
          logout();
        }
      };

      const fetchLeaveRequestCount = async () => {
        try {
          const response = await Axios.get("admin/leaveForms/notification");
          setLeave(response.data);
        } catch (error) {
          console.log("Error fetching leave requests", error);
        }
      };

      const fetchAppliedDynamicForms = async () => {
        try {
            const response = await Axios.get("auth/user/DynamicFormUser/getAll");
            setAppliedDynamics(response.data);
        } catch (error) {
            console.log("Error fetching applied dynamic forms", error);
        }
    }

    const fetchDynamicFormsRequests = async () => {
      try {
          const response = await Axios.get("admin/DynamicFormUser/getAll");
          setDynamicsRequests(response.data);
          console.log("cascas", response.data);
          
      } catch (error) {
          console.log("Error fetching dynamic form requests", error);
      }
  }

      const fetchRegisterRequests = async () => {
        try {
          const response = user.role === "ADMIN" ? await Axios.get("admin/verifyRegisterRequests") : 
                                      await Axios.get("admin/verifyAdminRegisterRequests");
          setRegister(response.data);
        } catch (error) {
          console.log("Error fetching register requests", error);
        }
      };

      const fetchTransferRequests = async () => {
        try{
          const response = await Axios.get("admin/transferForms/notification");
          if(response.data.length > 0){
            setTranfer(response.data);
          }
        } catch (error) {
          console.log("Error fetching transfer requests", error);
        }}

      const fetchTransferFormsApplied = async () => {
        try {
          const response = await Axios.get("auth/user/transferForms");
          setAppliedTransfer(response.data);
        } catch (error) {
          console.log("Error fetching appliedTransferForms requests", error);
        }
      };
      
      const fetchLeaveFormsApplied = async () => {
        try {
          const response = await Axios.get("auth/user/leaveForms");
          setAppliedLeave(response.data);
        } catch (error) {
          console.log("Error fetching appliedLeaveForms requests", error);
        }
      };

      if(!isLogin){
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate("/login");
        return;
      }
      if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
        fetchLeaveRequestCount();
        fetchRegisterRequests();
        fetchTransferRequests();
        fetchDynamicFormsRequests();
      }else{
        fetchLeaveFormsApplied();
        fetchTransferFormsApplied();
        fetchAppliedDynamicForms();
      }

      getUserDetail();
    }, 0);
  }, [token, isLogin, user.role, logout, navigate, setUser]);

  // logout implimentation
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  // updating the changes to the details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // update the data to the database
  const handleUpdate = async () => {
    
    const formData = new FormData();
    
    if (image) {
      if (image.size > 1 * 1024 * 1024) {
        toast.error("Image size should be less than 1MB");
        return;
      }
      formData.append("image", image);
    }
    
    Object.keys(user).forEach((key) => {
      if (key !== "image") {
        formData.append(key, user[key]);
      }
    });

    try {
      const response = await Axios.put("/auth/user/update", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
      const updatedUserData = response.data;
      setUser(updatedUserData);
      setEditProfile(false);
      document.getElementById("update").style.display = "none";
      document.getElementById("date_of_birth").type = "text";
      setReadOnly(true);
      if (updatedUserData.image_data) {
        setSrc(`data:${updatedUserData.image_type};base64,${updatedUserData.image_data}`);
      }
      toast.success("Profile updated successfully!");
    } catch(error) {
      console.log("Error updating profile", error);
    }
  };
  if (isLoading) {
    return (
      <div className="staffs">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading staff information...</p>
        </div>
      </div>
    );
  }

  return (
       <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }} 
      transition={{ duration: 0.6 }}
    >
      {(
        <>
          <div id="profile-container">
            <div className="profile-bar">
              <div className="profile-heading">
                <h3>Dashboard</h3>
              </div>
            </div>

            <div className="small-navbar">
              <p>
                <Link
                  onClick={() => {
                    if (dashboardContent === "Profile") {
                      toast.info("You can modify the details by clicking on the fields shown!");
                      document.getElementById("update").style.display = "block";
                      document.getElementById("date_of_birth").type = "date";
                      setReadOnly(false);
                      setEditProfile(true);
                    }
                    setDashboardContent("Profile");
                  }}
                >
                  <span>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/8188/8188360.png"
                      alt="icon1"
                    />
                    {dashboardContent === "Profile" && "Edit"} Profile
                  </span>
                </Link>
              </p>
              <p>
                <Link onClick={()=> {
                  setDashboardContent("securitySetting");
                  setEditProfile(false);
                }}>
                  <span>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/25/25215.png"
                      alt="icon2"
                    />
                    Security
                  </span>
                </Link>
              </p>
              <p>
                <Link onClick={()=> {
                  setDashboardContent("Notification");
                  setEditProfile(false);
                  }}>
                  <span>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/3602/3602123.png"
                      alt="icon3"
                    />
                    Notification{" "}
                    {leave.length + register.length + transfer.length + appliedLeave.length +
                     appliedTransfer.length+ dynamicsRequests.filter(request => request.approverDetails.filter(approver =>
                      approver.approver === user.job_type)[0].approverStatus == "Pending").length +
                       appliedDynamics.filter(form => form.formStatus == "Pending").length > 0 && (
                      <li className="notificationCount">
                        {leave.length +
                          register.length +
                          appliedLeave.length +
                          appliedTransfer.length +
                          transfer.length+
                          appliedDynamics.filter(form => form.formStatus == "Pending").length +
                          dynamicsRequests.filter(request => request.approverDetails.filter(approver =>
                            approver.approver == user.job_type)[0].approverStatus == "Pending").length}
                      </li>
                    )}
                  </span>
                </Link>
              </p>
              <p>
                <Link onClick={()=> {
                  setDashboardContent("Summary");
                  setEditProfile(false);
                }}>
                  <span>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/10541/10541390.png"
                      alt="icon3"
                    />
                    Summary
                  </span>
                </Link>
              </p>
            </div>

          {dashboardContent === "Profile" && 
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <div className="profile-detail-wrapper">
              <div className="profile-img">
                <img className="profile-pic" src={src} alt="" />
                <div
                  className="profile-blur-shadow"
                  style={{
                    backgroundImage: `url(data:${user.image_type};base64,${user.image_data})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "blur(5px)",
                  }}
                ></div>
              </div>

              <div className="profile-detail-container">
                {!readOnly && editProfile && (
                  <div className="profileImageChange">
                    <label htmlFor="">Change profile Picture</label>
                    <input
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                )}

                <div className="profile-namebox">
                  <label htmlFor="firstname">
                    First Name
                    <input
                      type="text"
                      name="first_name"
                      id="firstname"
                      value={user.first_name || ''}
                      onChange={handleChange}
                      required
                      readOnly={readOnly}
                      placeholder="firstname"
                      style={editProfile ? { outline } : {}}
                    />
                  </label>
                  <label htmlFor="lastname">
                    Last Name
                    <input
                      type="text"
                      name="last_name"
                      value={user.last_name || ''}
                      onChange={handleChange}
                      id="lastname"
                      required
                      readOnly={readOnly}
                      placeholder="lastname"
                      style={editProfile ? { outline } : {}}
                    />
                  </label>
                </div>

                <div className="profile-state">
                  <label htmlFor="emailAddress">
                    Email Address
                    <p>{user.email}</p>
                  </label>
                  <label htmlFor="userId">
                    UserId
                    <p>{user.id}</p>
                  </label>
                </div>

                <div className="profile-state">
                  <label htmlFor="phoneNumber">
                    Phone Number
                    <input
                      className={"outlineEffect"}
                      style={editProfile ? { outline } : {}}
                      type="number"
                      name="phone_no"
                      id="phone_no"
                      value={user.phone_no || ''}
                      onChange={handleChange}
                      required
                      readOnly={readOnly}
                      placeholder="phoneNumber"
                    />
                  </label>
                  <label htmlFor="streetAddress">
                    Address
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={user.address || ''}
                      onChange={handleChange}
                      placeholder="streetAddress"
                      readOnly={readOnly}
                      required
                      style={editProfile ? { outline } : {}}
                    />
                  </label>
                </div>

                <div className="profile-city">
                  <label htmlFor="postal_code">
                    Postal Code
                    <input
                      type="number"
                      name="postal_code"
                      id="postal_code"
                      value={user.postal_code || ''}
                      onChange={handleChange}
                      placeholder="postal_code"
                      readOnly={readOnly}
                      style={editProfile ? { outline } : {}}
                    />
                  </label>
                  <label htmlFor="city">
                    City
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={user.city || ''}
                      onChange={handleChange}
                      placeholder="city"
                      readOnly={readOnly}
                      style={editProfile ? { outline } : {}}
                    />
                  </label>
                </div>

                <div className="profile-city">
                  <label htmlFor="postal_code">
                    IdentyCard No
                    <input
                      type="text"
                      name="ic_no"
                      id="ic_no"
                      value={user.ic_no || ''}
                      onChange={handleChange}
                      placeholder="Ic_no"
                      readOnly={readOnly}
                      style={editProfile ? { outline } : {}}
                    />
                  </label>
                  <label htmlFor="city">
                    Employee Id
                    <input
                      type="text"
                      name="emp_id"
                      id="emp_id"
                      value={user.emp_id || ''}
                      onChange={handleChange}
                      placeholder="city"
                      readOnly={readOnly}
                      style={editProfile ? { outline } : {}}
                    />
                  </label>
                </div>

                <div className="profile-state">
                  <label htmlFor="date_of_birth">
                    Date of Birth
                    <input
                      type="text"
                      name="date_of_birth"
                      id="date_of_birth"
                      value={user.date_of_birth?.substring(0, 10) || ''}
                      onChange={handleChange}
                      placeholder="date_of_birth"
                      readOnly={readOnly}
                      style={editProfile ? { outline } : {}}
                    />
                  </label>
                  <label htmlFor="job_type">
                    Job type
                    <p>{user?.job_type}</p>
                    <p>{user?.jobType}</p>
                  </label>
                </div>

                <div className="profile-state">
                  <label htmlFor="faculty">
                    Faculty
                    <p>{user.faculty}</p>
                  </label>
                  <label htmlFor="department">
                    Department
                    <p>{user.department}</p>
                  </label>
                </div>

                <div className="profile-state">
                  <label htmlFor="faculty">
                    Normal Mail
                    <input 
                    type="mail"
                    value={user.normalEmail || ''}
                    placeholder="secondary mail"
                    name="normalEmail"
                    onChange={handleChange}
                    readOnly={readOnly}
                    style={editProfile ? { outline } : {}}/>
                  </label>
                  <label htmlFor="department">
                    <p></p>
                  </label>
                </div>

                <div className="submit_btn">
                  <input
                    type="button"
                    value="Update"
                    id="update"
                    className="bttn redbtn"
                    onClick={handleUpdate}
                  />
                </div>
                <div className=" logout-btn">
                  <input
                    type="button"
                    value="Logout"
                    className="bttn ashbtn"
                    onClick={handleLogout}
                  />
                </div>
              </div>
            </div>
            </motion.div>}
          </div>

          {dashboardContent === "securitySetting" && <ResetPassword/>}
          
          {dashboardContent === "Notification" && <Notifications leave={leave} transfer={transfer} 
          register={register} appliedLeave={appliedLeave} appliedTransfer={appliedTransfer} dynamicsForms={appliedDynamics} dynamicFormRequests={dynamicsRequests}
          setDynamicsRequests={setDynamicsRequests} />}

          {dashboardContent === "Summary" && ( (user.role === "USER" || user.role === "MANAGER") ? <UserDashboard id={user.id}/> : <AdminDashboard/>)}
        </>
      )}
    </motion.div>
  );
};

export default Dashboard;
