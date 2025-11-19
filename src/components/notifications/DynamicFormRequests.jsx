import { useEffect, useState } from "react";
import "../../css/Notifications/dynamicFormRequests.css"
import FormReqTap from "./FormReqTap";
import { useAuth } from "../../Contexts/AuthContext";
import { Axios } from "../AxiosReqestBuilder";
import { toast } from "react-toastify";
import LoadingAnimation from "../Common/LoadingAnimation";
import acceptLogo from "../../assets/accept.png";
import rejectLogo from "../../assets/cancel.png";
import deleteLogo from "../../assets/delete.png";

const DynamicFormRequests = ({dynamicFormRequests, setDynamicFormRequests}) => {
  const {user} = useAuth();
  const [showSingleForm, setShowSingleForm] = useState(false);
  const [selectedForm, setSelectedForm] = useState([]);
  const [filterMonth, setFilterMonth] = useState();
  const [filterYear, setFilterYear] = useState('');
  const [filter, setFilter] = useState("Pending");
  const [filterForms, setFilterForms] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [filters, setFilters] = useState({
    status: "Pending",
    year:'',
    month:'',
    department:'',
    faculty:'',
    formType: '',
  });
  const [description, setDescription] = useState('');
  const [dynamicForms, setDynamicForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  
  useEffect(()=>{
      setFilterForms(dynamicFormRequests.filter((form)=> form.approverDetails.filter(approver => approver.approver == user.job_type)[0].approverStatus === filter));
  },[dynamicFormRequests, user.job_type, filter])


  const handleSingleForm = (form) => {
      setShowSingleForm(true);
      setSelectedForm(form)
  }

  const handleFormType = async () => {
    if(filters.faculty == ''){
      toast.error("Select the faculty");
      return;
    }
    if(filters.department == ''){
      toast.error("Select the department");
      return;
    }

    try {
      const response = await Axios.get(`/admin/dynamicForm/getAll/${filters.department}/${filters.faculty}`);
      if(response.data == 0){
      toast.error("There is no forms!!!");
      }
      setDynamicForms(response.data);
    } catch (error) {
      console.log("Error fetching dynamic forms", error);
    }
  }

  const handleForm = (e)=>{
    e.preventDefault();
    if(e.target.name == "faculty"){
      const faculty = faculties.filter(faculty => faculty.id == e.target.value)[0];
      setFilters({...filters, [e.target.name]: faculty.facultyName });
    }else{
      setFilters({...filters, [e.target.name]: e.target.value });
    }
  }

  const handleFilterChange = () => {
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      setShowSingleForm(false); // Reset the form preview when changing the filter
      let filteredForms = dynamicFormRequests;
  
      if(filterYear !== '' && filterYear?.length !== 4){
          toast.warning("Please select a valid year");
        return;
      }

      if (filters.faculty) {
        filteredForms = filteredForms.filter((form) => form.faculty === filters.faculty);
      }
      
      if (filters.formType) {
        filteredForms = filteredForms.filter((form) => form.form === filters.formType);
      }
  
      if (filters.department) {
        filteredForms = filteredForms.filter((form) => form.department === filters.department);
      }
  
      if(filterYear){
        filteredForms = filteredForms.filter((form)=> form.formCreatedAt.substring(0,4) === filterYear);
      }
      if(filterMonth){
        filteredForms = filteredForms.filter((form)=> monthNames[form.formCreatedAt.substring(5,7)-1] === filterMonth);
      }
      if(filter !== "All"){
        filteredForms = filteredForms.filter((form)=> form.approverDetails.filter(approver => approver.approver == user.job_type)[0].approverStatus === filter);
      }
      setFilterForms(filteredForms);
    };

    const handleAccept = async (formId) => {
      setIsLoading(true);
      const id = selectedForm.approverDetails.filter((approver) => approver.approver === user.job_type)[0].id;
      if(description==''){
          toast.warning("Please enter a description for the form");
        return;
      }

      try {
        const response = await Axios.post(`admin/formApprover/accept/${id}`, {"formId":formId, "description":description, "userId":user.id});
        setSelectedForm(response.data[0]);
        setDynamicFormRequests([...dynamicFormRequests.filter(request => request.formId != formId), response.data[0]]);
        setIsLoading(false);
          toast.success("Accepted");
        setDescription('');
      } catch (error) {
        console.log("Error accepting form", error);
        setIsLoading(false);
      }
    }
    
    const handleReject = async (formId) => {
      setIsLoading(true);
      const id = selectedForm.approverDetails.filter((approver) => approver.approver === user.job_type)[0].id;
      if(description==''){
        toast.warning("Please enter a description for the form");
        return;
      }
      
      try {
        const response = await Axios.post(`admin/formApprover/reject/${id}`, {"formId":formId, "description":description, "userId":user.id});
        setSelectedForm(response.data[0]);
        setDynamicFormRequests([...dynamicFormRequests.filter(request => request.formId != formId), response.data[0]]);
        setIsLoading(false);
        toast.success("Rejected");
        setDescription('');
      } catch (error) {
        console.log("Error rejecting form", error.message);
        setIsLoading(false);
      }
    }

    const handleGetPdf = async (id) => {
      try {
        const response = await Axios.get(`/user/DynamicFormUser/getPdf/${id}`, {
          responseType: "blob", // Important: Treat response as binary
        });
    
        // Create a URL for the blob data
        const fileURL = window.URL.createObjectURL(response.data);
        
        // Open in a new tab
        window.open(fileURL);
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    };

    const handleDelete = async (formId) => {
      if(!window.confirm("Do you want to delete this form?")) return;
      try {
          const response = await Axios.delete(`/admin/DynamicFormUser/${formId}`);
          console.log(response.data);
          toast.success("Form deleted successfully");
          window.location.reload();
      }catch(error){
          console.log("Error deleting form", error.message);
      }
    };

return (
  <div className="dynamicFormRequests">
      {isLoading && <LoadingAnimation/>}
      <h2>Requested Dynamic Forms</h2>


      <div className="leaveFilterTaps">

        <div className="taps">
          {(user.job_type !== "Head of the Department") && (
              <>
                <select name="faculty" id="faculty" onChange={e=>{
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
                    
                <select id="department" name="department" onChange={e=>handleForm(e)} >
                  <option value="">Department</option>
                  {departments.filter((department) => selectedFaculty == department.facultyId).map((department, index) => (
                  <option key={index} value={department.departmentName}>
                    {department.departmentName}
                  </option>
                  ))}
                </select>

                <select name="formType" value={filters.formType} onClick={handleFormType} onChange={e=>handleForm(e)}>
                  <option value="">Form type</option>
                  {
                    dynamicForms.map((form, index) => (
                      <option key={index} value={form.formType}>{form.formType}</option>
                    ))
                  }
                </select>
              </>
              )}
            </div>

          <div className="taps">
            <select value={filter} onChange={e=>setFilter(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="All">All</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>

            <input type="number" value={filterYear} onChange={e=>setFilterYear(e.target.value)} placeholder="Year"/>
            <select name="month" value={filterMonth} onChange={(e)=>setFilterMonth(e.target.value)}>
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
          <button className="bttn ashbtn" onClick={handleFilterChange}>Filter</button>
        </div>

        <h3 className="formFilterType">{filter} Forms</h3>

        <div className="formCount">
              <span className="file-icon" title="Forms">
                <svg width="18" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#0051ddff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2v6h6" stroke="#005effff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 13h8M8 17h8" stroke="#0052e1ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              {filterForms.length}
        </div>

        {filterForms.length < 1 ? <p className="empty">No forms match the selected filter!</p> :
          (
          showSingleForm === true ? 
          <div className="singleForm">
              <h4 className="formHeading">{selectedForm.form}</h4>
              <button className="deleteBtn" onClick={() => handleDelete(selectedForm.formId)}><img src={deleteLogo} alt="DeleteIcon" /></button>
              {
                  selectedForm.formDetails.map((field, index) => {
                      const [key, value] = Object.entries(field)[0];
                      return (
                          <div key={index} className="wrapper">
                              <p>{key}</p>
                              <p>: {value}</p>
                          </div>
                      )
                  })
              }

              {/* display the pdf */}
              <div className="wrapper">
                  <p>Document :</p>
                  <p onClick={() => handleGetPdf(selectedForm.formId)} className="pdf">click here</p>
              </div>

              <div className="devider wrapper">
                <p>Status :</p>
                <p className={`${selectedForm.formStatus === "Rejected" && 'status-rejected'} ${selectedForm.formStatus === "Accepted" && 'status-approved'} ${selectedForm.formStatus === "Pending" && 'status-pending'}`}>{selectedForm.formStatus}</p>
              </div>

              {
                selectedForm.approverDetails.map((approver)=>{
                  return(
                    <>
                    <div key={approver.approverOrder} className="wrapper">
                      <p>{approver.approver}</p>
                      <p>: {approver.approverStatus}</p>
                    </div>
                    {
                      approver.approvalDescription &&
                    <div key={approver.approverOrder} className="wrapper">
                      <p>description</p>
                      <p>: {approver.approvalDescription}</p>
                    </div>
                    }
                    </>
                  )
                })
              }
              {
                selectedForm.approverDetails.filter((approver) => approver.approver === user.job_type)
                .map((approver) =>{
                  return(
                    approver.approverStatus === "Pending" &&
                    <div className="review-row description" key={approver.approverOrder}>
                      <label htmlFor="description" className="review-label">Description: </label>
                      <textarea name="description" id="description" className="review-value" rows={3} cols={40} value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                  )
                })
              }
              
              <div className="buttonDiv">
                {  selectedForm.approverDetails.filter((approver) => approver.approver === user.job_type)[0].approverStatus === "Pending" && user.role === "ADMIN" &&
                    <>
                    <button onClick={() => handleAccept(selectedForm.formId)} className=""><img src={acceptLogo} alt="" /></button>
                    <button onClick={() => handleReject(selectedForm.formId)} className=""><img src={rejectLogo} alt="" /></button>
                    </>
                }
                {/* <button onClick={generatePDF} className=""><img src="https://cdn-icons-png.flaticon.com/128/4208/4208397.png" alt="" /></button> */}
              </div>
          </div> :

          <div className="">
              { filterForms.map((form, index) => (
                  <FormReqTap key={index} form={form} handleSingleForm={() => handleSingleForm(form) }/>
              ))}
          </div>
      )}
  </div>
)
}

export default DynamicFormRequests