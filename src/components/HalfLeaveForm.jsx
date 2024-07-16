import { useNavigate } from "react-router-dom";
import "../css/halfLeaveForm.css"
import { useEffect, useState } from "react";

const HalfLeaveForm = () => {
  const naviagte = useNavigate();
  const [form, setForm] = useState({
    name:'',
    emp_id: '',
    department:'',
    duration:'',
    leave_type: "",
    leave_date:'',
    job_start_date:'',
    acting:'',
    reason:''
  });
    
  useEffect(()=>{
      if(localStorage.getItem("token") == null){
        naviagte("/login");
      }
  },[naviagte])

  const handleChange = (e) => {
    const {name,value} = e.target;
    setForm(form=>({...form,[name]:value}));
  }
  
  return (
    <div className="halfLeaveForm">
    <div className="halfleave-container">
      <h2><u>ShortLeave Application Form</u></h2>
      <form id="halfleaveForm" >


          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="form-group label-inline">
            <label htmlFor="EmpID">EmpID:</label>
            <input type="text" id="EmpID" name="EmpID" value={form.emp_id} onChange={handleChange} required />
          </div>

          <div className="form-group label-inline">
            <label htmlFor="faculty">Faculty:</label>
            <input type="text" id="faculty" name="faculty" value={form.department} onChange={handleChange} required />
          </div>

          <div className="form-group label-inline">
            <label htmlFor="Dept">Department:</label>
            <input type="text" id="Dept" name="department" value={form.department} onChange={handleChange} required />
          </div>

          <div className="form-group label-inline">
            <label htmlFor="jobStartDate">Job Start Date:</label>
            <input type="date" id="jobStartDate" name="job_start_date" value={form.job_start_date} onChange={handleChange} required />
          </div>

          {/* <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
          </div> */}

          <div className="form-group label-inline radio">
            <label htmlFor="duration">Time duration(hr):</label>
            <input type="number" id="duration" name="duration" value={form.duration} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="leaveType">Type of Leave:</label>
            <select id="leaveType" name="leaveType" value={form.leave_type} onChange={handleChange} required>
              <option value="annual">Annual Leave</option>
              <option value="sick" selected>Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="maternity">Maternity Leave</option>
            </select>
          </div>

          <div className="form-group label-inline">
            <label htmlFor="leaveDate">Start Date:</label>
            <input type="date" id="leaveDate" name="leave_date" value={form.leave_date} onChange={handleChange} required />
          </div>

          {/* <div className="form-group">
            <label htmlFor="Acting">Acting:</label>
            <input type="text" id="Acting" name="Acting" value={form.acting} onChange={handleChange} required />
          </div> */}

          <div className="form-group">
            <label htmlFor="reason">Reason:</label>
            <textarea id="reason" name="reason" rows="4" value={form.reason} onChange={handleChange} required></textarea>
          </div>

          <label htmlFor="file">Select a file to upload:</label>
          <input type="file" id="file" name="file" />

        <div className="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default HalfLeaveForm