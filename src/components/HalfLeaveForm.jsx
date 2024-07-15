import { useNavigate } from "react-router-dom";
import "../css/halfLeaveForm.css"
import { useEffect } from "react";

const HalfLeaveForm = () => {
  const naviagte = useNavigate();
    
  useEffect(()=>{
      if(localStorage.getItem("token") == null){
        naviagte("/login");
      }
  },[naviagte])

  
  return (
    <div className="halfLeaveForm">
    <div className="halfleave-container">
      <h2><u>HalfLeave Application Form</u></h2>
      <form id="halfleaveForm" >

        <label htmlFor="file">Select a file to upload:</label>
        <input type="file" id="file" name="file" />

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>

        <div className="form-group label-inline">
          <label htmlFor="EmpID">EmpID:</label>
          <input type="text" id="EmpID" name="EmpID" required />
        </div>

        <div className="form-group label-inline">
          <label htmlFor="Dept">Department:</label>
          <input type="text" id="Dept" name="Dept" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="form-group label-inline">
          <label>Time duration:</label>
          <input type="radio" id="leave" name="radio" value="leave" />
          <label htmlFor="leave">Day</label>
          <input type="radio" id="leave1" name="leave1" value="leave1" />
          <label htmlFor="leave1">Hours</label>
        </div>

        <div className="form-group">
          <label htmlFor="leaveType">Type of Leave:</label>
          <select id="leaveType" name="leaveType" required>
            <option value="annual">Annual Leave</option>
            <option value="sick" selected>Sick Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="maternity">Maternity Leave</option>
          </select>
        </div>

        <div className="form-group label-inline">
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" name="startDate" required />
        </div>

        <div className="form-group label-inline">
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" name="endDate" required />
        </div>

        <div className="form-group">
          <label htmlFor="Acting">Acting:</label>
          <input type="text" id="Acting" name="Acting" required />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <textarea id="reason" name="reason" rows="4" required></textarea>
        </div>

        <div className="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default HalfLeaveForm