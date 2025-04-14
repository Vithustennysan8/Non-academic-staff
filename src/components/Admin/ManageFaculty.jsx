import { useContext, useEffect, useState } from "react"
import "../../css/Admin/manageFaculty.css"
import {LoginContext} from "../../Contexts/LoginContext.jsx"
import { useNavigate } from "react-router-dom"
import {Axios} from "../AxiosReqestBuilder.jsx"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"

const ManageFaculties = () => {
  const [faculties, setFaculties] = useState([])
  const [editFaculty, setEditFaculty] = useState(null);
  const {isLogin} = useContext(LoginContext);  
  const navigate = useNavigate();
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
    fetchFaculty();
  },[isLogin, navigate])

  const onSubmit = async (data) => {
    try {
      const response = editFaculty ? await Axios.put(`/admin/faculty/update/${editFaculty.id}`, data) : await Axios.post("/admin/faculty/add", data);
      console.log(response.data);
      setFaculties(response.data);
      setEditFaculty(null);
      Swal.fire({
              title: editFaculty ? "Successfully updated" : "Successfully added",
              icon: "success",
            });
      reset();
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      })
    }
  }


  const handleUpdate = async (faculty) => {
    setEditFaculty(faculty)
    setValue("faculty", faculty.facultyId);
    setValue("name", faculty.facultyName);
    setValue("alias", faculty.alias);
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
      const response = await Axios.delete(`/admin/faculty/delete/${id}`);
      setFaculties(response.data);
      window.scrollTo({top:0, behavior:"smooth"});
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
        <div className="manageFaculties">
          <h1>Manage faculties</h1>

          <div className="addOrEditDiv">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                {/* <div>
                  <input type="text" placeholder="faculty" name="faculty" {...register("faculty")}/>
                </div> */}
                <div>
                  <input type="text" placeholder="faculty" name="name" {...register("name", {required:{
                    value: true,
                    message: "faculty name is required",
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
                <button className="bttn ashbtn">{ editFaculty? "Update": "Add Faculty"}</button>
              </div>
            </form>
          </div>

        <table >
          <thead>
            <tr >
              <th>Faculty</th>
              <th>Alias</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              faculties.map((faculty, index) => {
                return (
                  <tr key={index}>
                    <td>{faculty.facultyName}</td>
                    <td>{faculty.alias}</td>
                    <td><button className="bttn ashbtn" onClick={() => {
                      handleUpdate(faculty);
                      window.scrollTo({top:0, behavior:"smooth"});
                      }}>edit</button></td>
                    <td><button className="bttn redbtn" onClick={() => handleDelete(faculty.id)}>delete</button></td>
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

export default ManageFaculties