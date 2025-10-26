import { useEffect, useState } from "react"
import "../../css/Forms/leaveForms.css"
import AccidentLeaveForm from "./AccidentLeaveForm"
import NormalLeaveForm from "./NormalLeaveForm"
import PaternalLeaveForm from "./PaternalLeaveForm"
import MaternityLeaveForm from "./MaternityLeaveForm"
import MedicalLeaveForm from "./MedicalLeaveForm"
import { Axios } from "../AxiosReqestBuilder"
import DynamicFormVIewer from "./DynamicFormVIewer"

const LeaveForms = () => {
    const [dynamicForms, setDynamicForms] = useState([]);
    const [form,setForm] = useState("NormalLeave");
    const [dynamicFormDetails, setDynamicFormDetails] = useState({});

    useEffect(() => {
      const fetchDynamicFormList = async () => {
        try {
          const response = await Axios.get("/auth/user/dynamicForm/getAll");
          setDynamicForms(response.data);
        } catch (error) {
          console.log("Error fetching dynamic form list",   error);          
        }
      }
      fetchDynamicFormList();
    }, [])

    const fetchForm = async (dynamicForm) => {
      try {
        const response = await Axios.get(`/auth/user/dynamicForm/get/${dynamicForm}`)
        setDynamicFormDetails(response.data);
      } catch (error) {
        console.log("Error fetching form", error);
      }
    } 

    const handleChange = (e) => {
        setForm(e.target.value);
        fetchForm(e.target.value);
    }

  return (
    <>
      <div className="leaveApplicationSelection">

        <label htmlFor="LeaveType">Select the Leave Type</label>
        <select name="leaveType" id="LeaveType" value={form} onChange={handleChange}>
          <option value="NormalLeave">Normal Leave</option>
          {/* <option value="AccidentLeave">Accident Leave</option>
          <option value="MedicalLeave">Medical Leave</option>
          <option value="MaternityLeave">Maternity Leave</option>
          <option value="PaternalLeave">Paternal Leave</option> */}
          { 
            dynamicForms.map((dynamicForm, index) => (
              <option key={index} value={dynamicForm.formType}>{dynamicForm.formType}</option>
            ))}
          
        </select>
      </div>

      { dynamicFormDetails.formType && <DynamicFormVIewer dynamicFormDetails={dynamicFormDetails}/>}
      {form === "NormalLeave" && <NormalLeaveForm/>}
      {form === "AccidentLeave" && <AccidentLeaveForm/>}
      {form === "PaternalLeave" && <PaternalLeaveForm/>}
      {form === "MaternityLeave" && <MaternityLeaveForm/>}
      {form === "MedicalLeave" && <MedicalLeaveForm/>}
    </>
  )
}

export default LeaveForms;