import { useState } from "react";
import "../css/signup.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const Navigate = useNavigate();
  const [emailError,setEmailError] = useState({});
  const [passwordError,setPasswordError] = useState({});
  // const [img,setImg] = useState(false);

  const [user, setUser] = useState({
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    confirmpassword:"",
    date_of_birth:"",
    phone_no:"",
    gender:"",
    address:"",
    city:"",
    ic_no:"",
    emp_id:"",
    job_type:"",
    postal_code:"",
    department:"",
    faculty:"",
  })

  const handleInput = (e) => {
    setEmailError({});
    setPasswordError({});
    const {name,value} = e.target;
    setUser((prevUser) => ({...prevUser, [name]: value}))
  }

  // how to find the image uploaded or not
  // const handleImage = (e) => {
  //   setError({})
  //   const file = e.target.files[0];
  //   setUser((prevUser) => ({...prevUser, image: file}))
  //   setImg(true)
  //   }

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    const {first_name,last_name,email,password,confirmpassword,date_of_birth,phone_no,gender,address,city,ic_no,
      emp_id,job_type,postal_code,department,faculty} = user;
    

    if(password != confirmpassword){
      alert("Password and Confirm Password does not match");
      setPasswordError({border:"2px solid red"});
      return;
    }

    
    try{
      const response = await axios.post("http://localhost:8080/auth/signup", {first_name,last_name,email,password,date_of_birth,phone_no,gender,address,city,ic_no,
        emp_id,job_type,postal_code,department,faculty});
      
      if(response.data === false){
        alert("Email already exists");
        setEmailError({border:"2px solid red"});
        return;
      }

      alert("register sucessfully");
      Navigate("/login");

    }catch{
      console.log("error")
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
    <>
      <div className="signup">
        <div className="signup-container">

          <h2>Registration Form</h2>
          <p>Fill about yourself here..</p>

          <form onSubmit={handleSubmit}>
            
            <div className="half">
              <div className="firstname">
                <label htmlFor="firstname">Firstname<span className="importantastrick"> *</span></label>
                <input type="text" id="firstname" placeholder="fistname" name="first_name" onChange={handleInput} value={user.first_name} required/>
              </div>
              <div className="lastname">
                <label htmlFor="fistname">Lastname</label>
                <input type="text" id="lastname" placeholder="lastname" name="last_name" onChange={handleInput} value={user.last_name} />
              </div>
            </div>

            <div className="half">
              <div className="bdate">
                <label htmlFor="bdate">Date of birth</label>
                <input type="date" id="bdate" name="date_of_birth" onChange={handleInput} value={user.date_of_birth}/>
              </div>
              <div className="gender">
                <label htmlFor="gender">Gender</label>
                <select name="gender" id="gender" onChange={handleInput} value={user.gender}>
                  <option value="">select one....</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </select>
              </div>
            </div>

            <div className="half">
              <div className="email">
                <label htmlFor="email">Email<span className="importantastrick"> *</span></label>
                <input type="email" id="email" placeholder="abc@gmail.com" style={emailError} name="email" onChange={handleInput} value={user.email} required/>
              </div>
              <div className="phone">
                <label htmlFor="phone">Phone No<span className="importantastrick"> *</span></label>
                <input type="tel" id="phone" placeholder="123456789" name="phone_no" onChange={handleInput} value={user.phone_no} required/>
              </div>
            </div>

            {/* <div className="half">
              <div>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={user.username} onChange={handleInput} placeholder="user name" required />
              </div>
            </div> */}
      
            <div className="half">
              <div className="password">
                <label htmlFor="password">Password<span className="importantastrick"> *</span></label>
                <img id="passimg" src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/closed-eye-icon.png" alt="" title="show password" onClick={()=>handleVissiblePassword("passimg","password")}/>
                <input type="password" id="password" placeholder="password" name="password" onChange={handleInput} value={user.password} required size={8}/>
              </div>
              <div className="confirmpassword">
                <label htmlFor="confirmpassword">Confirm password<span className="importantastrick"> *</span></label>
                <img id="confirmPassImg" src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/closed-eye-icon.png" alt="" title="show password" onClick={()=>handleVissiblePassword("confirmPassImg","confirmpassword")}/>
                <input type="password" id="confirmpassword" style={passwordError} placeholder="confirmpassword" name="confirmpassword" onChange={handleInput} value={user.confirmpassword} required size={8}/>
              </div>
            </div>

            <div className="half">
              <div>
                <label htmlFor="address">Address</label>
                <input type="text" id="address" placeholder="address" name="address" onChange={handleInput} value={user.address} />
              </div>
            </div>

            <div className="half">
              <div className="city">
                <label htmlFor="city">City</label>
                <input type="text" id="city" placeholder="city" name="city" onChange={handleInput} value={user.city} />
              </div>
              <div className="postalcode">
                <label htmlFor="postalcode">Postal code</label>
                <input type="number" id="postalcode" placeholder="postalcode" name="postal_code" onChange={handleInput} value={user.postal_code} />
              </div>
            </div>

            <div className="half">
              <div className="ic">
                <label htmlFor="ic">Identy card<span className="importantastrick"> *</span></label>
                <input type="text" id="ic" placeholder="9623213v" name="ic_no" onChange={handleInput} value={user.ic_no} required/>
              </div>
              <div className="emp_id">
                <label htmlFor="emp_id">Employee_id<span className="importantastrick"> *</span></label>
                <input type="number" id="emp_id" placeholder="emp_id" name="emp_id" onChange={handleInput} value={user.emp_id} required/>
              </div>
            </div>

            <div className="half">
              <div className="job_type">
                <label htmlFor="job_type">Job_type<span className="importantastrick"> *</span></label>
                <input type="text" id="job_type" placeholder="job_type" name="job_type" onChange={handleInput} value={user.job_type} required/>
              </div>
              {/* <div className="role">
                <label htmlFor="role">Are you </label>
                <select name="role" id="role" onChange={handleInput} value={user.role} required>
                <option value="">select one....</option>
                <option value="user">user</option>
                <option value="admin">admin</option>
                </select>
                </div> */}
            </div>

            <div className="half">
              <div className="department">
                <label htmlFor="department">Department<span className="importantastrick"> *</span></label>
                <input type="text" id="department" placeholder="department" name="department" onChange={handleInput} value={user.department} required/>
              </div>
              <div className="Faculty">
                <label htmlFor="faculty">Faculty<span className="importantastrick"> *</span></label>
                <select name="faculty" id="faculty" onChange={handleInput} value={user.faculty} required>
                  <option value="">select one....</option>
                  <option value="engineering">Engineering</option>
                  <option value="arts">Arts</option>
                  <option value="science">Science</option>
                  <option value="management">Management</option>
                  <option value="medical">Medical</option>
                  <option value="vetenary">Vetenary</option>
                </select>
              </div>
            </div>

            {/* <div>
              <div className="signup-profile-div">
                <label htmlFor="profile_img">Upload profile image
                  <img src="https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/image-photography-icon.png" alt="" />
                  <input type="file" id="profile_img" placeholder="profile_img" accept="image/png, image/jpg, image/jpeg"  name="image" onChange={handleImage} value={user.image} required/>
                </label>
              </div>
                <span className={`profile-img-verify ${img? "show-img":""}`}>Image Added Successfully</span>
            </div> */}

            <div className="signup-submit-btn">
              <input type="submit" value={"Submit"} />
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
