import { useContext, useEffect, useState } from "react";
import "../../css/Forms/notifications.css";
import LeaveRequests from "../notifications/LeaveRequests";
import TransferRequests from "../notifications/TransferRequests";
import RegisterRequests from "../notifications/RegisterRequests";
import { Axios } from "../AxiosReqestBuilder";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { LoginContext } from "../../Contexts/LoginContext";
import AppliedLeaveForms from "../notifications/AppliedLeaveForms";
import AppliedTransferForms from "../notifications/AppliedTransferForms";
import LoadingAnimation from "../Common/LoadingAnimation";
import AppliedDynamicForms from "../notifications/AppliedDynamicForms";
import DynamicFormRequests from "../notifications/DynamicFormRequests.jsx";

const Notifications = ({leave , transfer, appliedLeave, appliedTransfer, register, dynamicsForms, dynamicFormRequests, setDynamicsRequests}) => {
  const { user } = useContext(UserContext);
  const { isLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [request, setRequest] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [transferRequests, setTransferRequests] = useState([]);
  const [registerRequests, setRegisterRequests] = useState([]);
  // const [dynamicsFormsRequests, setDynamicsFormsRequests] = useState([]);
  const [appliedLeaveForms, setAppliedLeaveForms] = useState([]);
  const [appliedTransferForms, setAppliedTransferForms] = useState([]);
  // const [appliedDynamicsForms, setAppliedDynamicsForms] = useState([]);


  useEffect(() => {
    setTimeout(() => {
      if (!isLogin) {
        navigate("/login");
      }
      if (user.role === "USER") {
        setRequest("AppliedLeaveForms");
      }

      const fetchLeaveRequests = async () => {
        try {
          const response = await Axios.get("admin/leaveForms/notify");
          setLeaveRequests(response.data);
        } catch (error) {
          console.log("Error fetching leave requests", error);
        }
      };

      // const fetchDynamicForms = async () => {
      //     try {
      //         const response = await Axios.get("auth/user/DynamicFormUser/getAll");
      //         setAppliedDynamicsForms(response.data);
      //     } catch (error) {
      //         console.log(error);
      //     }
      // }

      // const fetchDynamicFormsRequests = async () => {
      //     try {
      //         const response = await Axios.get("admin/DynamicFormUser/getAll");
      //         console.log(response.data);
      //         setDynamicsFormsRequests(response.data);
      //     } catch (error) {
      //         console.log(error);
      //     }
      // }
      
      const fetchRegisterRequests = async () => {
        try {
          const response = await Axios.get("admin/verifyRegisterRequests");
          setRegisterRequests(response.data);
        } catch (error) {
          console.log("Error fetching register requests", error);
        }
      };

      const fetchTransferRequests = async () => {
        try{
          const response = await Axios.get("admin/transferForms/notification");
          setTransferRequests(response.data);
        }catch(error){
          console.log("Error fetching transfer requests", error);
        }}
        
        const fetchTransferFormsApplied = async () => {
          try {
            const response = await Axios.get("auth/user/transferForms");
            setAppliedTransferForms(response.data);
        } catch (error) {
          console.log("Error fetching appliedTransferForms requests", error);
        }
      };

      const fetchLeaveFormsApplied = async () => {
        try {
          const response = await Axios.get("auth/user/leaveForms");
          setAppliedLeaveForms(response.data);
        } catch (error) {
          console.log("Error fetching appliedLeaveForms requests", error);
        }
      };
      
      if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
        fetchLeaveRequests();
        fetchRegisterRequests();
        fetchTransferRequests();
        // fetchDynamicFormsRequests();
      }
      fetchLeaveFormsApplied();
      fetchTransferFormsApplied();
      // fetchDynamicForms();
      setIsLoading(false);
    }, 600);
  }, [navigate, user, isLogin]);
  
  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <div className="notifications">
          <div className="requestsTap">
            {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
              <>
              { (user.job_type === "Head of the Department") &&

                <button onClick={() => setRequest("RegisterRequests")}>
                  Register Requests
                  {register.length > 0 && (
                    <span className="requestCount">
                      {register.length}
                    </span>
                  )}
                  </button>}

                <button onClick={() => setRequest("DynamicFormsRequests")}>
                  Dynamic Leave Requests
                  {dynamicFormRequests.filter(request => request.approverDetails.filter(approver =>
                            approver.approver == user.job_type)[0].approverStatus == "Pending").length > 0 && (
                    <span className="requestCount">{dynamicFormRequests.filter(request => request.approverDetails.filter(approver =>
                      approver.approver == user.job_type)[0].approverStatus == "Pending").length}</span>
                  )}
                </button>

                <button onClick={() => setRequest("LeaveRequests")}>
                  Leave Requests
                  {leave.length > 0 && (
                    <span className="requestCount">{leave.length}</span>
                  )}
                </button>

                  {user.job_type !== "Chief Medical Officer" &&
                <button onClick={() => setRequest("TransferRequests")}>
                  Transfer Requests
                  {transfer.length > 0 && (
                    <span className="requestCount">
                      {transfer.length}
                    </span>
                  )}
                </button>
                }
              </>
            )}

            { user.role === "USER" && <>
            
              <button onClick={() => setRequest("AppliedDynamicsForms")}>
                Applied Dynamics Forms
                {dynamicsForms.filter(form => form.formStatus == "Pending").length > 0 && (
                  <span className="requestCount">{dynamicsForms.filter(form => form.formStatus == "Pending").length}</span>
                )}
              </button>

              <button onClick={() => setRequest("AppliedLeaveForms")}>
                Applied Leave Forms
                {appliedLeave.length > 0 && (
                  <span className="requestCount">{appliedLeave.length}</span>
                )}
              </button>

              <button onClick={() => setRequest("AppliedTransferForms")}>
                Applied Transfer Forms
                {appliedTransfer.length > 0 && (
                  <span className="requestCount">
                    {appliedTransfer.length}
                  </span>
                )}
              </button>

            </> }
          </div>

          <div className="requests">
            {(request === "" || request === "LeaveRequests") && (
              <LeaveRequests
                allLeaveFormRequests={leaveRequests}
                setAllLeaveFormRequests={setLeaveRequests}
              />
            )}
            {request === "RegisterRequests" && (
              <RegisterRequests
                requests={registerRequests}
                setRequests={setRegisterRequests}
              />
            )}
            {request === "TransferRequests" && <TransferRequests allTransferFormRequests={transferRequests} setAllTransferFormRequests={setTransferRequests}/>}
            {request === "AppliedLeaveForms" && (<AppliedLeaveForms appliedLeaveForms={appliedLeaveForms}/>)}
            {request === "AppliedTransferForms" && <AppliedTransferForms appliedTransferForms={appliedTransferForms}/>}
            {request === "AppliedDynamicsForms" && <AppliedDynamicForms dynamicForms={dynamicsForms}/>}
            {request === "DynamicFormsRequests" && <DynamicFormRequests dynamicFormRequests={dynamicFormRequests} setDynamicFormRequests={setDynamicsRequests}/>}

          </div>
        </div>
      )}
    </>
  );
};

export default Notifications;
