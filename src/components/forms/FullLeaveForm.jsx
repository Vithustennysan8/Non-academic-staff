import { useContext, useEffect } from "react";
import "../../css/fullLeaveForm.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { LoginContext } from "../../Contexts/LoginContext";
import { tr } from "date-fns/locale";

const FullLeaveForm = () => {
  const naviagte = useNavigate();
  const {isLogin} = useContext(LoginContext);
    
  useEffect(()=>{
      if(isLogin){
        naviagte("/login");
      }
    },[naviagte, isLogin])
    
  
  const {register, handleSubmit, formState: {errors} } = useForm(); 
  
  const onSubmit = async (data) => {
    
    const formData = new FormData();
    if(data.files){
      formData.append('files', data.files[0]);
    }
    
    Object.keys(data).forEach((key)=>{
      if( key === 'start_date' || key === 'end_date' || key === "job_start_date"){
        formData.append(key, data[key].split('-').reverse().join('-'))
      }
      
      if( key != "files" || key != 'start_date' || key!= 'end_date' || key != "job_start_date"){
        formData.append(key, data[key]);
      }
    })
    
    console.log(formData);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/full_leave_form/send", formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      console.log(response);
      alert("form submitted successfully");
      naviagte("/forms");
    } catch (error) {
      console.log(error);
    }
    
    
  };
  
  return (
    <div className="fullLeaveForm">

      <div className="leaveApplicationSelection">
        <label htmlFor="LeaveType">Select the Leave Type</label>
        <select name="leaveType" id="LeaveType">
          <option value="">Select Form type....</option>
          <option value="Normal Leave">Normal Leave</option>
          <option value="Vacation Leave">Vacation Leave</option>
          <option value="Overseas Leave">Overseas Leave</option>
          <option value="Medical Leave">Medical Leave</option>
          <option value="Special Leave Granted to an Employee">Special Leave Granted to an Employee</option>
          <option value="Maternity Leave">Maternity Leave</option>
          <option value="Sabbatical Leave">Sabbatical Leave</option>
          <option value="Accident Leave">Accident Leave</option>
          <option value="Paternal Leave">Paternal Leave</option>
        </select>
      </div>

      <div className="fullleave-container">
        <h2>Normal Leave Form</h2>

        <form id="leaveForm" onSubmit={handleSubmit(onSubmit)} >

          <table border={"1px"}>

            <tr>
              <th colSpan={12}>Leave Application</th>
            </tr>

            <tr>
              <td colSpan={2}>Department</td>
              <td colSpan={6}><input type="text" name="department" {...register("department", {required:{
                value: true,
                message: "Department is required"
              }})}/>
              </td>
              <td colSpan={2}>U.P.F No.</td>
              <td colSpan={2}><input type="text" name="upfNo" {...register("upfNo", {required:{
                value: true,
                message: "U.P.F No is required"
              }})}/>
              </td>
            </tr>

            <tr>
              <td colSpan={3}>Name</td>
              <td colSpan={5}><input type="text" name="name" {...register("name", {required:{
                value: true,
                message: "Name is required"
              }})} />
              </td>
              <td colSpan={2}>First Appointment Date</td>
              <td colSpan={2}><input type="date" name="firstAppointmentDate" {...register("firstAppointmentDate", {required:{
                value: true,
                message: "FirstAppointmentDate is required"
              }})}/>
              </td>
            </tr>

            <tr>
              <td colSpan={3}>Designation</td>
              <td colSpan={9}><input type="text" name="designation" {...register("designation", {required:{
                value: true,
                message: "Designation is required"
                }})}/>
                </td>
            </tr>

            <tr>
              <td colSpan={4} rowSpan={3}>Full Pay Leave already taken</td>
              <td></td>
              <td>Casual</td>
              <td>Vacation</td>
              <td>Sick</td>
              <td>Duty</td>
              <td>Half Pay</td>
              <td>Nopay</td>
              <td>Total</td>
            </tr>

            <tr>
              <td>Last Year</td>
              <td><input type="number" name="" id="" /></td>
              <td><input type="number" name="" id="" /></td>
              <td><input type="number" name="" id="" /></td>
              <td><input type="number" name="" id="" /></td>
              <td><input type="number" name="" id="" /></td>
              <td><input type="number" name="" id="" /></td>
              <td><input type="number" name="" id="" /></td>
            </tr>

            <tr>
              <td>This Year</td>
              <td><input type="number" name="" id="" /></td>
              <td><input type="number" name="" id="" /></td>
              <td><input type="number" name="" id="" /></td>
              <td><input type="number" name="" id="" /></td>
              <td><input type="number" name="" id="" /></td>
              <td><input type="number" name="" id="" /></td>
              <td><input type="number" name="" id="" /></td>
            </tr>

            <tr>
              <td colSpan={4}>Number of days of Leave applied for</td>
              <td colSpan={4}>
                <input type="text" />
              </td>
              <td>Casual</td>
              <td>Vacation</td>
              <td>Sick</td>
              <td>Duty</td>
            </tr>

            <tr>
              <td colSpan={4}>Date of commencement of Leave</td>
              <td colSpan={8}><input type="date" name="dateOfCommencementOfLeave"/></td>
            </tr>

            <tr>
              <td colSpan={4}>Reason for apply leave</td>
              <td colSpan={8}>
                <textarea name="reasonForApplyLeave" rows="3" cols="30"></textarea>
              </td>
            </tr>

            <tr>
              <td colSpan={4}>Arrangement of Applicant during the leave period</td>
              <td colSpan={8}>
                <textarea name="arrangementOfApplicant" rows="3" cols="30"></textarea>
              </td>
            </tr>

            <tr>
              <td colSpan={4}>Address of Applicant during the leave period</td>
              <td colSpan={8}>
                <input type="text" name="address"/>
              </td>
            </tr>

            <tr>
              <td colSpan={4}>Order of Head of the Department</td>
              <td colSpan={8}>
                <textarea name="orderOfHeadOfTheDepartment" rows="3" cols="30"></textarea>
              </td>
            </tr>

            <tr>

            </tr>
          </table>
          {/* <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" {...register('name', { required:{
              value: true,
              message: "Name is required"
            }})}/>
            {errors.name && <span className='error'>{errors.name.message}</span> }
          </div>

          <div className="form-group label-inline">
            <label htmlFor="EmpID">EmpID:</label>
            <input type="text" id="EmpID" name="empId" {...register('empId', {required:{
              value: true,
              message: "EmpID is required"
            }})} />
            {errors.emp_id && <span className='error'>{errors.emp_id.message}</span> }
          </div>

          <div className="form-group label-inline">
            <label htmlFor="faculty">Faculty:</label>
            <input type="text" id="faculty" name="faculty" {...register('faculty', {required:{
              value: true,
              message: "Faculty is required"
            }})} />
            {errors.faculty && <span className='error'>{errors.faculty.message}</span> }
          </div>

          <div className="form-group label-inline">
            <label htmlFor="Dept">Department:</label>
            <input type="text" id="Dept" name="department" {...register('department', {required: {
              value: true,
              message: "Department is required"
            }})}/>
            {errors.department && <span className='error'>{errors.department.message}</span> }
          </div>

          <div className="form-group label-inline">
            <label htmlFor="jobStartDate">Job Start Date:
            <input type="date" id="jobStartDate" name="job_start_date" {...register("job_start_date", {required: {
              value: true,
              message: "Job Start Date is required"
            }})}/>
            </label>
            {errors.job_start_date && <span className='error'>{errors.job_start_date.message}</span>}
          </div>

          {/* <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} required />
          </div> */}

          {/* <div className="form-group">
            <label htmlFor="leaveType">Type of Leave:</label>
            <select id="leaveType" name="leave_type"  {...register("leave_type", {required: {
              value: true,
              message: "Type of Leave is required"
            }})}>
              <option value="">Select one..</option>
              <option value="annual">Annual Leave</option>
              <option value="sick" selected>Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="maternity">Maternity Leave</option>
            </select>
              {errors.leave_type && <span className='error'>{errors.leave_type.message}</span> }
          </div>

          <div className="form-group label-inline">
            <label htmlFor="startDate">Start Date:</label>
            <input type="date" id="startDate" name="start_date" {...register('start_date', {required: {
              value: true,
              message: "Start Date is required"
            }})} />
            {errors.start_date && <span className='error'>{errors.start_date.message}</span> }
          </div>

          <div className="form-group label-inline">
            <label htmlFor="endDate">End Date:</label>
            <input type="date" id="endDate" name="end_date" {...register("end_date", {required: {
              value: true,
              message: "End Date is required"
            }})} />
            {errors.end_date && <span className='error'>{errors.end_date.message}</span> }
          </div>

          <div className="form-group">
            <label htmlFor="Acting">Acting:</label>
            <input type="text" id="Acting" name="acting" {...register("acting", {required: {
              value: true,
              message: "Acting is required"
            }})} />
            {errors.acting && <span className='error'>{errors.acting.message}</span> }
          </div>

          <div className="form-group">
            <label htmlFor="reason">Reason:</label>
            <textarea id="reason" name="reason" rows="4" {...register('reason', {required: {
              value: true,
              message: "Reason is required"
            }})} >
            </textarea>
              {errors.reason && <span className='error'>{errors.reason.message}</span> }
          </div>

          <label htmlFor="files">Select a file to upload:</label>
          <input type="file" id="file" name="files" {...register("files")}/> */}

          <div className="submit">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FullLeaveForm;
