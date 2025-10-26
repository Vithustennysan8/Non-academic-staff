import { useEffect, useState } from "react"
import "../../css/Admin/manageDepartments.css"
import { useAuth } from "../../Contexts/AuthContext.jsx"
import { useNavigate } from "react-router-dom"
import {Axios} from "../AxiosReqestBuilder.jsx"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([])
  const [editDepartment, setEditDepartment] = useState(null);
  const {isLogin, user} = useAuth();
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState([]);

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
        setFaculties(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }

    const fetchDepartment = async () => {
      try {
        setIsLoading(true);
        const response = await Axios.get("/auth/user/department/get");
        const departmentsData = Array.isArray(response.data) ? response.data : [];
        setDepartments(departmentsData);
        setCurrentPage(1);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        console.log("Error fetching departments", error);
      }
    }
    fetchDepartment();
    fetchFaculty();
  },[isLogin, navigate])

  const onSubmit = async (data) => {
    try {
      const response = editDepartment ? await Axios.put(`/admin/department/update/${editDepartment.id}`, data) : await Axios.post("/admin/department/add", data);
      const departmentsData = Array.isArray(response.data) ? response.data : [];
      setDepartments(departmentsData);
      setCurrentPage(1);
      setEditDepartment(null);
      toast.success(editDepartment ? "Successfully updated" : "Successfully added");
      reset();
    } catch (error) {
      console.log("Error adding/updating department", error);
    }
  }


  const handleUpdate = async (department) => {
    setEditDepartment(department)
    setValue("faculty", department.facultyId);
    setValue("name", department.departmentName);
    setValue("alias", department.alias);
  }

  const handleDelete = async (id) => {
    if (window.confirm("Do you want to delete this department?")) {
      try {
        const response = await Axios.delete(`/admin/department/delete/${id}`);
        const departmentsData = Array.isArray(response.data) ? response.data : [];
        setDepartments(departmentsData);
        setCurrentPage(1);
        toast.success("Department deleted successfully!");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.log("Error deleting department", error);
      }
    }
  }

  // derived pagination values
  const safeDepartments = Array.isArray(departments) ? departments : [];
  const totalPages = pageSize === 0 ? 1 : Math.max(1, Math.ceil(safeDepartments.length / pageSize));
  if (currentPage > totalPages) setCurrentPage(totalPages);

  const displayedDepartments = pageSize === 0 ? safeDepartments : (Array.isArray(safeDepartments) ? safeDepartments.slice((currentPage - 1) * pageSize, currentPage * pageSize) : []);

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
            {isLoading ? (
              <tr>
                <td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>
                  Loading departments...
                </td>
              </tr>
            ) : (
              displayedDepartments.length > 0 ? displayedDepartments.map((department, index) => {
                return (
                  <tr key={index}>
                    <td>{faculties.find(faculty => faculty.id === department.facultyId)?.facultyName}</td>
                      <td>{department.departmentName}</td>
                      <td>{department.alias}</td>
                      <td><button className="bttn ashbtn" onClick={() => {
                        handleUpdate(department);
                        window.scrollTo({top:0, behavior:"smooth"});
                      }}>edit</button></td>
                      <td><button className="bttn redbtn" onClick={() => handleDelete(department.id)}>delete</button></td>
                    </tr>
                  )
                }) : (
                  <tr>
                    <td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>
                      No departments found
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
                </div>

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
                      <small>Showing {safeDepartments.length === 0 ? 0 : (pageSize === 0 ? 1 : ( (currentPage - 1) * pageSize + 1 ))} - {pageSize === 0 ? safeDepartments.length : Math.min(safeDepartments.length, currentPage * pageSize)} of {safeDepartments.length}</small>
                    </div>
                  </div>
                )}
        </div>
    </motion.div>
  )
}

export default ManageDepartments