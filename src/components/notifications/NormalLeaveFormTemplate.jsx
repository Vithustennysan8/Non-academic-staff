import { useNavigate } from "react-router-dom";
import "../../css/Forms/normalLeaveFormTemplate.css";
import { Axios } from "../AxiosReqestBuilder";

const NormalLeaveFormTemplate = ({application}) => {
  const navigate = useNavigate();
    
  const handleDelete = async (form) => {

    const formtype = form.formType.split(" ").join("").replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index == 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '');

    try {
        const response = await Axios.delete(`/auth/${formtype}/delete/${form?.id}`);
        console.log(response.data);
        alert("Form Deleted Successfully");
        // navigate("/notifications");
        window.location.reload();
    }catch(error){
        console.error(error);
    }
}
  return (
    <>

    <div className="normalLeaveTemplate-container">

        <h2>{application.formType}</h2>
        <button className="deleteBtn" onClick={() => handleDelete(application)}><img src="https://cdn-icons-png.flaticon.com/128/8207/8207904.png" alt="DeleteIcon" /></button>

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
                <td><p></p></td>
                <td><p></p></td>
                <td><p></p></td>
                <td><p>{application.casualLeaveLastYear+application.vacationLeaveLastYear+application.sickLeaveLastYear}</p></td>
              </tr>

              <tr>
                <td>This Year</td>
                <td><p>{application.casualLeaveThisYear}</p></td>
                <td><p>{application.vacationLeaveThisYear}</p></td>
                <td><p>{application.sickLeaveThisYear}</p></td>
                <td><p></p></td>
                <td><p></p></td>
                <td><p></p></td>
                <td><p>{application.casualLeaveThisYear+application.vacationLeaveThisYear+application.sickLeaveThisYear}</p></td>
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