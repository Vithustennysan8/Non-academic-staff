import { useContext, useEffect, useState } from "react";
import FormPreview from "../forms/FormPreview";
import "../../css/Notifications/notifications-content.css";
import FormReqTap from "./FormReqTap";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Axios } from "../AxiosReqestBuilder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faFilter, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const RequestedForms = ({ allLeaveFormRequests }) => {
  const navigate = useNavigate();
  const { isLogin, user } = useAuth();
  const [filteredForms, setFilteredForms] = useState([]);  
  const [requestForm, setRequestForm] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    status: "pending",
    year:'',
    month:'',
    department:'',
    faculty:'',
    formType: '',
  });
  const [approver, setApprover] = useState(null);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(()=>{
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
        const response = await Axios.get("/auth/user/department/getAll");
        setDepartments(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFaculty();
    fetchDepartment();
  },[])

  useEffect(() => {
    if (!isLogin) {
      window.scrollTo({top:0, behavior:"smooth"});
      navigate("/login");
    }
    switch(user.job_type){
      case 'Head of the Department':
        setFilteredForms(allLeaveFormRequests.filter((form)=> form.headStatus === "pending"))
        break;
        case 'Dean':  
        setFilteredForms(allLeaveFormRequests.filter((form)=> form.deanStatus === "pending"))
        break;
        case 'Chief Medical Officer':
        setFilteredForms(allLeaveFormRequests.filter((form)=> form.cmoStatus === "pending"))
        break;
        case 'Non Academic Establishment Division':
        setFilteredForms(allLeaveFormRequests.filter((form)=> form.naeStatus === "pending"))
        break;
        case 'Registrar':
        setFilteredForms(allLeaveFormRequests.filter((form)=> form.registrarStatus === "pending"))
        break;
    }
    setCurrentPage(1); // Reset to first page when data changes
  }, [navigate, isLogin, allLeaveFormRequests, user.job_type]);




  const handleSingleForm = (id, formType) => {
    setRequestForm(allLeaveFormRequests.find((form) => 
      form.id === id && form.formType === formType)
    );
    setShowForm(true);
  };

  const handleForm = (e)=>{
    e.preventDefault();
    console.log(e.target.name)
    if(e.target.name == "faculty"){
      const faculty = faculties.filter(faculty => faculty.id == e.target.value)[0];
      setFilters({...filters, [e.target.name]: faculty.facultyName });
    }else{
      setFilters({...filters, [e.target.name]: e.target.value });
    }
  }

  const handleFilterChange = (e) => {
    e.preventDefault();
    console.log(filters);
    setCurrentPage(1); // Reset to first page after filtering
    
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    setShowForm(null); // Reset the form preview when changing the filter
    let filterForms = allLeaveFormRequests;

     // Apply filters dynamically
    if (filters.year && filters.year.length === 4) {
      filterForms = filterForms.filter((form) => form.createdAt.startsWith(filters.year));
    }
    
    if (filters.month) {
      filterForms = filterForms.filter(
        (form) => monthNames[parseInt(form.createdAt.substring(5, 7), 10) - 1] === filters.month);
    }

    if (filters.faculty) {
      filterForms = filterForms.filter((form) => form.user.faculty === filters.faculty);
    }
    
    if (filters.formType) {
      filterForms = filterForms.filter((form) => form.formType === filters.formType);
    }

    if (filters.department) {
      filterForms = filterForms.filter((form) => form.user.department === filters.department);
    }

    if (filters.status !== "All") {
      switch(user.job_type){
        case 'Head of the Department':
          filterForms = filterForms.filter((form) => form.headStatus === filters.status);
          break;
        case 'Dean':  
          filterForms = filterForms.filter((form) => form.deanStatus === filters.status);
          break;
        case 'Chief Medical Officer':
          filterForms = filterForms.filter((form) => form.cmoStatus === filters.status);
          break;
        case 'Non Academic Establishment Division':
          filterForms = filterForms.filter((form) => form.naeStatus === filters.status);
          break;
        case 'Registrar':
          filterForms = filterForms.filter((form) => form.registrarStatus === filters.status);
          break;
      }
    }

    setFilteredForms(filterForms);
  };

    // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredForms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredForms.length / itemsPerPage);

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };  

  return (
    <>
      <div className="RequestedForms">
        <div className="content-header">
          <h2>Requested Leave Forms</h2>
          <div className="count-badge">
            <FontAwesomeIcon icon={faFileAlt} />
            {filteredForms.length} Forms
          </div>
        </div>

        <form className="filter-container">
          <div className="filter-group">
              {(user.job_type !== "Head of the Department") && (
                <>
                  <select className="modern-select" name="faculty" id="faculty" onChange={e=>{
                    handleForm(e);
                    setSelectedFaculty(e.target.value);
                    }}>
                    <option value="">Faculty</option>
                    {faculties?.map((faculty, index) => (
                      <option key={index} value={faculty.id}>
                        {faculty.facultyName}
                      </option>
                    ))}
                  </select>
                      
                  <select className="modern-select" id="department" name="department" onChange={e=>handleForm(e)} >
                    <option value="">Department</option>
                    {departments.filter((department) => selectedFaculty == department.facultyId).map((department, index) => (
                    <option key={index} value={department.departmentName}>
                      {department.departmentName}
                    </option>
                    ))}
                  </select>
                </>
                )}
            
                <select className="modern-select" value={filters.status} name="status" onChange={e=>handleForm(e)}>
                  <option value="pending">Pending</option>
                  <option value="All">All</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <input className="modern-input" type="number" name="year" value={filters.year} onChange={e=>handleForm(e)} placeholder="Year"/>
                <select className="modern-select" name="month" value={filters.month} onChange={e=>handleForm(e)}>
                    <option value="">Month</option>
                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
              </div>
              <button className="filter-btn" onClick={handleFilterChange}>
                <FontAwesomeIcon icon={faFilter} style={{marginRight: '8px'}}/>
                Filter
              </button>
        </form>

        {/* All leave Notifications */}
        {!showForm && (
          <div className="allNotifications">
            
            {filteredForms.length < 1 ? 
              <div className="empty-state">
                <FontAwesomeIcon icon={faFileAlt} size="3x" style={{marginBottom: '20px', opacity: 0.5}}/>
                <p>No forms match the selected filter!</p>
              </div>
             :
             <>
               <div className="cards-grid">
                 {currentItems.map((form, index) => (
                   <div key={index}>
                     <FormReqTap form={form} handleSingleForm={()=>handleSingleForm(form.id, form.formType)}/>
                   </div>
                 ))}
               </div>

               {/* Pagination Controls */}
               {(
                 <div className="pagination-container">
                   <button
                     className="pagination-btn"
                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                     disabled={currentPage === 1}
                   >
                     <FontAwesomeIcon icon={faChevronLeft} />
                     Previous
                   </button>

                   <div className="pagination-info">
                     Page {currentPage} of {totalPages}
                   </div>

                   <button
                     className="pagination-btn"
                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                     disabled={currentPage === totalPages}
                   >
                     Next
                     <FontAwesomeIcon icon={faChevronRight} />
                   </button>

                   <div className="items-per-page">
                     <label htmlFor="itemsPerPage" className="itemsPerPage">Items per page:</label>
                     <select 
                       id="itemsPerPage"
                       value={itemsPerPage} 
                       onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                       className="items-per-page-select"
                     >
                       <option value={5}>5</option>
                       <option value={10}>10</option>
                       <option value={20}>20</option>
                       <option value={50}>50</option>
                     </select>
                   </div>
                 </div>
               )}
             </>
            }
          </div>
        )}
        {showForm && (
          <FormPreview application={requestForm} approver={user} setForm={setRequestForm} setShowForm={setShowForm}/>
        )}
      </div>
    </>
  );
};

export default RequestedForms;
