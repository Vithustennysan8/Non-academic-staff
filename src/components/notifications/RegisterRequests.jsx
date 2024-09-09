import "../../css/registerRequests.css"
import { Axios } from "../AxiosReqestBuilder"

const RegisterRequests = ({requests, setRequests}) => {

  // useEffect(()=>{
  //   const fetchRegisterRequests = async () => {
  //     try {
  //       const response = await Axios.get("admin/verifyRequests");
  //       console.log(response.data);
  //       setRequests(response.data);
  //     }catch(error){
  //       console.log(error);
  //     }
  //   }
  //   fetchRegisterRequests();
  // },[])

  const handleVerify = async (token) => {
    console.log("Verify button clicked");

    try{
      const response = await Axios.put(`admin/verify/${token}`);
      setRequests(response.data);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="registerRequests">
      <h2>Register Requests</h2>
      {requests.length <= 0 && <p className="empty">Forms not found...</p>}

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
              <button onClick={() => handleVerify(request.token)} className="view-more bttn ashbtn">View Details</button>
              <button onClick={() => handleVerify(request.token)} className="verify bttn">Verify</button>
            </div>
          ))
        }
      </div>
      }
    </div>
  )
}

export default RegisterRequests