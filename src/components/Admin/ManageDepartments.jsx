import { useContext, useEffect, useState } from "react"
import "../../css/Admin/manageDepartments.css"
import {LoginContext} from "../../Contexts/LoginContext.jsx"
import { useNavigate } from "react-router-dom"
import {Axios} from "../AxiosReqestBuilder.jsx"
import { useForm } from "react-hook-form"

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([])
  const [editDepartment, setEditDepartment] = useState(null);
  const {isLogin} = useContext(LoginContext);  
  const navigate = useNavigate();
  const {register, handleSubmit, formState:{errors}, reset, setValue} = useForm();

  useEffect(() => {
    if(!isLogin){
      window.scrollTo({top:0, behavior:"smooth"});
      navigate("/login");
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
  },[isLogin, navigate])

  const onSubmit = async (data) => {
    try {
      const response = editDepartment ? await Axios.put(`/admin/department/update/${editDepartment.id}`, data) : await Axios.post("/admin/department/add", data);
      console.log(response.data);
      setDepartments(response.data);
      setEditDepartment(null);
      reset();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  }


  const handleUpdate = async (department) => {
    setEditDepartment(department)
    setValue("faculty", department.facultyId);
    setValue("name", department.departmentName);
    setValue("alias", department.alias);
  }

  const handleDelete = async (id) => {
    confirm("Do yo want to delete");
    try {
      const response = await Axios.delete(`/admin/department/delete/${id}`);
      setDepartments(response.data);
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
    }
  }

  return (
    <>
        <div className="manageDepartments">
          <h1>Manage Departments</h1>

          <div className="addOrEditDiv">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input type="text" placeholder="faculty" name="faculty" {...register("faculty")}/>
                <input type="text" placeholder="department" name="name" {...register("name")}/>
                <input type="text" placeholder="alias" name="alias" {...register("alias")}/>
                <button className="bttn ashbtn">{ editDepartment? "Update": "Add Department"}</button>
              </div>
            </form>
          </div>

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
                    <td><button className="bttn ashbtn" onClick={() => handleUpdate(department)}>edit</button></td>
                    <td><button className="bttn redbtn" onClick={() => handleDelete(department.id)}>delete</button></td>
                  </tr>
                  )
                  })
            }
          </tbody>
        </table>
        </div>
    </>
  )
}

export default ManageDepartments