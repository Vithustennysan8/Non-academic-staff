import { useContext, useEffect, useState } from "react"
import "../../css/Admin/manageJobPosition.css"
import {LoginContext} from "../../Contexts/LoginContext.jsx"
import { useNavigate } from "react-router-dom"
import {Axios} from "../AxiosReqestBuilder.jsx"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"

const ManagePositions = () => {
  const [positions, setPositions] = useState([])
  const [editPosition, setEditPosition] = useState(null);
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
        const response = await Axios.get("/auth/user/jobPosition/get");
        setPositions(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFaculty();
  },[isLogin, navigate])

  const onSubmit = async (data) => {
    try {
      const response = editPosition ? await Axios.put(`/admin/jobPosition/update/${editPosition.id}`, data) : await Axios.post("/admin/jobPosition/add", data);
      console.log(response.data);
      setPositions(response.data);
      setEditPosition(null);
      Swal.fire({
        title: editPosition ? "Successfully updated" : "Successfully added",
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
    setEditPosition(faculty)
    setValue("name", faculty.jobPositionName);
    setValue("alias", faculty.alias);
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
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
      const response = await Axios.delete(`/admin/jobPosition/delete/${id}`);
      setPositions(response.data);
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
        <div className="managePositions">
          <h1>Manage positions</h1>

          <div className="addOrEditDiv">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                {/* <div>
                  <input type="text" placeholder="faculty" name="faculty" {...register("faculty")}/>
                </div> */}
                <div>
                  <input type="text" placeholder="jobPosition" name="name" {...register("name", {required:{
                    value: true,
                    message: "jobPosition name is required",
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
                <button className="bttn ashbtn">{ editPosition? "Update": "Add Position"}</button>
              </div>
            </form>
          </div>

        <table >
          <thead>
            <tr >
              <th>Position</th>
              <th>Alias</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              positions.map((position, index) => {
                return (
                  <tr key={index}>
                    <td>{position.jobPositionName}</td>
                    <td>{position.alias}</td>
                    <td><button className="bttn ashbtn" onClick={() => {
                      handleUpdate(position);
                      window.scrollTo({top:0, behavior:"smooth"});
                      }}>edit</button></td>
                    <td><button className="bttn redbtn" onClick={() => handleDelete(position.id)}>delete</button></td>
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

export default ManagePositions