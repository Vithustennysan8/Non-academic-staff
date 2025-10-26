import { useNavigate } from "react-router-dom";
import "../../css/Forms/accidentLeaveForm.css"
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Contexts/AuthContext";
import { Axios } from "../AxiosReqestBuilder";
import { handleError } from "../../utils/errorHandler";
import { toast } from "react-toastify";

const AccidentLeaveForm = () => {
  const navigate = useNavigate();
  const {isLogin, user} = useAuth();
    
  useEffect(()=>{
      if(!isLogin){
        window.scrollTo({top:0, behavior:"smooth"})
        navigate("/login");
      }
    },[navigate, isLogin])
    
    const {register, handleSubmit, formState: {errors} } = useForm(); 
    
    const onSubmit = async (data) => {
      
      const formData = new FormData();
      if(data.files){
        formData.append('files', data.files[0]);
      }
      
      Object.keys(data).forEach((key)=>{
        if( key != "files" ){
          formData.append(key, data[key]);
        }
      })
      
      console.log(formData);
      
      try {
        const response = await Axios.post("/auth/accidentLeaveForm/add", formData);
        console.log(response);
        toast.success("Form submitted successfully!");
        window.scrollTo({top:0, behavior:"smooth"});
        navigate("/forms");
    } catch (error) {
      handleError({ code: error.code || "UNKNOWN_ERROR", message: error.message || "Failed to submit form" });
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
          <label htmlFor="leaveAt">Leave StartDate: </label>
          <input type="date" name="leaveAt" id="leaveAt" {...register("leaveAt", {required:{
            value: true,
            message: "Please select a date"
          }})} />
          {errors.leaveAt && <span className="error">{errors.leaveAt.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="leaveDays">Leave days count: </label>
          <input type="number" name="leaveDays" id="leaveDays" {...register("leaveDays", {required:{
            value: true,
            message: "Please enter a number"
          }})} />
          {errors.leaveDays && <span className="error">{errors.leaveDays.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="accidentOccurredDuring">The accident occurred during: </label>
          <input type="text" name="accidentOccurredDuring" id="accidentOccurredDuring" {...register("accidentOccurredDuring", {required:{
            value: true,
            message: "Please enter accidentOccurredDuring"
          }})} />
          {errors.accidentOccurredDuring && <span className="error">{errors.accidentOccurredDuring.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="dateAndTimeOfAccident">Date and time of the accident: </label>
          <input type="datetime-local" name="dateAndTimeOfAccident" id="dateAndTimeOfAccident" {...register("dateAndTimeOfAccident", {required:{
            value: true,
            message: "Please enter DateAndTimeOfAccident"
          }})} />
          {errors.dateAndTimeOfAccident && <span className="error">{errors.dateAndTimeOfAccident.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="placeOFAccident">PlaceOFAccident of accident: </label>
          <input type="text" name="placeOFAccident" id="placeOFAccident" {...register("placeOFAccident", {required:{
            value: true,
            message: "Please enter placeOFAccident"
          }})} />
          {errors.placeOFAccident && <span className="error">{errors.placeOFAccident.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="whilePerformingAnyDuty">While performing any duty: </label>
          <input type="text" name="whilePerformingAnyDuty" id="whilePerformingAnyDuty" {...register("whilePerformingAnyDuty", {required:{
            value: true,
            message: "Please enter whilePerformingAnyDuty"
          }})} />
          {errors.whilePerformingAnyDuty && <span className="error">{errors.whilePerformingAnyDuty.message}</span>}
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
          <label htmlFor="whoInspectTheAccident">Name of the nearest person / officer who will inspect the accident: </label>
          <input type="text" name="whoInspectTheAccident" id="whoInspectTheAccident" {...register("whoInspectTheAccident", {required:{
            value: true,
            message: "Please enter whoInspectTheAccident"
          }})} />
          {errors.whoInspectTheAccident && <span className="error">{errors.whoInspectTheAccident.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="whoInformedAfterAccident">The officer who informed immediately after the accident was the: </label>
          <select name="whoInformedAfterAccident" id="whoInformedAfterAccident" {...register("whoInformedAfterAccident", {required: {
            value: true,
            message: "Please select whoInformedAfterAccident"
          }})}>
            <option value="">Select</option>
            <option value="headOfTheDepartment">Head of the Department</option>
            <option value="Dean">Dean</option>
            <option value="SecurityOfficer">Security Officer</option>
          </select>
          {errors.whoInformedAfterAccident && <span className="error">{errors.whoInformedAfterAccident.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="referralForTreatment">Referral for Treatment: </label>
          <select name="referralForTreatment" id="referralForTreatment" {...register("referralForTreatment", {required: {
            value: true,
            message: "Please select referralForTreatment"
          }})}>
            <option value="">Select</option>
            <option value="Hospital">Hospital</option>
            <option value="UniversityMedicalCentre">University Medical Centre</option>
          </select>
          {errors.referralForTreatment && <span className="error">{errors.referralForTreatment.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="dateAndTimeOfReport">Date and Time of Report to Hospital / Medical Centre: </label>
          <input type="datetime-local" name="dateAndTimeOfReport" id="dateAndTimeOfReport" {...register("dateAndTimeOfReport", {required:{
            value: true,
            message: "Please enter dateAndTimeOfReport"
          }})} />
          {errors.dateAndTimeOfReport && <span className="error">{errors.dateAndTimeOfReport.message}</span>}
        </div>

        <div className="input-group">
          <label htmlFor="durationOfHospitalStay">Duration of hospital stay: </label>
          <input type="number" name="durationOfHospitalStay" id="durationOfHospitalStay" {...register("durationOfHospitalStay", {required:{
            value: true,
            message: "Please enter durationOfHospitalStay"
          }})} />
          {errors.durationOfHospitalStay && <span className="error">{errors.durationOfHospitalStay.message}</span>}
        </div>

        <div className="input-group complaint">
          <label htmlFor="isPoliceComplaint">In case of a road accident, whether a police complaint was made: </label>
          <p>( a copy of the police report / copy of the court order should be attached )</p>
          <div>
            <input type="radio" name="isPoliceComplaint" id="yes" {...register("isPoliceComplaint")}/>
            <label htmlFor="yes">Yes</label>
          </div>
          <div>
            <input type="radio" name="isPoliceComplaint" id="no" {...register("isPoliceComplaint")}/>
            <label htmlFor="no">No</label>
          </div>
          {errors.isPoliceComplaint && <span className="error">{errors.isPoliceComplaint.message}</span>}
          <input type="file"/>
        </div>

        <div className="input-group">
          <label htmlFor="expectAccidentCompensation">Whether to expect accident compensation: </label>
          <input type="text" name="expectAccidentCompensation" id="expectAccidentCompensation" {...register("expectAccidentCompensation", {required:{
            value: true,
            message: "Please enter expectAccidentCompensation"
          }})} />
          {errors.expectAccidentCompensation && <span className="error">{errors.expectAccidentCompensation.message}</span>}
        </div>

          <button type="submit" className="bttn redbtn">Submit</button>
      </form>
    </div>
  )
}

export default AccidentLeaveForm;