import { useState } from "react";
import "../css/signup.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signup = () => {
  const Navigate = useNavigate();
  const [emailError,setEmailError] = useState({});
  const [passwordError,setPasswordError] = useState({});
  const [selectedFaculty,setSelectedFaculty] = useState('');
  // const [image, setImage] = useState('');
  const [isImageAdded, setIsImageAdded] = useState(false);


  const {register, handleSubmit, formState : {errors}} = useForm();

  const onSubmit = async (data) => {

    const formData = new FormData();
    console.log(data.image[0]);
    
    if(data.image){
      formData.append("image",data.image[0]);
    }else{
      formData.append("image",null);
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
        window.scrollTo({top: 0, behavior: 'smooth'});
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
  
  const faculties = [
              {faculty:"Faculty of Engineering",
                department:"Chemical and Process Engineering, Computer Engineering, Civil Engineering, Electrical and Electronic Engineering, Engineering Mathematics, Manufacturing and Industrial Engineering, Mechanical Engineering, Dean's Office"},
              {faculty:"Faculty of Science",
                department:"Botany, Chemistry, Environmental and Industrial Sciences, Geology, Statistics and Computer Science, Mathematics, Molecular Biology and Biotechnology, Physics, Zoology, Dean's Office"},
              {faculty:"Faculty of Arts",
                department:"Arabic and Islamic Civilization, Archaeology, Classical Languages, Economics and Statistics, Education, English, English Language Teaching, Fine Arts, Geography, History, Information Technology, Law, Philosophy, Psychology, Political Science, Pali and Buddhist Studies, Sinhala, Sociology, Tamil, Dean's Office"},
              {faculty:"Faculty of Medicine",
                department:"Anatomy, Anaesthesiology and Critical Care, Biochemistry, Community Medicine, Family Medicine, Forensic Medicine, Medical Education, Medicine, Microbiology, Obstetrics and Gynaecology, Paediatrics, Parasitology, Pathology, Pharmacology, Physiology, Psychiatry, Radiology, Surgery, Dean's Office"},
              {faculty:"Faculty of Veterinary Medicine and Animal Science",
                department:"Basic Veterinary Sciences, Veterinary Clinical Sciences, Farm Animal Production and Health, Veterinary Pathobiology, Veterinary Public Health and Pharmacology, Dean's Office"},
              {faculty:"Faculty of Agriculture",
                department:"Agricultural Biology, Agricultural Economics and Business Management, Agricultural Engineering, Agricultural Extension, Animal Science, Crop Science, Food Science and Technology, Soil Science, Dean's Office"},
              {faculty:"Faculty of Allied Health Sciences",
                department:"Medical Laboratory Sciences, Nursing, Pharmacy, Physiotherapy, Radiography and Radiotherapy, Basic Sciences, Dean's Office"},
              {faculty:"Faculty of Dental Sciences",
                department:"Basic Sciences, Community Dental Health, Comprehensive Oral Health Care, Oral Medicine and Periodontology, Oral Pathology, Prosthetic Dentistry, Restorative Dentistry, Oral and Maxillofacial Surgery, Dean's Office"},
              {faculty:"Faculty of Management",
                department:"Business Finance, Human Resource Management, Management Studies, Marketing Management, Operations Management"},
              {faculty:"Registrar's Office",
                department:"Administrative Section"},
              {faculty:"Administration Office",
                department:"Administrative Section"},
              {faculty:"IT Services",
                department:"Technical Section"},
              {faculty:"Library Services",
                department:"Library Section"},
              {faculty:"Facilities Management",
                department:"Maintenance Section"},
              {faculty:"Security Services",
                department:"Security Section"},
              {faculty:"Finance Department",
                department:"Finance Section"},
              {faculty:"Human Resources Department",
                department:"HR Section"},
              {faculty:"Student Affairs Office",
                department:"Student Affairs Section"},
            ]

  const departments = faculties.find(faculty => faculty.faculty === selectedFaculty)?.department.split(', ') || [];

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
                <input type="text" id="firstname" placeholder="fistname" name="first_name" {...register("first_name", {required:{
                  value:true,
                  message:"First name is required"
                }})}/>
                {errors.first_name && <span className="error">{errors.first_name.message}</span>}
              </div>
              <div className="lastname">
                <label htmlFor="fistname">Lastname</label>
                <input type="text" id="lastname" placeholder="lastname" name="last_name" {...register("last_name", {required :{
                  value:true,
                  message:"Last name is required"
                }})} />
                {errors.last_name && <span className="error">{errors.last_name.message}</span>}
              </div>
            </div>

            <div className="half">
              <div className="bdate">
                <label htmlFor="bdate">Date of birth<span className="importantastrick"> *</span></label>
                <input type="date" id="bdate" name="date_of_birth" {...register("date_of_birth", {required:{
                  value:true,
                  message:"Date of birth is required"
                }})}/>
              </div>
              <div className="gender">
                <label htmlFor="gender">Gender</label>
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
                <input type="text" id="address" placeholder="address" name="address" {...register("address")} />
              </div>
            </div>

            <div className="half">
              <div className="city">
                <label htmlFor="city">City</label>
                <input type="text" id="city" placeholder="city" name="city" {...register("city")} />
              </div>
              <div className="postalcode">
                <label htmlFor="postalcode">Postal code</label>
                <input type="number" id="postalcode" placeholder="postalcode" name="postal_code" {...register("postal_code")} />
              </div>
            </div>

            <div className="half">
              <div className="ic">
                <label htmlFor="ic">Identy card<span className="importantastrick"> *</span></label>
                <input type="text" id="ic" placeholder="9623213v" name="ic_no" {...register("ic_no", {required:{
                  value:true,
                  message:"Identy card is required"
                }})}/>
                {errors.ic_no && <span className="error">{errors.ic_no.message}</span>}
              </div>
              <div className="emp_id">
                <label htmlFor="emp_id">Employee_id<span className="importantastrick"> *</span></label>
                <input type="text" id="emp_id" placeholder="emp_id" name="emp_id" {...register("emp_id", {required:{
                  value:true,
                  message:"Employee_id is required"
                }})}/>
                {errors.emp_id && <span className="error">{errors.emp_id.message}</span>}
              </div>
            </div>

            <div className="half">
              <div className="job_type">
                <label htmlFor="job_type">Job_type<span className="importantastrick"> *</span></label>
                <select type="text" id="job_type" placeholder="job_type" name="job_type" {...register("job_type", {required: {
                  value: true,
                  message: "Job_type is required"
                }})}>
                <option value="">Select job type</option>
                <option value="Technical Officer">Technical Officer</option>
                <option value="Management Assistant">Management Assistant</option>
                <option value="Book Keeper">Book Keeper</option>
                <option value="Typist">Typist</option>
                <option value="Office Machine Operator">Office Machine Operator</option>
                <option value="Lab Attendant">Lab Attendant</option>
                <option value="Labourer">Labourer</option>
                <option value="Driver">Driver</option>
                <option value="Carpenter">Carpenter</option>
                </select>
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
                <div className="Faculty">
                  <label htmlFor="faculty">Faculty<span className="importantastrick"> *</span></label>
                  <select name="faculty" id="faculty" {...register("faculty", {required:{
                    value:true,
                    message:"Faculty is required"
                  }})} 
                  onChange={e => setSelectedFaculty(e.target.value)}
                  >
                    <option value="">select one....</option>
                    {faculties.map((faculty,index) => (
                      <option key={index} value={faculty.faculty}>{faculty.faculty}</option>
                    ))}
                    
                  </select>
                    {errors.faculty && <span className="error">{errors.faculty.message}</span>}
                </div>
              
              
              
              <div className="department">
                <label htmlFor="department">Department<span className="importantastrick"> *</span></label>
                <select id="department" name="department" {...register("department", {required:{
                  value:true,
                  message:"Department is required"
                }})}>
                  <option value="">select one....</option>
                  
                  {departments.map((department, index) => (
                    <option key={index} value={department}>{department}</option>
                  ))}

                </select>
                {errors.department && <span className="error">{errors.department.message}</span>}
              </div>
            </div>

            <div>
              <div className="signup-profile-div">
                <label htmlFor="profile_img">Upload profile image
                  <img src="https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/image-photography-icon.png" alt="" />
                  <input type="file" id="profile_img" accept="image/png, image/jpg, image/jpeg, image/webp"  name="image" {...register("image")} />
                  </label>
                {/* { isImageAdded && <div className="imageUploadSuccess">Image: {image} added</div>} */}
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
