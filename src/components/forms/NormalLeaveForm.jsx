import { useContext, useEffect, useState } from "react";
import "../../css/Forms/normalLeaveForm.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginContext } from "../../Contexts/LoginContext";
import { Axios } from "../AxiosReqestBuilder";
import { UserContext } from "../../Contexts/UserContext";

const NormalLeaveForm = () => {
  const naviagte = useNavigate();
  const {isLogin} = useContext(LoginContext);
  const {user} = useContext(UserContext);
  const [lastYearLeaveCount, setLastYearLeaveCount] = useState(0);
  const [thisYearLeaveCount, setThisYearLeaveCount] = useState(0);
    
  useEffect(()=>{
      if(!isLogin){
        window.scrollTo({top:0, behavior:"smooth"});
        naviagte("/login");
      }
  },[naviagte, isLogin])
    
  
  const {register, handleSubmit, formState: {errors}, setValue } = useForm(); 

  
  const onSubmit = async (data) => {
    
    // const formData = new FormData();
    // if(data.files){
    //   formData.append('files', data.files[0]);
    // }
    
    // Object.keys(data).forEach((key)=>{
    //   if( key === 'firstAppointmentDate' || key === 'leaveAppliedDate'){
    //     formData.append(key, data[key].split('-').reverse().join('-'))
    //   }
    //   else if( key != "files"){
    //     formData.append(key, data[key]);
    //   }
    // })
    
    // console.log(formData);

    try {
      const response = await Axios.post("auth/normalLeaveForm/add", data);
      console.log(response.data);
      alert("form submitted successfully");
      window.scrollTo({top:0, behavior:"smooth"});
      naviagte("/forms");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLastYearLeaveCounts = (e) => {

    const casual = parseInt(e.target.form.casualLeaveLastYear.value) || 0;
    const vacation = parseInt(e.target.form.vacationLeaveLastYear.value) || 0;
    const sick = parseInt(e.target.form.sickLeaveLastYear.value) || 0;

    setLastYearLeaveCount(casual + vacation + sick);
  }

  const handleThisYearLeaveCounts = (e) => {

    const casual = parseInt(e.target.form.casualLeaveThisYear.value) || 0;
    const vacation = parseInt(e.target.form.vacationLeaveThisYear.value) || 0;
    const sick = parseInt(e.target.form.sickLeaveThisYear.value) || 0;

    setThisYearLeaveCount(casual + vacation + sick);
  }
  
  return (
    <div className="noramlLeaveForm">

      <div className="normalleave-container">
        <h2>Normal Leave Form</h2>

        <form id="leaveForm" onSubmit={handleSubmit(onSubmit)} >

          <table border={"1px"}>
            <thead>
              <tr>
                <th colSpan={12}>Leave Application</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={2}>Department</td>
                <td colSpan={6}><p>{user.department}</p>
                </td>
                <td colSpan={2}>U.P.F No.</td>
                <td colSpan={2}><input type="text" name="upfNo" {...register("upfNo", {required:{
                  value: true,
                  message: "U.P.F No is required"
                }})}/>
                {errors.upfNo && <span className="error">{errors.upfNo.message}</span>}
                </td>
              </tr>

              <tr>
                <td colSpan={3}>Name</td>
                <td colSpan={5}><p>{user.first_name}</p>
                </td>
                <td colSpan={2}>Faculty</td>
                <td colSpan={2}><p>{user.faculty}</p>
                </td>
              </tr>

              <tr>
                <td colSpan={3}>Designation</td>
                <td colSpan={5}><input type="text" name="designation" {...register("designation", {required:{
                  value: true,
                  message: "Designation is required"
                }})}/>
                {errors.designation && <span className="error">{errors.designation.message}</span>}
                  </td>

                <td colSpan={2}>First Appointment Date</td>
                <td colSpan={2}><input type="date" name="firstAppointmentDate" {...register("firstAppointmentDate", {required:{
                  value: true,
                  message: "FirstAppointmentDate is required"
                }})}/>
                {errors.firstAppointmentDate && <span className="error">{errors.firstAppointmentDate.message}</span>}
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
                <td><input type="number" name="casualLeaveLastYear" {...register("casualLeaveLastYear", {required:{
                  value: true,
                  message: "CasualLeaveLastYear is required"
                }})} onChange={(e)=>{handleLastYearLeaveCounts(e); setValue("casualLeaveLastYear", e.target.value)}}/>
                {errors.casualLeaveLastYear && <span className="error">{errors.casualLeaveLastYear.message}</span>}
                </td>

                <td><input type="number" name="vacationLeaveLastYear" {...register("vacationLeaveLastYear", {required: {
                  value: true,
                  message: "VacationLeaveLastYear is required"
                }})} onChange={(e)=>{handleLastYearLeaveCounts(e); setValue("vacationLeaveLastYear", e.target.value)}}/>
                {errors.vacationLeaveLastYear && <span className="error">{errors.vacationLeaveLastYear.message}</span>}
                </td>

                <td><input type="number" name="sickLeaveLastYear" {...register("sickLeaveLastYear", {required: {
                  value: true,
                  message: "SickLeaveLastYear is required"
                }})} onChange={(e)=>{handleLastYearLeaveCounts(e); setValue("sickLeaveLastYear", e.target.value)}}/>
                {errors.sickLeaveLastYear && <span className="error">{errors.sickLeaveLastYear.message}</span>}
                </td>
                <td><input type="number" name="" id="" /></td>
                <td><input type="number" name="" id="" /></td>
                <td><input type="number" name="" id="" /></td>
                <td><input type="number" value={lastYearLeaveCount} readOnly /></td>
              </tr>

              <tr>
                <td>This Year</td>
                <td><input type="number" name="casualLeaveThisYear" {...register("casualLeaveThisYear", {required:{
                  value: true,
                  message: "casualLeaveThisYear is required"
                }})} onChange={(e)=>{handleThisYearLeaveCounts(e); setValue("casualLeaveThisYear", e.target.value)}}/>
                {errors.casualLeaveThisYear && <span className="error">{errors.casualLeaveThisYear.message}</span>}
                </td>

                <td><input type="number" name="vacationLeaveThisYear" {...register("vacationLeaveThisYear", {required: {
                  value: true,
                  message: "vacationLeaveThisYear is required"
                }})} onChange={(e)=>{handleThisYearLeaveCounts(e); setValue("vacationLeaveThisYear", e.target.value)}}/>
                {errors.vacationLeaveThisYear && <span className="error">{errors.vacationLeaveThisYear.message}</span>}
                </td>

                <td><input type="number" name="sickLeaveThisYear" {...register("sickLeaveThisYear", {required: {
                  value: true,
                  message: "sickLeaveThisYear is required"
                }})} onChange={(e)=>{handleThisYearLeaveCounts(e); setValue("sickLeaveThisYear", e.target.value)}}/>
                {errors.sickLeaveThisYear && <span className="error">{errors.sickLeaveThisYear.message}</span>}
                </td>
                <td><input type="number" name="" id="" /></td>
                <td><input type="number" name="" id="" /></td>
                <td><input type="number" name="" id="" /></td>
                <td><input type="number" value={thisYearLeaveCount} readOnly/></td>
              </tr>

              <tr >
                <td colSpan={4}>Number of days of Leave applied for</td>
                <td colSpan={4}>
                  <input type="number" name="noOfLeaveDays"  {...register("noOfLeaveDays", {required: {
                    value: true,
                    message: "noOfLeaveDays is required"
                  }})} />
                  {errors.noOfLeaveDays && <span className="error">{errors.noOfLeaveDays.message}</span>}
                </td>
                <td className="noOfDaysLeaveCheckBox"><input type="radio" name="leaveType" {...register("leaveType")} value={"casual"}/> Casual</td>
                <td className="noOfDaysLeaveCheckBox"><input type="radio" name="leaveType" {...register("leaveType")} value={"vacation"}/>Vacation</td>
                <td className="noOfDaysLeaveCheckBox"><input type="radio" name="leaveType" {...register("leaveType")} value={"sick"}/>Sick</td>
                <td className="noOfDaysLeaveCheckBox"><input type="radio" name="leaveType" {...register("leaveType")} value={"duty"}/>Duty</td>
              </tr>

              <tr>
                <td colSpan={4}>Date of commencement of Leave</td>
                <td colSpan={8}><input type="date" name="leaveAppliedDate" {...register("leaveAppliedDate", {required:{
                  value: true,
                  message: "leaveAppliedDate is required"
                }})}/>
                  {errors.leaveAppliedDate && <span className="error">{errors.leaveAppliedDate.message}</span>}
                </td>
              </tr>

              <tr>
                <td colSpan={4}>Reason for apply leave</td>
                <td colSpan={8}>
                  <textarea name="reason" rows="3" cols="30" {...register("reason", {required:{
                    value: true,
                    message: "reason is required"
                  }})}/>
                  {errors.reason && <span className="error">{errors.reason.message}</span>}
                </td>
              </tr>

              <tr>
                <td colSpan={4}>Arrangement of Applicant during the leave period</td>
                <td colSpan={8}>
                  <textarea name="arrangement" rows="3" cols="30" {...register("arrangement", {required:{
                    value: true,
                    message: "arrangement is required"
                  }})}/>
                  {errors.arrangement && <span className="error">{errors.arrangement.message}</span>}
                </td>
              </tr>

              <tr>
                <td colSpan={4}>Address of Applicant during the leave period</td>
                <td colSpan={8}>
                  <input type="text" name="addressDuringTheLeave" {...register("addressDuringTheLeave", {required:{
                    value: true,
                    message: "addressDuringTheLeave is required"
                  }})}/>
                  {errors.addressDuringTheLeave && <span className="error">{errors.addressDuringTheLeave.message}</span>}
                </td>
              </tr>

              {/* <tr>
                <td colSpan={4}>Order of Head of the Department</td>
                <td colSpan={8}>
                  <textarea name="orderOfHead" rows="3" cols="30" {...register("orderOfHead", {required:{
                    value: true,
                    message: "orderOfHead is required"
                  }})}/>
                  {errors.orderOfHead && <span className="error">{errors.orderOfHead.message}</span>}
                </td>
              </tr> */}

            </tbody>
          </table>

          <div className="submit">
            <button type="submit" className="bttn redbtn">Submit</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NormalLeaveForm;
