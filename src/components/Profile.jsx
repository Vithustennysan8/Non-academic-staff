import "../css/profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoadingAnimation from "./LoadingAnimation";

const Profile = ({setIsLogin}) => {
    const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(true);
  const [src, setSrc] = useState("https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg");

  const [user, setUser] = useState({
    id:'',
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    phone_no: "",
    address: "",
    city: "",
    ic_no: "",
    emp_id: "",
    job_type: "",
    postal_code: "",
    department: "",
    faculty: "",
  });

  // fetch the user data
  useEffect(() => {
    setTimeout(() => {
      
      const getUserDetail = async () => {

      if (token) {
        try {
          const response = await axios.get("http://localhost:8080/api/auth/user/info",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(response.data);
          setIsLoading(false);
          if(user.image_data){
            setSrc(`data:${user.image_type};base64,${user.image_data}`)
          }
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.setItem("isLogin",false)
          setIsLogin(false)
        }
      } else {
        setIsLoading(false);
        window.scrollTo({top: 0, behavior: 'smooth'});
        navigate("/login");
      }
      };
      getUserDetail();
    }, 600);

  }, [navigate, token, user.image_data, user.image_type, setIsLogin]);


  // logout implimentation
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.setItem("isLogin",false);
    alert("do you want to logout!");
    setIsLogin(false)
    window.scrollTo({top: 0, behavior: 'smooth'});
    navigate("/login");
  };

  // updating the changes to the details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // update the data to the database
  const handleUpdate = async () => {
    await axios.put("http://localhost:8080/api/auth/user/update", user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    document.getElementById("update").style.display = "none";
    alert("update success");
  };


  return (
    <>
    {isloading? <LoadingAnimation/> : <>
      <div id="profile-container">
        <div className="profile-bar">
          <div className="profile-heading">
            <h3>Personal</h3>
          </div>
        </div>

        <div className="small-navbar">
          <p>
            <Link
            to={""}
              onClick={() => {
                alert("you can modify the details by click on details!");
                document.getElementById("update").style.display = "block";
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
            <Link to={''} >
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3602/3602123.png"
                  alt="icon3"
                />
                Notification
              </span>
            </Link>
          </p>
          <p>
            <Link to="/dashboard">
              <span>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10541/10541390.png"
                  alt="icon3"
                  />
                Dashboard
              </span>
            </Link>
          </p>
        </div>
        
        <div className="profile-detail-wrapper">

        <div className="profile-img" >
            <img
              src={src}
              alt=""
            />
          <div className="profile-blur-shadow" style={{
            background:`url(data:${user.image_type};base64,${user.image_data})`,
             backgroundPosition:"center",
             filter:'blur(5px)',
             backgroundRepeat:'no-repeat',
             backgroundSize:'cover'}}>
          </div>
        </div>

        <div className="profile-detail-container">
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
                placeholder="firstname"
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
                placeholder="lastname"
                />
            </label>
          </div>

          <div className="profile-state">
            <label htmlFor="emailAddress">
             Email Address
              <input
                 type="email"
                 name="email"
                 id="email"
                 value={user.email}
                 readOnly
                 placeholder="emailAddress"
                 />
            </label>
            <label htmlFor="userId">
              UserId
              <input
                 type="text"
                 name="id"
                 id="userId"
                 value={user.id}
                 readOnly
                 placeholder="userId"
                 />
            </label>
          </div>

          <div className="profile-state">
            <label htmlFor="phoneNumber">
              Phone Number
              <input
                type="number"
                name="phone_no"
                id="phone_no"
                value={user.phone_no}
                onChange={handleChange}
                required
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
                required
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
                value={user.postal_code}
                onChange={handleChange}
                placeholder="postal_code"
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
                placeholder="postal_code"
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
                value={user.date_of_birth?.substring(0,10)}
                onChange={handleChange}
                onClick={(e) => (e.target.type = "date")}
                placeholder="date_of_birth"
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
              onClick={handleUpdate}
              />
          </div>
          <div className=" logout-btn">
            <input type="button" value="Logout" onClick={handleLogout} />
          </div>
        </div>
        </div>
      </div>
    </>}
    </>
  );
};

export default Profile;
