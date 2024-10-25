import { useContext, useEffect, useState } from 'react';
import "../../../css/Profile_page/Dashboard/adminDashboard.css"
import { Axios } from '../../AxiosReqestBuilder';
import { LoginContext } from '../../../Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import NormalLeaveFormTemplate from '../../notifications/NormalLeaveFormTemplate';
import OtherLeaveFormsTemplate from '../../notifications/OtherLeaveFormsTemplate';

const AdminDashboard = () => {
    const {isLogin} = useContext(LoginContext);
    const navigate = useNavigate();
    const [searchName, setSearchName] = useState('');
    const [searchedEmpId, setSearchedEmpId] = useState('');
    const [selectedFaculty, setSelectedFaculty] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [selectedFormType, setSelectedFormType] = useState('');
    const [selectedFormStatus, setSelectedFormStatus] = useState('');
    const [selectedDate, setSelectedDate] = useState("")
    const [forms, setForms] = useState([]);
    const [form, setForm] = useState("");
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if(!isLogin){
            window.scrollTo({top:0, behavior:"smooth"})
            navigate("/Login");
        }
    },[navigate, isLogin])


    useEffect(() => {
        const fetchFomrs = async () => {
            try {
                const response = await Axios.get("/admin/leaveForms/getAllForms");
                console.log(response.data)
                setForms(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchFomrs();
    },[])


    const filteredForms = forms.filter(form => {
        const matchesSearchName = form.user.first_name.toLowerCase().includes(searchName.toLowerCase());
        const matchesSearchedEmpId = form.user.emp_id.toLowerCase().includes(searchedEmpId.toLowerCase());
        const matchesFaculty = selectedFaculty ? form.user.faculty === selectedFaculty : true;
        const matchesDept = selectedDept ? form.user.department === selectedDept : true;
        const matchesFormType = selectedFormType ? form.formType === selectedFormType : true;
        const matchesFormStatus = selectedFormStatus ? form.status === selectedFormStatus : true;
        const matchesDate = selectedDate ? form.createdAt?.substring(0,10) === selectedDate : true;

        return matchesSearchName && matchesSearchedEmpId && matchesFaculty && matchesDept && matchesFormType && matchesFormStatus && matchesDate;
    });


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
    
      const departments = faculties.find((faculty) => faculty.faculty === selectedFaculty)?.department.split(", ") || [];

      const handleForm = (index) => {
        filteredForms.map((_form, _index) => {
            if (index === _index) {
                setForm(_form);
                setShowForm(true);
        }})
      }

    return (
        <>
        <div className="adminDashboard-container">
        <h3>Summary</h3>
        <div className="adminDashboard-table-container">
            <table>
                <thead>
                    <tr>
                        <td>
                            <input type="text" placeholder="Search by Name..." value={searchName} onChange={(e) => setSearchName(e.target.value)}
                            />
                        </td>
                        <td>
                            <input type="text" value={searchedEmpId} onChange={(e) => setSearchedEmpId(e.target.value)} placeholder='Search by EmpId'/>
                        </td>
                        <td>
                            <select value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)} >
                                <option value="">Select Faculty</option>
                                {faculties.map(faculty => {
                                    return <option key={faculty.faculty} value={faculty.faculty}>{faculty.faculty}</option>
                                })}
                            </select>
                        </td>
                        <td>
                            <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                                <option value="">Select Department</option>
                                {departments.map(department => {
                                    return <option key={department} value={department}>{department}</option>
                                })}
                            </select>
                        </td>
                        <td>
                            <select value={selectedFormType} onChange={(e) => setSelectedFormType(e.target.value)}>
                                <option value="">Select Form Type</option>
                                <option value="Normal Leave Form">Normal Leave</option>
                                <option value="Accident Leave Form">Accident Leave</option>
                                <option value="Medical Leave Form">Medical Leave</option>
                                <option value="Maternity Leave Form">Maternity Leave</option>
                                <option value="Paternal Leave Form">Paternal Leave</option>
                            </select>
                        </td>
                        <td>
                            <select value={selectedFormStatus} onChange={(e) => setSelectedFormStatus(e.target.value)}>
                            <option value="">Select Form Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                            </select>
                        </td>
                        {/* <td>
                            <input type="text" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value.substring(0,10))} placeholder='Select Date'/>
                        </td> */}
                        
                        </tr>
                        <tr>
                            <th>NAME</th>
                            <th>EMP_ID</th>
                            <th>FACULTY</th>
                            <th>DEPARTMENT</th>
                            <th>FORM TYPE</th>
                            <th>FORM STATUS</th>
                            <th>REQUEST DATE</th>
                            {/* <th>DAYS LEAVE</th> */}
                    </tr>
                </thead>
                <tbody>
                    {filteredForms.map((form, index) => (
                    <tr key={index} onClick={()=>handleForm(index)}>
                        <td>{form.user.first_name}</td>
                        <td>{form.user.emp_id}</td>
                        <td>{form.user.faculty}</td>
                        <td>{form.user.department}</td>
                        <td>{form.formType}</td>
                        <td>{form.status}</td>
                        <td>{form.leaveAt?.substring(0,10)}</td>
                        {/* <td>{form.leaveDays}</td> */}
                    </tr>
                    ))}
                </tbody>
            </table>
            
            {showForm && <>
            <div className='floatWindowForSummary'>{form.formType === "Normal Leave Form" ? <NormalLeaveFormTemplate application={form}/>:
             <OtherLeaveFormsTemplate application={form}/>}</div>
            <div className='darkScreenEffect'>
                <button className='cancel' onClick={() => setShowForm(false)}><img src="https://cdn-icons-png.flaticon.com/128/8367/8367505.png" alt="cancel" /></button>
            </div>
             </> }

        </div>
        </div>
    </>
  )
}

export default AdminDashboard