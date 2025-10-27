import { useEffect, useState } from "react"
import "../../css/Admin/manageJobPosition.css"
import { useAuth } from "../../Contexts/AuthContext.jsx"
import { useNavigate } from "react-router-dom"
import {Axios} from "../AxiosReqestBuilder.jsx"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ManagePositions = () => {
  const [positions, setPositions] = useState([])
  const [editPosition, setEditPosition] = useState(null);
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
        const response = await Axios.get("/auth/user/jobPosition/get");
        const positionsData = Array.isArray(response.data) ? response.data : [];
        setPositions(positionsData);
        setCurrentPage(1);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.log("Error fetching job positions", error);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }
    fetchFaculty();
  },[isLogin, navigate])

  const onSubmit = async (data) => {
    try {
      const response = editPosition ? await Axios.put(`/admin/jobPosition/update/${editPosition.id}`, data) : await Axios.post("/admin/jobPosition/add", data);
      const positionsData = Array.isArray(response.data) ? response.data : [];
      setPositions(positionsData);
      setCurrentPage(1);
      setEditPosition(null);
      toast.success(editPosition ? "Successfully updated" : "Successfully added");
      reset();
    } catch (error) {
      console.log("Error adding/updating job position", error);
    }
  }


  const handleUpdate = async (faculty) => {
    setEditPosition(faculty)
    setValue("name", faculty.jobPositionName);
    setValue("alias", faculty.alias);
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job position?")) {
      try {
        const response = await Axios.delete(`/admin/jobPosition/delete/${id}`);
        const positionsData = Array.isArray(response.data) ? response.data : [];
        setPositions(positionsData);
        setCurrentPage(1);
        toast.success("Job position deleted successfully!");
        window.scrollTo({top:0, behavior:"smooth"});
      } catch (error) {
        console.log("Error deleting job position", error);
      }
    }
  }

  // derived pagination values
  const safePositions = Array.isArray(positions) ? positions : [];
  const totalPages = pageSize === 0 ? 1 : Math.max(1, Math.ceil(safePositions.length / pageSize));
  if (currentPage > totalPages) setCurrentPage(totalPages);

  const displayedPositions = pageSize === 0 ? safePositions : (Array.isArray(safePositions) ? safePositions.slice((currentPage - 1) * pageSize, currentPage * pageSize) : []);

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
            {isLoading ? (
              <tr>
                <td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>
                  Loading job positions...
                </td>
              </tr>
            ) : (
              displayedPositions.length > 0 ? displayedPositions.map((position, index) => {
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
                }) : (
                  <tr>
                    <td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>
                      No job positions found
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
              <small>Showing {safePositions.length === 0 ? 0 : (pageSize === 0 ? 1 : ( (currentPage - 1) * pageSize + 1 ))} - {pageSize === 0 ? safePositions.length : Math.min(safePositions.length, currentPage * pageSize)} of {safePositions.length}</small>
            </div>
          </div>
        )}
        </div>
    </motion.div>
  )
}

export default ManagePositions