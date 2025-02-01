import { useEffect, useState } from "react";
import "../../css/Authentication/signup.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Axios } from "../AxiosReqestBuilder";

const Signup = () => {
  const Navigate = useNavigate();
  const [emailError, setEmailError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [img, setImg] = useState(null);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]); 

  useEffect(()=>{
    const fetchFaculty = async () => {
      try {
        const response = await Axios.get("/auth/user/faculty/getAll");
        setFaculties(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    const fetchDepartment = async () => {
      try {
        const response = await Axios.get("/auth/user/department/getAll");
        setDepartments(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    const fetchPositions = async () => {
      try {
        const response = await Axios.get("/auth/user/jobPosition/get");
        setPositions(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFaculty();
    fetchDepartment();
    fetchPositions();
  },[])


  const {register, handleSubmit, formState: { errors }, setValue, } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    // check the size of the image
    if (data.image) {
      if (data.image > 1 * 1024 * 1024) {
        alert("Image size should be less than 1MB");
        return;
      }
      formData.append("image", data.image);
    } else {
      formData.append("image", null);
    }

    if (data.password !== data.confirmpassword) {
      alert("Password and Confirm Password does not match");
      setPasswordError({ border: "2px solid red" });
      return;
    }

    Object.keys(data).forEach((key) => {
      if (key === "email") {
        formData.append(key, data[key].toLowerCase());
      } else if (key !== "image") {
        formData.append(key, data[key]);
      }
    });

    try {
      const response = await Axios.post("/auth/signup", formData);
      if (response.data === false) {
        alert("Email is already exists");
        setEmailError({ border: "2px solid red" });
        return;
      }

      alert("register sucessfully");
      window.scrollTo({ top: 0, behavior: "smooth" });
      Navigate("/login");
    } catch (error) {
      if(error.response.data.message){
        alert(error.response.data.message);
        console.log(error.response.data.message);
      }
      console.error(error);
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
    <>
      <div className="signup">
        <div className="signup-container">
          <h2>Registration Form</h2>
          <p className="sigup-greet">Fill about yourself here..</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="half">
              <div className="firstname">
                <label htmlFor="first_name">
                  Firstname<span className="importantastrick"> *</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  placeholder="first_name"
                  name="first_name"
                  {...register("first_name", {
                    required: {
                      value: true,
                      message: "First name is required",
                    },
                  })}
                />
                {errors.first_name && (
                  <span className="error">{errors.first_name.message}</span>
                )}
              </div>
              <div className="lastname">
                <label htmlFor="last_name">
                  Lastname<span className="importantastrick"> *</span>
                </label>
                <input
                  type="text"
                  id="last_name"
                  placeholder="last_name"
                  name="last_name"
                  {...register("last_name", {
                    required: {
                      value: true,
                      message: "Last name is required",
                    },
                  })}
                />
                {errors.last_name && (
                  <span className="error">{errors.last_name.message}</span>
                )}
              </div>
            </div>

            <div className="half">
              <div className="bdate">
                <label htmlFor="bdate">
                  Date of birth<span className="importantastrick"> *</span>
                </label>
                <input
                  type="date"
                  id="bdate"
                  name="date_of_birth"
                  {...register("date_of_birth", {
                    required: {
                      value: true,
                      message: "Date of birth is required",
                    },
                  })}
                />
                {errors.date_of_birth && (
                  <span className="error">{errors.date_of_birth.message}</span>
                )}
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
                <label htmlFor="email">
                  Email<span className="importantastrick"> *</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="abc@gmail.com"
                  style={emailError}
                  name="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value:  /^[a-zA-Z0-9._%+-]+@gs\.pdn\.ac\.lk$/,
                      message: "Invalid email! Please use an email from the gs.pdn.ac.lk domain.",
                    },
                  })}
                />
                {errors.email && (
                  <span className="error">{errors.email.message}</span>
                )}
              </div>
              {/* <div className="appPassword">
                <label htmlFor="appPassword">App password for Email<span className="importantastrick"> *</span></label>
                <div className="show">
                  <img id="appPassimg" src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/closed-eye-icon.png" alt="" title="show password" onClick={()=>handleVissiblePassword("appPassimg","appPassword")}/>
                  <input type="password" id="appPassword" placeholder="123456789" name="phone_no" {...register("app_password", {required:{
                    value:true,
                    message:"App password is required"
                    }})}/>
                </div>
                  {errors.app_password && <span className="error">{errors.app_password.message}</span>}
              </div> */}
            </div>

            {/* <div className="half">
              <div>
              <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" value={user.username} onChange={handleInput} placeholder="user name" required />
                </div>
                </div> */}

            <div className="half">
              <div className="password">
                <label htmlFor="password">
                  Password<span className="importantastrick"> *</span>
                </label>
                <div className="show">
                  <img
                    id="passimg"
                    src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/closed-eye-icon.png"
                    alt=""
                    title="show password"
                    onClick={() =>
                      handleVissiblePassword("passimg", "password")
                    }
                  />
                  <input
                    type="password"
                    id="password"
                    placeholder="password"
                    name="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$]).{8,}$/,
                        message: "Password is not valid",
                      },
                    })}
                    size={8}
                  />
                </div>
                {errors.password && (
                  <span className="error">{errors.password.message}</span>
                )}
              </div>
              <div className="confirmpassword">
                <label htmlFor="confirmpassword">
                  Confirm password<span className="importantastrick"> *</span>
                </label>
                <div className="show">
                  <img
                    id="confirmPassImg"
                    src="https://uxwing.com/wp-content/themes/uxwing/download/health-sickness-organs/closed-eye-icon.png"
                    alt=""
                    title="show password"
                    onClick={() =>
                      handleVissiblePassword(
                        "confirmPassImg",
                        "confirmpassword"
                      )
                    }
                  />
                  <input
                    type="password"
                    id="confirmpassword"
                    style={passwordError}
                    placeholder="confirmpassword"
                    name="confirmpassword"
                    {...register("confirmpassword", {
                      required: {
                        value: true,
                        message: "Confirm password is required",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$]).{8,}$/,
                        message: "ConfirmPassword is not valid",
                      },
                    })}
                    size={8}
                  />
                </div>
                {errors.confirmpassword && (
                  <span className="error">
                    {errors.confirmpassword.message}
                  </span>
                )}
              </div>
            </div>

            <div className="div">
              <p className="password-requirements">
                (password should contain atleast one uppercase letter &
                lowercase letter & number & special character and at least 8
                characters long)
              </p>
            </div>

            <div className="half">
              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="address"
                  name="address"
                  {...register("address")}
                />
              </div>
              <div className="city">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  placeholder="city"
                  name="city"
                  {...register("city")}
                />
              </div>
            </div>

            <div className="half">
              <div className="postalcode">
                <label htmlFor="postalcode">Postal code<span className="importantastrick"> *</span></label>
                <input
                  type="number"
                  id="postalcode"
                  placeholder="postalcode"
                  name="postal_code"
                  {...register("postal_code", {required:{
                    value: true,
                    message: "postalcode is required"
                  }})}
                />
                {errors.postal_code && (
                  <span className="error">{errors.postal_code.message}</span>
                )}
              </div>
              <div className="phone">
                <label htmlFor="phone">
                  Phone No<span className="importantastrick"> *</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="123456789"
                  name="phone_no"
                  {...register("phone_no", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                  })}
                />
                {errors.phone_no && (
                  <span className="error">{errors.phone_no.message}</span>
                )}
              </div>
            </div>

            <div className="half">
              <div className="ic">
                <label htmlFor="ic">
                  Identy card<span className="importantastrick"> *</span>
                </label>
                <input
                  type="text"
                  id="ic"
                  placeholder="9623213v"
                  name="ic_no"
                  {...register("ic_no", {
                    required: {
                      value: true,
                      message: "Identy card is required",
                    },
                  })}
                />
                {errors.ic_no && (
                  <span className="error">{errors.ic_no.message}</span>
                )}
              </div>
              <div className="emp_id">
                <label htmlFor="emp_id">
                  Employee_id<span className="importantastrick"> *</span>
                </label>
                <input
                  type="text"
                  id="emp_id"
                  placeholder="emp_id"
                  name="emp_id"
                  {...register("emp_id", {
                    required: {
                      value: true,
                      message: "Employee_id is required",
                    },
                  })}
                />
                {errors.emp_id && (
                  <span className="error">{errors.emp_id.message}</span>
                )}
              </div>
            </div>

            <div className="half">
              <div className="job_type">
                <label htmlFor="job_type">
                  Job_type<span className="importantastrick"> *</span>
                </label>
                <select
                  type="text"
                  id="job_type"
                  placeholder="job_type"
                  name="job_type"
                  {...register("job_type", {
                    required: {
                      value: true,
                      message: "Job_type is required",
                    },
                  })}
                >
                  <option value="">Select job type</option>
                  {
                    positions?.map((position, index) => (
                      <option key={index} value={position.jobPositionName}>{position.jobPositionName}</option>
                    ))
                  }
                  {/* <option value="Dean">Dean</option>
                  <option value="Chief Medical Officer">CMO</option>
                  <option value="Non Academic Establishment Division">NAE</option>
                  <option value="Registrar">Registrar</option>
                  <option value="Head of the Department">
                    Head of the Department
                  </option>
                  <option value="Technical Officer">Technical Officer</option>
                  <option value="Management Assistant">
                    Management Assistant
                  </option>
                  <option value="Book Keeper">Book Keeper</option>
                  <option value="Typist">Typist</option>
                  <option value="Office Machine Operator">
                    Office Machine Operator
                  </option>
                  <option value="Lab Attendant">Lab Attendant</option>
                  <option value="Labourer">Labourer</option>
                  <option value="Driver">Driver</option>
                  <option value="Carpenter">Carpenter</option> */}
                </select>
                {errors.job_type && (
                  <span className="error">{errors.job_type.message}</span>
                )}
              </div>
              <div className="role">
                <label htmlFor="role">Are you </label>
                <select
                  name="role"
                  id="role"
                  {...register("role", {
                    required: {
                      value: true,
                      message: "Role is required",
                    },
                  })}
                >
                  <option value="">select one....</option>
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                  <option value="SUPER_ADMIN">super_admin</option>
                </select>
                {errors.role && (
                  <span className="error">{errors.role.message}</span>
                )}
              </div>
            </div>

            <div className="half">
              <div className="Faculty">
                <label htmlFor="faculty">
                  Faculty<span className="importantastrick"> *</span>
                </label>
                <select
                  name="faculty"
                  id="faculty"
                  {...register("faculty", {
                    required: {
                      value: true,
                      message: "Faculty is required",
                    },
                  })}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                >
                  <option value="">select one....</option>
                  {faculties?.map((faculty, index) => (
                    <option key={index} value={faculty.id}>
                      {faculty.facultyName}
                    </option>
                  ))}
                </select>
                {errors.faculty && (
                  <span className="error">{errors.faculty.message}</span>
                )}
              </div>

              <div className="department">
                <label htmlFor="department">
                  Department<span className="importantastrick"> *</span>
                </label>
                <select
                  id="department"
                  name="department"
                  {...register("department", {
                    required: {
                      value: true,
                      message: "Department is required",
                    },
                  })}
                >
                  <option value="">select one....</option>

                  {departments.filter((department) => selectedFaculty == department.facultyId).map((department, index) => (
                    <option key={index} value={department.departmentName}>
                      {department.departmentName}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <span className="error">{errors.department.message}</span>
                )}
              </div>
            </div>

            <div>
              <div className="signup-profile-div">
                <label htmlFor="profile_img">
                  Upload profile image
                  <img
                    src="https://uxwing.com/wp-content/themes/uxwing/download/video-photography-multimedia/image-photography-icon.png"
                    alt=""
                  />
                  <input
                    type="file"
                    id="profile_img"
                    accept="image/png, image/jpg, image/jpeg, image/webp"
                    name="image"
                    {...register("image")}
                    onChange={(e) => {
                      setImg(e.target.value);
                      setValue("image", e.target.files[0]);
                    }}
                  />
                  {img && (
                    <div className="imageUploadSuccess">Image: {img} added</div>
                  )}
                </label>
              </div>
            </div>

            <div className="signup-submit-btn">
              <input type="submit" className="bttn redbtn" value={"Submit"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
