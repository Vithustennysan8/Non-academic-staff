import { useState } from "react"
import "../../css/Notifications/registerRequests.css"
import { Axios } from "../AxiosReqestBuilder"

const RegisterRequests = ({requests, setRequests}) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleVerify = async (token) => {
    try{
      const response = await Axios.put(`admin/verify/${token}`);
      setRequests(response.data);
      console.log(response.data);
    }catch(error){
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    try{
      const response = await Axios.delete(`admin/deleteUser/${id}`);
      setRequests(response.data);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="registerRequests">
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
              <p><span className="highlight">Job Type:</span> {request.user.job_type}</p>
              <p><span className="highlight">Requested to Register:</span> {request.user.createdAt}</p>
              <div className="buttons">
                <button className="view-more" onClick={() => setSelectedUser(request)}> <img src="https://cdn-icons-png.flaticon.com/128/7216/7216143.png" alt="" /></button>
                <button className="verify" onClick={() => handleVerify(request.token)} ><img src="https://cdn-icons-png.flaticon.com/128/5290/5290058.png" alt="" /></button>
                <button className="reject" onClick={() => handleDelete(request.user.id)} ><img src="https://cdn-icons-png.flaticon.com/128/10621/10621089.png" alt="" /></button>
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
                    <p className="info-value">{selectedUser.user.job_type}</p>
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