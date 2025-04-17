import { useEffect, useState } from "react"
import "../../css/Notifications/registerRequests.css"
import { Axios } from "../AxiosReqestBuilder"
import accept from "../../assets/accept.png"
import reject from "../../assets/cancel.png"
import view from "../../assets/search.png"
import Swal from "sweetalert2"
import LoadingAnimation from "../Common/LoadingAnimation"

const RegisterRequests = ({requests, setRequests}) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (token) => {
    setIsLoading(true);
    try{
      const response = await Axios.put(`admin/verify/${token}`);
      setRequests(response.data);
      setIsLoading(false);
      Swal.fire({
        title: "Verified successfully",
        icon: "success",
        confirmButtonText: "Ok",
      })
    }catch(error){
      console.log(error);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
        confirmButtonText: "Ok",
      })
    }
  }

  const handleDelete = async (id) => {
    try{
      const response = await Axios.delete(`admin/deleteUser/${id}`);
      setRequests(response.data);
      Swal.fire({
        title: "Deleted successfully",
        icon: "success",
        confirmButtonText: "Ok",
      })
    }catch(error){
      console.log(error);
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
        confirmButtonText: "Ok",
      })
    }
  }

  return (
    <div className="registerRequests">
      {isLoading && <LoadingAnimation/>}
      <h2>Register Requests</h2>
      { requests.length <= 0 && <p className="empty">No register requests found...</p>}

      { requests.length > 0 &&
      <div className="request"> 
        {
          requests.map((request)=>(
            <div key={request.id} className="singleRequestTap">
              <p><span className="highlight">Name:</span> {request.user.first_name}</p>
              <p><span className="highlight">Email:</span> {request.user.email}</p>
              <p><span className="highlight">Employee No:</span> {request.user.emp_id}</p>
              <p><span className="highlight">Job Type:</span> {request.user?.jobType || request.user?.job_type}</p>
              <p><span className="highlight">Requested to Register:</span> {request.user.createdAt}</p>
              <div className="buttons">
                <button className="view-more" onClick={() => setSelectedUser(request)}> <img src={view} alt="view icon" /></button>
                <button className="verify" onClick={() => handleVerify(request.token)} ><img src={accept} alt="accept icon" /></button>
                <button className="reject" onClick={() => handleDelete(request.user.id)} ><img src={reject} alt="reject icon" /></button>
              </div>
            </div>
          ))
        }

{selectedUser && 
        <div className="popupUserInfoContainer">
          <div className="userInfo">
            <button className="bttn redbtn" onClick={()=>{setSelectedUser(null)}}>X</button>
            <h4>Employee Information</h4>

            <div className="splitDiv">
              <div className="leftDiv">
                <div className="info-row">
                    <p className="info-label">First Name:</p>
                    <p className="info-value">{selectedUser.user.first_name}</p>
                </div>
                <div className="info-row">
                    <p className="info-label">Last Name:</p>
                    <p className="info-value">{selectedUser.user.last_name}</p>
                </div>
                <div className="info-row">
                    <p className="info-label">Employee Id:</p>
                    <p className="info-value">{selectedUser.user.emp_id}</p>
                </div>
                <div className="info-row">
                    <p className="info-label">Email:</p>
                    <p className="info-value">{selectedUser.user.email}</p>
                </div>
                <div className="info-row">
                    <p className="info-label">Faculty:</p>
                    <p className="info-value">{selectedUser.user.faculty}</p>
                </div>
                <div className="info-row">
                    <p className="info-label">Department:</p>
                    <p className="info-value">{selectedUser.user.department}</p>
                </div>
                <div className="info-row">
                    <p className="info-label">Identycard:</p>
                    <p className="info-value">{selectedUser.user.ic_no}</p>
                </div>
                <div className="info-row">
                    <p className="info-label">JobType:</p>
                    <p className="info-value">{selectedUser.user?.job_type || request.user?.job_type}</p>
                </div>
              </div>

              <div className="rightDiv">
                <div className="info-row">
                    <p className="info-label">Mobile no:</p>
                    <p className="info-value">{selectedUser.user.phone_no}</p>
                </div>
                <div className="info-row">
                    <p className="info-label">Date of Birth:</p>
                    <p className="info-value">{selectedUser.user.date_of_birth?.substring(0,10)}</p>
                </div>
                <div className="info-row">
                    <p className="info-label">Gender:</p>
                    <p className="info-value">{selectedUser.user.gender}</p>
                </div>
                <div className="info-row">
                    <p className="info-label">Address:</p>
                    <p className="info-value">{selectedUser.user.address}</p>
                </div>
                <div className="info-row">
                    <p className="info-label">City:</p>
                    <p className="info-value">{selectedUser.user.city}</p>
                </div>
                <div className="info-row">
                    <p className="info-label">PostalCode:</p>
                    <p className="info-value">{selectedUser.user.postal_code}</p>
                </div>
                <div className="info-row">
                    <p className="info-label">RequestedAt:</p>
                    <p className="info-value">{selectedUser.createdAt?.substring(0,10)}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
        }

      </div>
      }
    </div>
  )
}

export default RegisterRequests