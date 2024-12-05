import { useContext, useEffect, useState } from "react";
import FormPreview from "../forms/FormPreview";
import "../../css/Notifications/requestedForms.css";
import FormReqTap from "./FormReqTap";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../Contexts/LoginContext";

const RequestedForms = ({ allLeaveFormRequests }) => {
  const navigate = useNavigate();
  const { isLogin } = useContext(LoginContext);
  const [filteredForms, setFilteredForms] = useState([]);  
  const [requestForm, setRequestForm] = useState({});
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(UserContext);
  const [filters, setFilters] = useState({
    status: "Pending",
    year:'',
    month:'',
    department:'',
    faculty:'',
    formType: '',
  });
  const [approver, setApprover] = useState(null);

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
  
  }, [navigate, isLogin, allLeaveFormRequests]);


  const faculties = [
    {
      faculty: "Faculty of Engineering",
      department:
        "Chemical and Process Engineering, Computer Engineering, Civil Engineering, Electrical and Electronic Engineering, Engineering Mathematics, Manufacturing and Industrial Engineering, Mechanical Engineering, Dean's Office",
    },
    {
      faculty: "Faculty of Science",
      department:
        "Botany, Chemistry, Environmental and Industrial Sciences, Geology, Statistics and Computer Science, Mathematics, Molecular Biology and Biotechnology, Physics, Zoology, Dean's Office",
    },
    {
      faculty: "Faculty of Arts",
      department:
        "Arabic and Islamic Civilization, Archaeology, Classical Languages, Economics and Statistics, Education, English, English Language Teaching, Fine Arts, Geography, History, Information Technology, Law, Philosophy, Psychology, Political Science, Pali and Buddhist Studies, Sinhala, Sociology, Tamil, Dean's Office",
    },
    {
      faculty: "Faculty of Medicine",
      department:
        "Anatomy, Anaesthesiology and Critical Care, Biochemistry, Community Medicine, Family Medicine, Forensic Medicine, Medical Education, Medicine, Microbiology, Obstetrics and Gynaecology, Paediatrics, Parasitology, Pathology, Pharmacology, Physiology, Psychiatry, Radiology, Surgery, Dean's Office",
    },
    {
      faculty: "Faculty of Veterinary Medicine and Animal Science",
      department:
        "Basic Veterinary Sciences, Veterinary Clinical Sciences, Farm Animal Production and Health, Veterinary Pathobiology, Veterinary Public Health and Pharmacology, Dean's Office",
    },
    {
      faculty: "Faculty of Agriculture",
      department:
        "Agricultural Biology, Agricultural Economics and Business Management, Agricultural Engineering, Agricultural Extension, Animal Science, Crop Science, Food Science and Technology, Soil Science, Dean's Office",
    },
    {
      faculty: "Faculty of Allied Health Sciences",
      department:
        "Medical Laboratory Sciences, Nursing, Pharmacy, Physiotherapy, Radiography and Radiotherapy, Basic Sciences, Dean's Office",
    },
    {
      faculty: "Faculty of Dental Sciences",
      department:
        "Basic Sciences, Community Dental Health, Comprehensive Oral Health Care, Oral Medicine and Periodontology, Oral Pathology, Prosthetic Dentistry, Restorative Dentistry, Oral and Maxillofacial Surgery, Dean's Office",
    },
    {
      faculty: "Faculty of Management",
      department:
        "Business Finance, Human Resource Management, Management Studies, Marketing Management, Operations Management",
    },
    { faculty: "Registrar's Office", department: "Administrative Section" },
    { faculty: "Administration Office", department: "Administrative Section" },
    { faculty: "IT Services", department: "Technical Section" },
    { faculty: "Library Services", department: "Library Section" },
    { faculty: "Facilities Management", department: "Maintenance Section" },
    { faculty: "Security Services", department: "Security Section" },
    { faculty: "Finance Department", department: "Finance Section" },
    { faculty: "Human Resources Department", department: "HR Section" },
    {
      faculty: "Student Affairs Office",
      department: "Student Affairs Section",
    },
  ];

  const departments = faculties.find((faculty) => faculty.faculty === filters.faculty)
      ?.department.split(", ") || [];


  const handleSingleForm = (id, formType) => {
    setRequestForm(allLeaveFormRequests.find((form) => 
      form.id === id && form.formType === formType)
    );
    setShowForm(true);
  };

  const handleForm = (e)=>{
    e.preventDefault();
    setFilters({...filters, [e.target.name]: e.target.value });
  }

  const handleFilterChange = (e) => {
    e.preventDefault();
    console.log(filters);
    
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

  return (
    <>
      <div className="RequestedForms">
        <h1>Requested Leave Forms</h1>

        <form>
        <div className="allLeaveRequest-btn">
            <div className="selection-area">
              {(user.job_type !== "Head of the Department") && (
                <>
                <div>
                  <select name="faculty" id="faculty" value={filters.faculty} onChange={e=>handleForm(e)}>
                    <option value="">Faculty</option>
                    {faculties.map((faculty, index) => (
                      <option key={index} value={faculty.faculty}>
                        {faculty.faculty}
                      </option>
                    ))}
                  </select>
                </div>
                      
                <div>
                  <select id="department" name="department" onChange={e=>handleForm(e)} >
                    <option value="">Department</option>
                    {departments.map((department, index) => (
                      <option key={index} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <select name="formType" value={filters.formType} onChange={e=>handleForm(e)}>
                    <option value="">Form type</option>
                    <option value="Normal Leave Form">Normal Leave</option>
                    <option value="Accident Leave Form">Accident Leave</option>
                    <option value="Medical Leave Form">Medical Leave</option>
                    <option value="Maternity Leave Form">Maternity Leave</option>
                    <option value="Paternal Leave Form">Paternal Leave</option>
                  </select>
                </div>
                </>
                )}
            </div>

            <div className="selection-area">
                <select value={filters.status} name="status" onChange={e=>handleForm(e)}>
                  <option value="pending">Pending</option>
                  <option value="All">All</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <input type="number" name="year" value={filters.year} onChange={e=>handleForm(e)} placeholder="Year"/>
                <select name="month" value={filters.month} onChange={e=>handleForm(e)}>
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
        </form>

        {/* All leave Notifications */}
        {!showForm && (
          <div className="allNotifications">
            <h2 className="formFilterType">{filters.status} Requests</h2>
            
            {filteredForms<1 ? <p className="empty">No forms match the selected filter!</p> :
            filteredForms.map((form, index) => (
              <div key={index}>
              <FormReqTap form={form} handleSingleForm={()=>handleSingleForm(form.id, form.formType)}/>
              </div>
            ))}
          </div>
        )}
        {showForm && (
          <FormPreview application={requestForm} approver={user} setForm={setRequestForm}/>
        )}
      </div>
    </>
  );
};

export default RequestedForms;
