import { useNavigate } from "react-router-dom";
import "../../css/accidentLeaveForm.css"
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoginContext } from "../../Contexts/LoginContext";
import { UserContext } from "../../Contexts/UserContext";
import { Axios } from "../AxiosReqestBuilder";

const AccidentLeaveForm = () => {
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
      if( key === 'leave_date' || key === 'job_start_date'){
        formData.append(key, data[key].split('-').reverse().join('-'))
      }
      
      if( key != "files" || key != 'leave_date' || key != 'job_start_date' ){
        formData.append(key, data[key]);
      }
    })
    
    console.log(formData);
    
    try {
      const response = await Axios.post("/auth/full_leave_form/send", formData,
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
    <div className="AccidentLeaveForm">
      <h2>Accident Leave Form</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="input-group">
          <label htmlFor="name">Name of the applicant: </label>
          <p>{user.first_name}</p>
        </div>

        <div className="input-group">
          <label htmlFor="faculty">Faculty/unit: </label>
          <p>{user.faculty}</p>
        </div>

        <div className="input-group">
          <label htmlFor="department">Division/Department: </label>
          <p>{user.department}</p>
        </div>

        <div className="input-group">
          <label htmlFor="accidentDuring">The accident occurred during: </label>
          <input type="text" name="accidentDuring" id="accidentDuring" {...register("accidentDuring", {required:{
            value: true,
            message: "Please enter accidentDuring"
          }})} />
          {errors.accidentDuring && <span className="error">{errors.accidentDuring.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="dateAndTime">Date and time of the accident: </label>
          <input type="datetime" name="dateAndTime" id="dateAndTime" {...register("dateAndTime", {required:{
            value: true,
            message: "Please enter dateAndTime"
          }})} />
          {errors.dateAndTime && <span className="error">{errors.dateAndTime.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="place">Place of accident: </label>
          <input type="text" name="place" id="place" {...register("place", {required:{
            value: true,
            message: "Please enter place"
          }})} />
          {errors.place && <span className="error">{errors.place.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="whileDuty">While performing any duty: </label>
          <input type="text" name="whileDuty" id="whileDuty" {...register("whileDuty", {required:{
            value: true,
            message: "Please enter whileDuty"
          }})} />
          {errors.whileDuty && <span className="error">{errors.whileDuty.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="natureOfDanger">Nature of danger: </label>
          <input type="text" name="natureOfDanger" id="natureOfDanger" {...register("natureOfDanger", {required:{
            value: true,
            message: "Please enter natureOfDanger"
          }})} />
          {errors.natureOfDanger && <span className="error">{errors.natureOfDanger.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="inspecter">Name of the nearest person / officer who will inspect the accident: </label>
          <input type="text" name="inspecter" id="inspecter" {...register("inspecter", {required:{
            value: true,
            message: "Please enter inspecter"
          }})} />
          {errors.inspecter && <span className="error">{errors.inspecter.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="officer">The officer who informed immediately after the accident was the: </label>
          <select name="officer" id="officer" {...register("officer", {required: {
            value: true,
            message: "Please select officer"
          }})}>
            <option value="">Select</option>
            <option value="headOfTheDepartment">Head of the Department</option>
            <option value="Dean">Dean</option>
            <option value="SecurityOfficer">Security Officer</option>
          </select>
          {errors.officer && <span className="error">{errors.officer.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="referral">Referral for Treatment: </label>
          <select name="referral" id="referral" {...register("referral", {required: {
            value: true,
            message: "Please select referral"
          }})}>
            <option value="">Select</option>
            <option value="Hospital">Hospital</option>
            <option value="UniversityMedicalCentre">University Medical Centre</option>
          </select>
          {errors.referral && <span className="error">{errors.referral.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="dateAndTimeOfReport">Date and Time of Report to Hospital / Medical Centre: </label>
          <input type="datetime" name="dateAndTimeOfReport" id="dateAndTimeOfReport" {...register("dateAndTimeOfReport", {required:{
            value: true,
            message: "Please enter dateAndTimeOfReport"
          }})} />
          {errors.dateAndTimeOfReport && <span className="error">{errors.dateAndTimeOfReport.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="durationOfStay">Duration of hospital stay: </label>
          <input type="number" name="durationOfStay" id="durationOfStay" {...register("durationOfStay", {required:{
            value: true,
            message: "Please enter durationOfStay"
          }})} />
          {errors.durationOfStay && <span className="error">{errors.durationOfStay.message}</span>}
        </div>

        <div className="input-group complaint">
          <label htmlFor="complint">In case of a road accident, whether a police complaint was made: </label>
          <p>( a copy of the police report / copy of the court order should be attached )</p>
          <div>
            <input type="radio" name="complaint" id="yes"/>
            <label htmlFor="yes">Yes</label>
          </div>
          <div>
            <input type="radio" name="complaint" id="no" />
            <label htmlFor="no">No</label>
          </div>
          {errors.durationOfStay && <span className="error">{errors.durationOfStay.message}</span>}
          <input type="file"/>
        </div>

        <div className="input-group">
          <label htmlFor="compensation">Whether to expect accident compensation: </label>
          <input type="number" name="compensation" id="compensation" {...register("compensation", {required:{
            value: true,
            message: "Please enter compensation"
          }})} />
          {errors.compensation && <span className="error">{errors.compensation.message}</span>}
        </div>

          <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default AccidentLeaveForm;