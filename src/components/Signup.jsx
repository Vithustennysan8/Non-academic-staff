import { useState } from "react";
import "../css/signup.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signup = () => {
  const Navigate = useNavigate();
  const [emailError,setEmailError] = useState({});
  const [passwordError,setPasswordError] = useState({});
  // const defaultImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwECB//EADoQAAICAQEGAgYIBAcAAAAAAAABAgMEEQUSITFBURNhBiIyUnGxFCNCgZGhwdEVQ+HwJDM1U2KSsv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9RAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI+dkfRsd2Jay5RXmB2sshXHesnGMe7ehGltLEX85P4JlBbbO6bnbNyk+rZ8AaD+KYn+4/+rPqO0cSX83T4pmdAGrhOFkN+uSlF9YvU+jL4+RbjT36paPs+TNBh5UMuvehwkvaj2YEgAAAAAAAAAAAAAAABGazsmWRfNyb3U9Ix15Gl6opNj0K3bcINaqE5Saflrp+egHtWwc+2tT8OMNeKU5aM8/gW0U9PAT899GxAGSh6OZ75+FH4zPqXo5mxXCdMvJSf7GrAGCysW/EnuZFbhLmuz+DOuy7nTmR92z1ZfoX/AKVRT2dCTXFWrR/czNYqbyql/wA18wNQB5gAAAAAAAAAAAAAAET0fp12rm2+42tfNv8AoS0tWl3Z32biyxsnMUtGpzjJPvw/fUCeAAAAAqvSaDlsttL2Zxf6fqZrZkd7PpT76/gmzbX0wyKZ02rWE1pIzuyNmTjtTI118KhuG++rfL8gLAH1ZHcslHs9D5AAAAAAAAAAAAAAHLiWsdHFPutSqLHHsjOuKTWqXFAdQAAAAA8e7BN6JLmz0jZd0dxwi9W+HDoBDlJyk5PrxPAAAAAAAAAAAAAAAAdcWW7fHXk+ByGunFdALYHOi1W1p9eqOgAA8bSWrfAD5vko0zflwKwkZFkr5KEPZ1/Ej/EAAAAAAAAAAAAAAAAAAAO1Gu9LRkpWyXREajWORGD9zl5viS90D5dsnySRzmpT4yep23Txgc4QSepXX5Cr2jLGkl60VKDT/J/mS9oZkMLGlbLRy5Qj7zMdZdbZe75TfiN7295gaoETAzI5VaT0Vq9qPfzRLAAAAAAAAAAAADldk00L62yKfbm/wKzJ2vJ+rjQ3V70+YFpddXRHetmorzImLmyzs6uiiLjVrrOT5tL5FHOc7JuVk3J929S22AnCORbBeu0oQfbq38gNAov6Wpf3yJJFx5NRXi8ZLr3FttvHc0QEiTOdtkKq5WWvSEU3JnGnI3mo26Rl36Modu7R+kWvHqf1UH6zX2pfsBC2lmyzsl2S1UFwhHsiKAB6m0002muqJ+LtS2r1bvrY9/tIrwBqMfIqyIb1U0+66r4o6mUhOVc1OuTjJdU9CyxtsTjpHIjvL3o8wLkHOjIqyI602KXl1R0AAAAVe2smdahTXNx3lvS0LQzW0bfHzLJL2U91fBAR/mAADNH6PV/4Fyf2pv8AQzjNTsJabLp+Mv8A0wJ6WgB83WwpqnZN6RgtWBWbcyVj0+FD/Ms7dF3M4uR1ysieVkTunzk+C91djkAAAAAAAAB7GUoSUoScZLk0y92TmSyK5QtlrZDjr3RQkvZdnhZtfab3X9/9QNEAAOWTJwxrZR4NQbX4GXQAAAAGavYv+l0ff82ABNKX0ltmoU1J6Qlq5LvpyAAoUAAAAAAAAAAB7FuMlJPRp6oADWgAD//Z"


  const {register, handleSubmit, formState : {errors}} = useForm();

  const onSubmit = async (data) => {

    const formData = new FormData();
    if(data.image){
      formData.append("image",data.image[0]);
    }

    Object.keys(data).forEach(key => {
      if(key === 'date_of_birth'){
        formData.append(key, data[key].split('-').reverse().join('-'))
      }
      if(key !== "image" || key !== "date_of_birth"){
        formData.append(key, data[key]);
      }
    })


    if(data.password != data.confirmpassword){
      alert("Password and Confirm Password does not match");
      setPasswordError({border:"2px solid red"});
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/signup", formData);

      if(response.data === false){
        alert("Email already exists");
        setEmailError({border:"2px solid red"});
        return;
        }

        alert("register sucessfully");
        Navigate("/login");

    } catch (error) {
      console.log(error);
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

          <form onSubmit={handleSubmit(onSubmit)}>
            

            <div className="half">
              <div className="firstname">
                <label htmlFor="firstname">Firstname<span className="importantastrick"> *</span></label>
                {/* <input type="text" id="firstname" placeholder="fistname" name="first_name" onChange={handleInput} value={user.first_name} required/> */}
                <input type="text" id="firstname" placeholder="fistname" name="first_name" {...register("first_name", {required:{
                  value:true,
                  message:"First name is required"
                }})}/>
                {errors.first_name && <span className="error">{errors.first_name.message}</span>}
              </div>
              <div className="lastname">
                <label htmlFor="fistname">Lastname</label>
                {/* <input type="text" id="lastname" placeholder="lastname" name="last_name" onChange={handleInput} value={user.last_name} /> */}
                <input type="text" id="lastname" placeholder="lastname" name="last_name" {...register("last_name", {required :{
                  value:true,
                  message:"Last name is required"
                }})} />
                {errors.last_name && <span className="error">{errors.last_name.message}</span>}
              </div>
            </div>

            <div className="half">
              <div className="bdate">
                <label htmlFor="bdate">Date of birth</label>
                {/* <input type="date" id="bdate" name="date_of_birth" onChange={handleInput} value={user.date_of_birth}/> */}
                <input type="date" id="bdate" name="date_of_birth" {...register("date_of_birth")}/>
              </div>
              <div className="gender">
                <label htmlFor="gender">Gender</label>
                {/* <select name="gender" id="gender" onChange={handleInput} value={user.gender}> */}
                <select name="gender" id="gender" {...register("gender")}>
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
                {/* <input type="email" id="email" placeholder="abc@gmail.com" style={emailError} name="email" onChange={handleInput} value={user.email} required/> */}
                <input type="email" id="email" placeholder="abc@gmail.com" style={emailError} name="email" {...register("email", {required:{
                  value:true,
                  message:"Email is required"
                },
                pattern:{
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ,
                  message: "Email is not valid"
                }
                })}/>
                {errors.email && <span className="error">{errors.email.message}</span>}
              </div>
              <div className="phone">
                <label htmlFor="phone">Phone No<span className="importantastrick"> *</span></label>
                <input type="tel" id="phone" placeholder="123456789" name="phone_no" {...register("phone_no", {required:{
                  value:true,
                  message:"Phone number is required"
                }})}/>
                {errors.phone_no && <span className="error">{errors.phone_no.message}</span>}
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
                <input type="password" id="password" placeholder="password" name="password" {...register("password", {required:{
                  value:true,
                  message:"Password is required"
                }})} size={8}/>
              </div>
                {errors.password && <span className="error">{errors.password.message}</span>}
              <div className="confirmpassword">
                <label htmlFor="confirmpassword">Confirm password<span className="importantastrick"> *</span></label>
                <img id="confirmPassImg" src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/closed-eye-icon.png" alt="" title="show password" onClick={()=>handleVissiblePassword("confirmPassImg","confirmpassword")}/>
                {/* <input type="password" id="confirmpassword" style={passwordError} placeholder="confirmpassword" name="confirmpassword" onChange={handleInput} value={user.confirmpassword} required size={8}/> */}
                <input type="password" id="confirmpassword" style={passwordError} placeholder="confirmpassword" name="confirmpassword" {...register("confirmpassword", {required:{
                  value:true,
                  message:"Confirm password is required"
                }})} size={8}/>
              </div>
                {errors.confirmpassword && <span className="error">{errors.confirmpassword.message}</span>}
            </div>

            <div className="half">
              <div>
                <label htmlFor="address">Address</label>
                {/* <input type="text" id="address" placeholder="address" name="address" onChange={handleInput} value={user.address} /> */}
                <input type="text" id="address" placeholder="address" name="address" {...register("address")} />
              </div>
            </div>

            <div className="half">
              <div className="city">
                <label htmlFor="city">City</label>
                {/* <input type="text" id="city" placeholder="city" name="city" onChange={handleInput} value={user.city} /> */}
                <input type="text" id="city" placeholder="city" name="city" {...register("city")} />
              </div>
              <div className="postalcode">
                <label htmlFor="postalcode">Postal code</label>
                {/* <input type="number" id="postalcode" placeholder="postalcode" name="postal_code" onChange={handleInput} value={user.postal_code} /> */}
                <input type="number" id="postalcode" placeholder="postalcode" name="postal_code" {...register("postal_code")} />
              </div>
            </div>

            <div className="half">
              <div className="ic">
                <label htmlFor="ic">Identy card<span className="importantastrick"> *</span></label>
                {/* <input type="text" id="ic" placeholder="9623213v" name="ic_no" onChange={handleInput} value={user.ic_no} required/> */}
                <input type="text" id="ic" placeholder="9623213v" name="ic_no" {...register("ic_no", {required:{
                  value:true,
                  message:"Identy card is required"
                }})}/>
                {errors.ic_no && <span className="error">{errors.ic_no.message}</span>}
              </div>
              <div className="emp_id">
                <label htmlFor="emp_id">Employee_id<span className="importantastrick"> *</span></label>
                {/* <input type="number" id="emp_id" placeholder="emp_id" name="emp_id" onChange={handleInput} value={user.emp_id} required/> */}
                <input type="number" id="emp_id" placeholder="emp_id" name="emp_id" {...register("emp_id", {required:{
                  value:true,
                  message:"Employee_id is required"
                }})}/>
                {errors.emp_id && <span className="error">{errors.emp_id.message}</span>}
              </div>
            </div>

            <div className="half">
              <div className="job_type">
                <label htmlFor="job_type">Job_type<span className="importantastrick"> *</span></label>
                {/* <input type="text" id="job_type" placeholder="job_type" name="job_type" onChange={handleInput} value={user.job_type} required/> */}
                <input type="text" id="job_type" placeholder="job_type" name="job_type" {...register("job_type", {required: {
                  value: true,
                  message: "Job_type is required"
                }})}/>
                {errors.job_type && <span className="error">{errors.job_type.message}</span>}
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
                {/* <input type="text" id="department" placeholder="department" name="department" onChange={handleInput} value={user.department} required/> */}
                <input type="text" id="department" placeholder="department" name="department" {...register("department", {required:{
                  value:true,
                  message:"Department is required"
                }})}/>
                {errors.department && <span className="error">{errors.department.message}</span>}
              </div>
              <div className="Faculty">
                <label htmlFor="faculty">Faculty<span className="importantastrick"> *</span></label>
                {/* <select name="faculty" id="faculty" onChange={handleInput} value={user.faculty} required> */}
                <select name="faculty" id="faculty" {...register("faculty", {required:{
                  value:true,
                  message:"Faculty is required"
                }})}>

                  
                  <option value="">select one....</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Arts">Arts</option>
                  <option value="Science">Science</option>
                  <option value="Management">Management</option>
                  <option value="Medical">Medical</option>
                  <option value="Vetenary">Vetenary</option>
                </select>
                  {errors.faculty && <span className="error">{errors.faculty.message}</span>}
              </div>
            </div>

            <div>
              <div className="signup-profile-div">
                <label htmlFor="profile_img">Upload profile image
                  <img src="https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/image-photography-icon.png" alt="" />
                  <input type="file" id="profile_img" accept="image/png, image/jpg, image/jpeg, image/webp"  name="image" {...register("image")}/>
                </label>
              </div>
            </div>

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
