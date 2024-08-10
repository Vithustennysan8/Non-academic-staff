import { useNavigate } from 'react-router-dom';
import '../../css/subtitute.css';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { LoginContext } from '../../Contexts/LoginContext';

const Subtitute = () => {
  const naviagte = useNavigate();
  const {isLogin} = useContext(LoginContext);
    
  useEffect(()=>{
      if(!isLogin){
        naviagte("/login");
      }
  },[naviagte, isLogin])

  const {register, handleSubmit, formState: {errors} } = useForm(); 
  
  const onSubmit = async (data) => {
  

    try {
      const response = await axios.post("http://localhost:8080/api/auth/full_leave_form/send", data, 
        {
          headers: {
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
    <div className="subtituteForm">
    <div className="subtitute-container">
      <h2><u>Subtitue Form</u></h2>
      <form id="subtituteForm" onSubmit={handleSubmit(onSubmit)}>

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
        
        <div className="subtituteFormSubmit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Subtitute