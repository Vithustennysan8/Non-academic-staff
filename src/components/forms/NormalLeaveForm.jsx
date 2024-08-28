import { useContext, useEffect } from "react";
import "../../css/normalLeaveForm.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginContext } from "../../Contexts/LoginContext";
import { Axios } from "../AxiosReqestBuilder";
import { UserContext } from "../../Contexts/UserContext";

const NormalLeaveForm = () => {
  const naviagte = useNavigate();
  const {isLogin} = useContext(LoginContext);
  const {user} = useContext(UserContext);
    
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
      if( key === 'start_date' || key === 'end_date' || key === "job_start_date"){
        formData.append(key, data[key].split('-').reverse().join('-'))
      }
      
      if( key != "files" || key != 'start_date' || key!= 'end_date' || key != "job_start_date"){
        formData.append(key, data[key]);
      }
    })
    
    console.log(formData);

    try {
      const response = await Axios.post("auth/full_leave_form/send", formData,
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
                  </td>
                  <td colSpan={2}>First Appointment Date</td>
                <td colSpan={2}><input type="date" name="firstAppointmentDate" {...register("firstAppointmentDate", {required:{
                  value: true,
                  message: "FirstAppointmentDate is required"
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

              <tr >
                <td colSpan={4}>Number of days of Leave applied for</td>
                <td colSpan={4}>
                  <input type="number" />
                </td>
                <td className="noOfDaysLeaveCheckBox"><input type="checkbox" name="noOfDays" id="" /> Casual</td>
                <td className="noOfDaysLeaveCheckBox"><input type="checkbox" name="noOfDays" id="" />Vacation</td>
                <td className="noOfDaysLeaveCheckBox"><input type="checkbox" name="noOfDays" id="" />Sick</td>
                <td className="noOfDaysLeaveCheckBox"><input type="checkbox" name="noOfDays" id="" />Duty</td>
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
            </tbody>
          </table>

          <div className="submit">
            <button type="submit">Submit</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NormalLeaveForm;
