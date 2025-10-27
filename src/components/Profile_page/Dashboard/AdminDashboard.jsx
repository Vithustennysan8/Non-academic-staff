import { useEffect, useState } from 'react';
import "../../../css/Profile_page/Dashboard/adminDashboard.css"
import { Axios } from '../../AxiosReqestBuilder';
import { useAuth } from '../../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import UserDashboard from "./UserDashboard";
import StaffCard from '../../Staff_page/StaffCard';
import { CSVLink } from 'react-csv';
import DeanCharts from '../DeanCharts';
import { motion} from "framer-motion";
import SummaryCharts from "../SummaryCharts"

const AdminDashboard = () => {
    const {isLogin, user} = useAuth();
    const navigate = useNavigate();
    const [forms, setForms] = useState([]);
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
    
    useEffect(() => {
        if(!isLogin){
            window.scrollTo({top:0, behavior:"smooth"})
            navigate("/Login");
        }
    },[navigate, isLogin])
    
    useEffect(()=>{
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

        const handleFormDetails = () => {
            let arrayMap = new Map();
            forms.map((form)=>{
                const userId = form?.user?.id || form?.formUser?.id;
                const name = form?.user?.first_name || form?.formUser?.first_name;
                // const leaveDays = form.leaveDays || 0;
                const year = form.leaveAt?.substring(0,4) || form?.formCreatedAt?.substring(0,4);
                const month = form.leaveAt?.substring(5,7) || form?.formCreatedAt?.substring(5,7); 
    
                if(arrayMap.has(userId)){
    
                    let userLeaveData = arrayMap.get(userId);
                    let flag = false;
                    userLeaveData.forEach((item)=>{
                        if(item.year === year && item.month === monthsName[month-1]){
                            // item.leaveDays += leaveDays;
                            item.leaveCount += 1;
                            flag = true;
                        }
                    })
                    if(!flag){
                        arrayMap.get(userId).push({userId:userId, name:name, year: year, month: monthsName[month-1], leaveCount: 1});
                    }
    
                }else{
                    // arrayMap.set(userId, [{userId:userId, name:name, year: year, month: monthsName[month-1], leaveDays: leaveDays, nopay: leaveDays>2?leaveDays-2:0}]);
                    arrayMap.set(userId, [{userId:userId, name:name, year: year, month: monthsName[month-1], leaveCount: 1}]);
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
                    const response = await Axios.get("/user/staffs");
                    setStaffs(response.data);
                } catch (error) {
                    console.log("Error fetching staffs", error.message);
                }
            }
            const fetchFomrs = async () => {
                try {
                    const response1 = await Axios.get("/admin/leaveForms/getAllForms");
                    const response2 = await Axios.get("admin/DynamicFormUser/getAll");
                    setForms([...response2.data, ...response1.data]);
                } catch (error) {
                    console.log("Error fetching forms", error.message);
                }
            }
            fetchFomrs();
            fetchStaffs();
        }, 0);
    },[])

    const filteredData = dataCollection.filter((data)=>{
        const matchedName = data.name?.toLowerCase().includes(details.name);
        const matchedEmployeeId = details.employeeId ? data.employeeId === details.employeeId : true;
        const matchedYear = details.year ? data.year === details.year : true;
        const matchedMonth = data.month?.toLowerCase().includes(details.month);

        return matchedName && matchedEmployeeId && matchedMonth && matchedYear;
    });

    const handleForm = (e) => {
        setDetails({...details, [e.target.name]:e.target.value});
    };

    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5}}>
        {
        <>
        <div className="adminDashboard-container">
        {user.job_type === "Head of the Department" &&
            <>
            <h3>Report</h3>
            <button className='CSVbtn bttn ashbtn'>
                <CSVLink data={filteredData}>Download</CSVLink>
            </button>
            <div className="adminDashboard-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>EMP_ID</th>
                            <th>Year</th>
                            <th>Month</th>
                            <th>Leave Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="text" name='name' value={details.name} onChange={e=>handleForm(e)} placeholder='search by name'/></td>
                            <td><input type="text" name='employeeId' value={details.employeeId} onChange={e=>handleForm(e)} placeholder='search by upfNo'/></td>
                            <td><input type="text" name='year' value={details.year} onChange={e=>handleForm(e)} placeholder='search by year'/></td>
                            <td><input type="text" name='month' value={details.month} onChange={e=>handleForm(e)} placeholder='search by month'/></td>
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
                                    <td>{data.leaveCount}</td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                
                {/* {showForm && <>
                    <div className='floatWindowForSummary'>{form.DynamicForm.formType === "Normal Leave Form" ? <NormalLeaveFormTemplate application={form}/>:
                    <OtherLeaveFormsTemplate application={form}/>}</div>
                    <div className='darkScreenEffect'>
                        <button className='cancel' onClick={() => setShowForm(false)}><img src="https://cdn-icons-png.flaticon.com/128/8367/8367505.png" alt="cancel" /></button>
                    </div>
                </> } */}

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

        {user.job_type !== "Dean" && user.job_type !== "Head of the Department" && <>
            <div>
                <h3>Leave Summary</h3>
                <SummaryCharts allForms={forms}/>
            </div>
        </>}

        </div>
        </>
        }
        </motion.div>
  )
}

export default AdminDashboard