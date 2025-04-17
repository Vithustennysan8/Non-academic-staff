import { useContext, useEffect, useState } from "react"
import "../../css/Admin/manageDepartments.css"
import {LoginContext} from "../../Contexts/LoginContext.jsx"
import { UserContext } from "../../Contexts/UserContext.jsx"
import { useNavigate } from "react-router-dom"
import {Axios} from "../AxiosReqestBuilder.jsx"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([])
  const [editDepartment, setEditDepartment] = useState(null);
  const {isLogin} = useContext(LoginContext);  
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState([]);

  const {register, handleSubmit, formState:{errors}, reset, setValue} = useForm();

  useEffect(() => {
    if(!isLogin){
      window.scrollTo({top:0, behavior:"smooth"});
      navigate("/login");
    }

    const fetchFaculty = async () => {
      try {
        const response = await Axios.get("/auth/user/faculty/getAll");
        setFaculties(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    const fetchDepartment = async () => {
      try {
        const response = await Axios.get("/auth/user/department/get");
        setDepartments(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchDepartment();
    fetchFaculty();
  },[isLogin, navigate])

  const onSubmit = async (data) => {
    console.log(data.faculty);
    console.log(data.name);
    try {
      const response = editDepartment ? await Axios.put(`/admin/department/update/${editDepartment.id}`, data) : await Axios.post("/admin/department/add", data);
      console.log(response.data);
      setDepartments(response.data);
      setEditDepartment(null);
      Swal.fire({
              title: editDepartment ? "Successfully updated" : "Successfully added",
              icon: "success",
            });
      reset();
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.message || "Error",
        text: "Failed to add department",
        icon: "error",
      })
    }
  }


  const handleUpdate = async (department) => {
    setEditDepartment(department)
    setValue("faculty", department.facultyId);
    setValue("name", department.departmentName);
    setValue("alias", department.alias);
  }

  const handleDelete = async (id) => {
    Swal.fire({
          title: "Do yo want to delete",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Delete!"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Succcess", "");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        });
    try {
      const response = await Axios.delete(`/admin/department/delete/${id}`);
      setDepartments(response.data);
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: error.response.data.message,
          icon: "error",
        })
    }
  }

  return (
    <>
        <div className="manageDepartments">
          <h1>Manage Departments</h1>

          <div className="addOrEditDiv">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                { user.role == "SUPER_ADMIN" && 
                <div>
                  {/* <input type="text" placeholder="faculty" name="faculty" {...register("faculty", {required:{
                    value: true,
                    message: "Faculty is required",
                  }})}/> */}
                  <select name="faculty" {...register("faculty", {required:{
                    value: true,
                    message: "Faculty is required",
                  }})}>
                    <option value="">Select Faculty</option>
                    {faculties?.map((faculty, index) => (
                    <option key={index} value={faculty.facultyName}>
                      {faculty.facultyName}
                    </option>
                  ))}
                  </select>
                  {errors.faculty && <span className="error">{errors.faculty.message}</span>}
                </div>
                }

                <div>
                  <input type="text" placeholder="department" name="name" {...register("name", {required:{
                    value: true,
                    message: "Department name is required",
                  }})}/>
                  {errors.name && <span className="error">{errors.name.message}</span>}
                </div>

                <div>
                  <input type="text" placeholder="alias" name="alias" {...register("alias", {required: {
                    value: true,
                    message: "Alias is required",
                  }})}/>
                  {errors.alias && <span className="error">{errors.alias.message}</span>}
                </div>
                <button className="bttn ashbtn">{ editDepartment? "Update": "Add Department"}</button>
              </div>
            </form>
          </div>

        <div className="tableCover">

        <table >
          <thead>
            <tr >
              <th>Faculty</th>
              <th>Department</th>
              <th>Alias</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              departments.map((department, index) => {
                return (
                  <tr key={index}>
                    <td>{department.facultyId}</td>
                    <td>{department.departmentName}</td>
                    <td>{department.alias}</td>
                    <td><button className="bttn ashbtn" onClick={() => {
                      handleUpdate(department);
                      window.scrollTo({top:0, behavior:"smooth"});
                    }}>edit</button></td>
                    <td><button className="bttn redbtn" onClick={() => handleDelete(department.id)}>delete</button></td>
                  </tr>
                  )
                  })
                }
          </tbody>
        </table>
                </div>
        </div>
    </>
  )
}

export default ManageDepartments