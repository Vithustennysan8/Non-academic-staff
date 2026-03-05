
import "../../css/Forms/normalLeaveFormTemplate.css";
import { Axios } from "../AxiosReqestBuilder";
import { useAuth } from "../../Contexts/AuthContext";
import { toast } from "react-toastify";
import deleteLogo from "../../assets/delete.png";
import { faBackspace, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { FormsContext } from "../../Contexts/FormsContext";

const NormalLeaveFormTemplate = ({application, setShowForm, setForm}) => {
  const {user} = useAuth();
  const { setNormalLeaveFormRequests, setAppliedNormalLeaveForms } = useContext(FormsContext);

      const fetchNormalLeaveRequests = async () => {
        try {
          const response = await Axios.get("admin/leaveForms/notification");
          setNormalLeaveFormRequests(response.data);
        } catch (error) {
          console.log("Error fetching leave requests", error);
        }
      };

      const fetchLeaveFormsApplied = async () => {
        try {
          const response = await Axios.get("user/normalLeaveForm/getPending");
          setAppliedNormalLeaveForms(response.data);
        } catch (error) {
          console.log("Error fetching appliedNormalLeaveForms requests", error);
        }
      };

  const handleDelete = async (form) => {

    const formtype = form.formType.split(" ").join("").replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index == 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '');

    try {
        if(!window.confirm("Do you want to delete this form?")) return;

        await Axios.delete(`/user/${formtype}/delete/${form?.id}`);
        toast.success("Form deleted successfully");
        if(user.role === "USER"){
          fetchLeaveFormsApplied();
        }else{
          fetchNormalLeaveRequests();
        }
        setShowForm(false);
    }catch(error){
        console.log("Error deleting form", error.message);
    }
}
  return (
    <>

    <div className="normalLeaveTemplate-container">

        <button className="close-btn" onClick={() => {setShowForm(false); setForm(null);}}><FontAwesomeIcon icon={faBackspace} style={{padding: '4px 8px', color: 'blue', cursor: 'pointer'}} size="lg" /></button>
        {user.role !== "USER" && <button className="deleteBtn" onClick={() => handleDelete(application)}><FontAwesomeIcon icon={faTrash} style={{padding: '4px 8px', color: 'red', cursor: 'pointer'}} size="lg" /></button>}
        <h2>{application.formType}</h2>
        
        {application.headStatus === "pending" && user.role === "USER" && <button className="deleteBtn" onClick={() => handleDelete(application)}><img src={deleteLogo} alt="DeleteIcon" /></button>}

          <table border={"1px"}>

            <tbody>
              <tr>
                <td colSpan={2}>Department</td>
                <td colSpan={6}><p>{application.user.department}</p>
                </td>
                <td colSpan={2}>U.P.F No.</td>
                <td colSpan={2}><p>{application.upfNo}</p></td>
              </tr>

              <tr>
                <td colSpan={3}>Name</td>
                <td colSpan={5}><p>{application.user.first_name}</p>
                </td>
                <td colSpan={2}>Faculty</td>
                <td colSpan={2}><p>{application.user.faculty}</p>
                </td>
              </tr>

              <tr>
                <td colSpan={3}>Designation</td>
                <td colSpan={5}><p>{application.designation}</p></td>

                <td colSpan={2}>First Appointment Date</td>
                <td colSpan={2}><p>{application.firstAppointmentDate?.substring(0,10)}</p></td>
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
                <td><p>{application.casualLeaveLastYear}</p></td>
                <td><p>{application.vacationLeaveLastYear}</p></td>
                <td><p>{application.sickLeaveLastYear}</p></td>
                <td><p>{application.dutyLastYear}</p></td>
                <td><p>{application.halfPayLastYear}</p></td>
                <td><p>{application.noPayLastYear}</p></td>
                <td><p>{application.casualLeaveLastYear+application.vacationLeaveLastYear+application.sickLeaveLastYear
                  + application.dutyLastYear + application.halfPayLastYear + application.noPayLastYear}</p></td>
              </tr>

              <tr>
                <td>This Year</td>
                <td><p>{application.casualLeaveThisYear}</p></td>
                <td><p>{application.vacationLeaveThisYear}</p></td>
                <td><p>{application.sickLeaveThisYear}</p></td>
                <td><p>{application.dutyThisYear}</p></td>
                <td><p>{application.halfPayThisYear}</p></td>
                <td><p>{application.noPayThisYear}</p></td>
                <td><p>{application.casualLeaveThisYear+application.vacationLeaveThisYear+application.sickLeaveThisYear
                  + application.dutyThisYear + application.halfPayThisYear + application.noPayThisYear}</p></td>
              </tr>

              <tr >
                <td colSpan={4}>Number of days of Leave applied for</td>
                <td colSpan={4}><p>{application.leaveDays}</p></td>
                <td style={application.leaveType === "casual" ? {color:"red"}:{}}>Casual</td>
                <td style={application.leaveType === "vacation" ? {color:"red"}:{}}>Vacation</td>
                <td style={application.leaveType === "sick" ? {color:"red"}:{}}>Sick</td>
                <td style={application.leaveType === "duty" ? {color:"red"}:{}}>Duty</td>
              </tr>

              <tr>
                <td colSpan={4}>Date of commencement of Leave</td>
                <td colSpan={8}><p>{application.leaveAt?.substring(0,10)}</p></td>
              </tr>

              <tr>
                <td colSpan={4}>Reason for apply leave</td>
                <td colSpan={8}><p>{application.reason}</p></td>
              </tr>

              <tr>
                <td colSpan={4}>Arrangement of Applicant during the leave period</td>
                <td colSpan={8}><p>{application.arrangement}</p></td>
              </tr>

              <tr>
                <td colSpan={4}>Address of Applicant during the leave period</td>
                <td colSpan={8}><p>{application.addressDuringTheLeave}</p></td>
              </tr>

            </tbody>
          </table>
      </div>
    </>
  )
}

export default NormalLeaveFormTemplate