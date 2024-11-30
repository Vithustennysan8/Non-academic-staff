import { useContext, useEffect, useMemo, useState } from 'react';
import "../../../css/Profile_page/Dashboard/adminDashboard.css"
import { Axios } from '../../AxiosReqestBuilder';
import { LoginContext } from '../../../Contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import NormalLeaveFormTemplate from '../../notifications/NormalLeaveFormTemplate';
import OtherLeaveFormsTemplate from '../../notifications/OtherLeaveFormsTemplate';
import LoadingAnimation from '../../Common/LoadingAnimation';
import { UserContext } from '../../../Contexts/UserContext';
import UserDashboard from "./UserDashboard";
import StaffCard from '../../Staff_page/StaffCard';
import { CSVLink } from 'react-csv';
import DeanCharts from '../DeanCharts';

const AdminDashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
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
    const {user} = useContext(UserContext);
    const [staffs, setStaffs] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [dataCollection, setDataCollection] = useState([]);
    const [details, setDetails] = useState({
        name:"",
        employeeId:'',
        year:"",
        month:'',
        leaveDays:''
    })
    const monthsName = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

      useEffect(() => {
        if(!isLogin){
            window.scrollTo({top:0, behavior:"smooth"})
            navigate("/Login");
        }
    },[navigate, isLogin])
    
    useEffect(()=>{
        const handleFormDetails = () => {
            let arrayMap = new Map();
            forms.map((form)=>{
                const userId = form.user.id;
                const name = form.user.first_name;
                const leaveDays = form.leaveDays;
                const year = form.leaveAt?.substring(0,4);
                const month = form.leaveAt?.substring(5,7); 
    
                if(arrayMap.has(userId)){
    
                    let userLeaveData = arrayMap.get(userId);
                    let flag = false;
                    userLeaveData.forEach((item)=>{
                        if(item.year === year && item.month === monthsName[month-1]){
                            item.leaveDays += leaveDays;
                            item.nopay = item.leaveDays>2?item.leaveDays-2:0;
                            flag = true;
                        }
                    })
                    if(!flag){
                        arrayMap.get(userId).push({userId:userId, name:name, year: year, month: monthsName[month-1], leaveDays: leaveDays, nopay: leaveDays>2?leaveDays-2:0});
                    }
    
                }else{
                    arrayMap.set(userId, [{userId:userId, name:name, year: year, month: monthsName[month-1], leaveDays: leaveDays, nopay: leaveDays>2?leaveDays-2:0}]);
                }
            })
    
            // console.log(arrayMap);
            const array = [];
            arrayMap.forEach((value)=>{
                array.push(...value);
            })
            setDataCollection(array);
          }
        if(forms.length>0){
            handleFormDetails();
        }
    },[forms])


    
    useEffect(() => {
        setTimeout(() => {
            const fetchStaffs = async ()=>{
                try {
                    const response = await Axios.get("/auth/user/staffs");
                    setStaffs(response.data);
                } catch (error) {
                    console.log(error)
                }
            }
            const fetchFomrs = async () => {
                try {
                    const response = await Axios.get("/admin/leaveForms/getAllForms");
                    setForms(response.data);
                    setIsLoading(false);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchFomrs();
            fetchStaffs();
        }, 600);
    },[])

    const filteredData = dataCollection.filter((data)=>{
        const matchedName = data.name?.toLowerCase().includes(details.name);
        const matchedEmployeeId = details.employeeId ? data.employeeId === details.employeeId : true;
        const matchedYear = details.year ? data.year === details.year : true;
        const matchedMonth = data.month?.toLowerCase().includes(details.month);

        return matchedName && matchedEmployeeId && matchedMonth && matchedYear;
    });

    // const filteredForms = forms.filter(form => {
    //     const matchesSearchName = form.user.first_name.toLowerCase().includes(searchName.toLowerCase());
    //     const matchesSearchedEmpId = form.user.emp_id.toLowerCase().includes(searchedEmpId.toLowerCase());
    //     const matchesFaculty = selectedFaculty ? form.user.faculty === selectedFaculty : true;
    //     const matchesDept = selectedDept ? form.user.department === selectedDept : true;
    //     const matchesFormType = selectedFormType ? form.formType === selectedFormType : true;
    //     const matchesFormStatus = selectedFormStatus ? form.status === selectedFormStatus : true;
    //     const matchesDate = selectedDate ? form.createdAt?.substring(0,10) === selectedDate : true;

    //     return matchesSearchName && matchesSearchedEmpId && matchesFaculty && matchesDept && matchesFormType && matchesFormStatus && matchesDate;
    // });


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

    //   const handleForm = (index) => {
    //     filteredForms.map((_form, _index) => {
    //         if (index === _index) {
    //             setForm(_form);
    //             setShowForm(true);
    //     }})
    //   }



    const handleForm = (e) => {
        setDetails({...details, [e.target.name]:e.target.value});
    };




    return (
        <>
        {isLoading? <LoadingAnimation/>:
        <>
        <div className="adminDashboard-container">
        {user.job_type === "Head of the Department" &&
            <>
            <h3>Report</h3>
            <button className='CSVbtn bttn ashbtn'>
                <CSVLink data={filteredData}>Download</CSVLink>
            </button>
            <div className="adminDashboard-table-container">
                {/* <table>
                    <thead>
                        <tr>
                            <td>
                                <input type="text" placeholder="Search by Name..." value={searchName} onChange={(e) => setSearchName(e.target.value)}
                                />
                            </td>
                            <td>
                                <input type="text" value={searchedEmpId} onChange={(e) => setSearchedEmpId(e.target.value)} placeholder='Search by EmpId'/>
                            </td>
                            <td>{user.job_type !== "Head of the Department" &&
                                <select value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)} >
                                    <option value="">Select Faculty</option>
                                    {faculties.map(faculty => {
                                        return <option key={faculty.faculty} value={faculty.faculty}>{faculty.faculty}</option>
                                    })}
                                </select>
                                }
                            </td>
                            <td>{user.job_type !== "Head of the Department" &&
                                <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                                    <option value="">Select Department</option>
                                    {departments.map(department => {
                                        return <option key={department} value={department}>{department}</option>
                                    })}
                                </select>
                                }   
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
                            <td></td>
                            <td></td>

                            </tr>
                            <tr>
                                <th>NAME</th>
                                <th>EMP_ID</th>
                                <th>FACULTY</th>
                                <th>DEPARTMENT</th>
                                <th>FORM TYPE</th>
                                <th>FORM STATUS</th>
                                <th>REQUEST DATE</th>
                                <th>DAYS LEAVE</th>
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
                                <td>{form.leaveDays}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> */}
                <table>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>EMP_ID</th>
                            <th>Year</th>
                            <th>Month</th>
                            <th>Leave Days</th>
                            <th>No Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name='name' value={details.name} onChange={e=>handleForm(e)} placeholder='search by name'/></td>
                            <td><input type="text" name='employeeId' value={details.employeeId} onChange={e=>handleForm(e)} placeholder='search by upfNo'/></td>
                            <td><input type="text" name='year' value={details.year} onChange={e=>handleForm(e)} placeholder='search by year'/></td>
                            <td><input type="text" name='month' value={details.month} onChange={e=>handleForm(e)} placeholder='search by month'/></td>
                            <td></td>
                            <td></td>
                        </tr>
                        {
                            filteredData.map((data,index)=>{
                                return(
                                <tr key={index}>
                                    <td>{data.name}</td>
                                    <td>{data.userId}</td>
                                    <td>{data.year}</td>
                                    <td>{data.month}</td>
                                    <td>{data.leaveDays}</td>
                                    <td>{data.nopay}</td>
                                </tr>
                                )
                            })
                        }
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


        <div className='staffsContainer'>
            {staffs.filter((staff) => staff.jobType !== "Head of the Department" && staff.jobType !== "Management Assistant" && 
            staff.jobType !== "Dean")
            .map((staff)=>{
                let src = staff.image_data
                ? `data:${staff.image_type};base64,${staff.image_data}`
                : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg";
                
                return (
                    <StaffCard
                    key={staff.id}
                    photo={src}
                    title={staff.first_name.concat(" " + staff.last_name)}
                    body={staff.faculty}
                    user={staff}
                    jobType={staff.job_type}
                    setSelectedUser={setSelectedStaff}
                    selectedUser={selectedStaff}
                    />
                );
            })}
        </div>
        {selectedStaff && <UserDashboard id={selectedStaff.id}/>}
        </>
        }

        {user.job_type === "Dean" && <>
            <div>
                <h3>Leave Summary</h3>
                <DeanCharts allForms={forms}/>
            </div>
        </>}

        </div>
        </>
        }
        </>
  )
}

export default AdminDashboard