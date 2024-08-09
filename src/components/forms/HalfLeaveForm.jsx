import { useNavigate } from "react-router-dom";
import "../../css/halfLeaveForm.css"
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { LoginContext } from "../../Contexts/LoginContext";

const HalfLeaveForm = () => {
  const naviagte = useNavigate();
  const {isLogin} = useContext(LoginContext);
    
  useEffect(()=>{
      if(!isLogin){
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
      if( key === 'leave_date' || key === 'job_start_date'){
        formData.append(key, data[key].split('-').reverse().join('-'))
      }
      
      if( key != "files" || key != 'leave_date' || key != 'job_start_date' ){
        formData.append(key, data[key]);
      }
    })
    
    console.log(formData);
    
    try {
      const response = await axios.post("http://localhost:8080/api/auth/short_leave_form/send", formData,
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
    <div className="halfLeaveForm">
    <div className="halfleave-container">
      <h2><u>ShortLeave Application Form</u></h2>
      <form id="halfleaveForm" onSubmit={handleSubmit(onSubmit)}>


      <div className="form-group">
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

          <div className="form-group label-inline radio">
            <label htmlFor="duration">Time duration(hr):</label>
            <input type="number" id="duration" name="duration" {...register("duration", {required: {
              value: true,
              message: "Time duration is required"
            }})} />
            {errors.duration && <span className='error'>{errors.duration.message}</span> }
          </div>

          <div className="form-group">
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
            <label htmlFor="leaveDate">leave Date:</label>
            <input type="date" id="leaveDate" name="leave_date" {...register('leave_date', {required: {
              value: true,
              message: "Start Date is required"
            }})} />
            {errors.leave_date && <span className='error'>{errors.leave_date.message}</span> }
          </div>

          {/* <div className="form-group">
            <label htmlFor="Acting">Acting:</label>
            <input type="text" id="Acting" name="Acting" value={form.acting} onChange={handleChange} required />
          </div> */}

          <div className="form-group">
            <label htmlFor="reason">Reason:</label>
            <textarea id="reason" name="reason" rows="4" {...register('reason', {required: {
              value: true,
              message: "Reason is required"
            }})} >
            </textarea>
              {errors.reason && <span className='error'>{errors.reason.message}</span> }
          </div>

          <label htmlFor="file">Select a file to upload:</label>
          <input type="file" id="file" name="files" {...register("files")}/>


        <div className="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default HalfLeaveForm