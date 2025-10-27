import { useEffect, useState } from "react"
import "../../css/Admin/manageFaculty.css"
import { useAuth } from "../../Contexts/AuthContext.jsx"
import { useNavigate } from "react-router-dom"
import {Axios} from "../AxiosReqestBuilder.jsx"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ManageFaculties = () => {
  const [faculties, setFaculties] = useState([])
  const [editFaculty, setEditFaculty] = useState(null);
  const {isLogin} = useAuth();  
  const navigate = useNavigate();

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // 0 = show all
  const [isLoading, setIsLoading] = useState(true);
  const {register, handleSubmit, formState:{errors}, reset, setValue} = useForm();

  useEffect(() => {
    if(!isLogin){
      window.scrollTo({top:0, behavior:"smooth"});
      navigate("/login");
    }

    const fetchFaculty = async () => {
      try {
        setIsLoading(true);
        const response = await Axios.get("/auth/user/faculty/getAll");
        const facultiesData = Array.isArray(response.data) ? response.data : [];
        setFaculties(facultiesData);
        setCurrentPage(1);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.log("Error fetching faculties", error);
      }
    }
    fetchFaculty();
  },[isLogin, navigate])

  const onSubmit = async (data) => {
    try {
      const response = editFaculty ? await Axios.put(`/admin/faculty/update/${editFaculty.id}`, data) : await Axios.post("/admin/faculty/add", data);
      const facultiesData = Array.isArray(response.data) ? response.data : [];
      setFaculties(facultiesData);
      setCurrentPage(1);
      setEditFaculty(null);
      toast.success(editFaculty ? "Successfully updated" : "Successfully added");
      reset();
    } catch (error) {
      console.log("Error adding/updating faculty", error);
    }
  }


  const handleUpdate = async (faculty) => {
    setEditFaculty(faculty)
    setValue("faculty", faculty.facultyId);
    setValue("name", faculty.facultyName);
    setValue("alias", faculty.alias);
  }

  const handleDelete = async (id) => {
    if (window.confirm("Do you want to delete this faculty?")) {
      try {
        setIsLoading(true);
        const response = await Axios.delete(`/admin/faculty/delete/${id}`);
        const facultiesData = Array.isArray(response.data) ? response.data : [];
        setFaculties(facultiesData);
        setCurrentPage(1);
        toast.success("Faculty deleted successfully!");
        window.scrollTo({top:0, behavior:"smooth"});
      } catch (error) {
        console.log("Error deleting faculty", error);
      }
    }
  }

  // derived pagination values
  const safeFaculties = Array.isArray(faculties) ? faculties : [];
  const totalPages = pageSize === 0 ? 1 : Math.max(1, Math.ceil(safeFaculties.length / pageSize));
  if (currentPage > totalPages) setCurrentPage(totalPages);

  const displayedFaculties = pageSize === 0 ? safeFaculties : (Array.isArray(safeFaculties) ? safeFaculties.slice((currentPage - 1) * pageSize, currentPage * pageSize) : []);

  if(isLoading){
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }
  return (
    <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -20 }} 
    transition={{ duration: 0.6 }}
  >
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
            {isLoading ? (
              <tr>
                <td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>
                  Loading faculties...
                </td>
              </tr>
            ) : (
              displayedFaculties.length > 0 ? displayedFaculties.map((faculty, index) => {
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
                  }) : (
                    <tr>
                      <td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>
                        No faculties found
                      </td>
                    </tr>
                  )
                )}
          </tbody>
        </table>

        {/* pagination controls */}
        {!isLoading && (
          <div className="pagination">
            <div>
              <label>Page size:</label>
              <select value={pageSize} onChange={(e)=>{ setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={0}>All</option>
              </select>
            </div>

            <div>
              <button type="button" onClick={()=>setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1}>Prev</button>
              {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
                <button key={p} type="button" className={p === currentPage ? 'ashbtn' : ''} onClick={()=>setCurrentPage(p)}>{p}</button>
              ))}
              <button type="button" onClick={()=>setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages}>Next</button>
            </div>

            <div>
              <small>Showing {safeFaculties.length === 0 ? 0 : (pageSize === 0 ? 1 : ( (currentPage - 1) * pageSize + 1 ))} - {pageSize === 0 ? safeFaculties.length : Math.min(safeFaculties.length, currentPage * pageSize)} of {safeFaculties.length}</small>
            </div>
          </div>
        )}
        </div>
    </motion.div>
  )
}

export default ManageFaculties