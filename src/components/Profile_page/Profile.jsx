import "../../css/Profile_page/profile.css"
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingAnimation from "../Common/LoadingAnimation";
import { LoginContext } from "../../Contexts/LoginContext";
import { UserContext } from "../../Contexts/UserContext";
import { Axios } from "../AxiosReqestBuilder";

const Profile = () => {
  const { isLogin, setIsLogin } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [isloading, setIsLoading] = useState(true);
  const [src, setSrc] = useState(
    "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
  );
  const [readOnly, setReadOnly] = useState(true);
  const [leave, setLeave] = useState(0);
  const [transfer, setTranfer] = useState(0);
  const [register, setRegister] = useState(0);
  const [appliedLeave, setAppliedLeave] = useState(0);
  const [appliedTransfer, setAppliedTransfer] = useState(0);
  const [image, setImage] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [outline, setOutline] = useState("2px solid #ccc");
  const [dashboard, setDashboard] = useState("")

  useEffect(() => {
    setTimeout(() => {
      const getUserDetail = async () => {
        if (isLogin) {
          try {
            const response = await Axios.get("/auth/user/info");
            setUser(response.data);
            setIsLoading(false);
            if (user.image_data) {
              setSrc(`data:${user.image_type};base64,${user.image_data}`);
            }
          } catch (error) {
            localStorage.removeItem("token");
            sessionStorage.setItem("isLogin", false);
            setIsLogin(false);
          }
        } else {
          setIsLoading(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
          navigate("/login");
        }
      };

      const fetchLeaveRequestCount = async () => {
        try {
          const response = await Axios.get("admin/leaveForms/notify");
          setLeave(response.data.length);
        } catch {
          console.log("Error fetching leave requests");
        }
      };

      const fetchRegisterRequests = async () => {
        try {
          const response = await Axios.get("admin/verifyRegisterRequests");
          setRegister(response.data.length);
        } catch {
          console.log("Error fetching register requests");
        }
      };

      const fetchTransferRequests = async () => {
        try{
          const response = await Axios.get("admin/transferForms/notify");
          if(response.data.length > 0){
            setTranfer(response.data.length);
          }
        }catch{
          console.log("Error fetching transfer requests");
        }}

      const fetchTransferFormsApplied = async () => {
        try {
          const response = await Axios.get("auth/user/transferForms");
          setAppliedLeave(response.data.length);
        } catch (error) {
          console.log("Error fetching appliedTransferForms requests", error);
        }
      };

      const fetchLeaveFormsApplied = async () => {
        try {
          const response = await Axios.get("auth/user/leaveForms");
          setAppliedTransfer(response.data.length);
        } catch (error) {
          console.log("Error fetching appliedLeaveForms requests", error);
        }
      };

      if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
        fetchLeaveRequestCount();
        fetchRegisterRequests();
        fetchTransferRequests();
      }
      fetchLeaveFormsApplied();
      fetchTransferFormsApplied();

      getUserDetail();
      setDashboard(user.role === "USER" ? "/userDashboard" : "/adminDashboard");
    }, 600);
  }, [
    navigate,
    token,
    user.image_data,
    user.image_type,
    user.role,
    setIsLogin,
    setUser,
    isLogin,
  ]);

  // logout implimentation
  const handleLogout = () => {
    if (confirm("do you want to logout!")) {
      localStorage.removeItem("token");
      sessionStorage.setItem("isLogin", false);
      setIsLogin(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate("/login");
    }
  };

  // updating the changes to the details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // update the data to the database
  const handleUpdate = async () => {
    setEditProfile(false);

    const formData = new FormData();

    if (image) {
      if (image.size > 1 * 1024 * 1024) {
        alert("Image size should be less than 1MB");
        return;
      }
      console.log("image upload: " + image);
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
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      document.getElementById("update").style.display = "none";
      document.getElementById("date_of_birth").type = "text";
      setReadOnly(true);
      if (user.image_data) {
        setSrc(`data:${user.image_type};base64,${user.image_data}`);
      }
      alert("update success");
    } catch {
      alert("update failed");
    }
  };

  return (
    <>
      {isloading ? (
        <LoadingAnimation />
      ) : (
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
                  to={""}
                  onClick={() => {
                    alert(
                      "you can modify the details by click on details shown!"
                    );
                    document.getElementById("update").style.display = "block";
                    document.getElementById("date_of_birth").type = "date";
                    setReadOnly(false);
                    setEditProfile(true);
                  }}
                >
                  <span>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/8188/8188360.png"
                      alt="icon1"
                    />
                    Edit Profile
                  </span>
                </Link>
              </p>
              <p>
                <Link to={"/resetPassword"}>
                  <span>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/25/25215.png"
                      alt="icon2"
                    />
                    Security Settings
                  </span>
                </Link>
              </p>
              <p>
                <Link to={"/notifications"}>
                  <span>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/3602/3602123.png"
                      alt="icon3"
                    />
                    Notification{" "}
                    {leave + register + transfer + appliedLeave + appliedTransfer >0 && (
                      <span className="notificationCount">
                        {leave +
                          register +
                          appliedLeave +
                          appliedTransfer +
                          transfer}
                      </span>
                    )}
                  </span>
                </Link>
              </p>
              <p>
                <Link to={dashboard}>
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
                {!readOnly && (
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
                      value={user.first_name}
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
                      value={user.last_name}
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
                      value={user.phone_no}
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
                      value={user.address}
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
                      type="text"
                      name="postal_code"
                      id="postal_code"
                      value={user.postal_code}
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
                      value={user.city}
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
                      value={user.ic_no}
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
                      value={user.emp_id}
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
                      value={user.date_of_birth?.substring(0, 10)}
                      onChange={handleChange}
                      placeholder="date_of_birth"
                      readOnly={readOnly}
                      style={editProfile ? { outline } : {}}
                    />
                  </label>
                  <label htmlFor="job_type">
                    Job type
                    <p>{user.job_type}</p>
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
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
