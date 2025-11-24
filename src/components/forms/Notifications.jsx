import { useEffect, useState } from "react";
import "../../css/Forms/notifications.css";
import LeaveRequests from "../notifications/LeaveRequests";
import TransferRequests from "../notifications/TransferRequests";
import RegisterRequests from "../notifications/RegisterRequests";
import { Axios } from "../AxiosReqestBuilder";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import AppliedLeaveForms from "../notifications/AppliedLeaveForms";
import AppliedTransferForms from "../notifications/AppliedTransferForms";
import AppliedDynamicForms from "../notifications/AppliedDynamicForms";
import DynamicFormRequests from "../notifications/DynamicFormRequests.jsx";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faClipboardList, 
  faUserPlus, 
  faExchangeAlt, 
  faFileAlt, 
  faFileSignature 
} from "@fortawesome/free-solid-svg-icons";


const Notifications = ({leave , transfer, appliedLeave, appliedTransfer, register, dynamicsForms, dynamicFormRequests, setDynamicsRequests}) => {
  const { user, isLogin } = useAuth();
  const navigate = useNavigate();
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
          const response = user.role === "ADMIN" ? await Axios.get("admin/verifyRegisterRequests") : 
                                      await Axios.get("superadmin/verifyAdminRegisterRequests");
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
            const response = await Axios.get("/user/transferForms");
            setAppliedTransferForms(response.data);
          } catch (error) {
            console.log("Error fetching appliedTransferForms requests", error);
          }
        };

      const fetchLeaveFormsApplied = async () => {
        try {
          const response = await Axios.get("/user/normalLeaveForm/get");
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
    }, 0);
  }, [navigate, user, isLogin]);
  
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.5}}>
      {(
        <div className="notifications">
          <div className="requestsTap">
            {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
              <>
                <button 
                  className={request === "RegisterRequests" ? "active" : ""}
                  onClick={() => setRequest("RegisterRequests")}
                >
                  <FontAwesomeIcon icon={faUserPlus} className="tab-icon" />
                  Register Requests
                  {register.length > 0 && (
                    <span className="requestCount">
                      {register.length}
                    </span>
                  )}
                  </button>

                  <button 
                    className={request === "LeaveRequests" || request === "" ? "active" : ""}
                    onClick={() => setRequest("LeaveRequests")}
                  >
                  <FontAwesomeIcon icon={faClipboardList} className="tab-icon" />
                  Normal Leave Requests
                  {leave.length > 0 && (
                    <span className="requestCount">{leave.length}</span>
                  )}
                </button>

                <button 
                  className={request === "DynamicFormsRequests" ? "active" : ""}
                  onClick={() => setRequest("DynamicFormsRequests")}
                >
                  <FontAwesomeIcon icon={faFileAlt} className="tab-icon" />
                  Dynamic Leave Requests
                  {dynamicFormRequests.filter(request => request.approverDetails.filter(approver =>
                            approver.approver == user.job_type)[0].approverStatus == "Pending").length > 0 && (
                    <span className="requestCount">{dynamicFormRequests.filter(request => request.approverDetails.filter(approver =>
                      approver.approver == user.job_type)[0].approverStatus == "Pending").length}</span>
                  )}
                </button>

                <button 
                  className={request === "TransferRequests" ? "active" : ""}
                  onClick={() => setRequest("TransferRequests")}
                >
                  <FontAwesomeIcon icon={faExchangeAlt} className="tab-icon" />
                  Transfer Requests
                  {transfer.length > 0 && (
                    <span className="requestCount">
                      {transfer.length}
                    </span>
                  )}
                </button>
              </>
            )}

            { (user.role === "USER") && <>
            
              <button 
                className={request === "AppliedLeaveForms" ? "active" : ""}
                onClick={() => setRequest("AppliedLeaveForms")}
              >
                <FontAwesomeIcon icon={faFileSignature} className="tab-icon" />
                Applied Normal Leave Forms
                {appliedLeave.length > 0 && (
                  <span className="requestCount">{appliedLeave.length}</span>
                )}
              </button>

              <button 
                className={request === "AppliedDynamicsForms" ? "active" : ""}
                onClick={() => setRequest("AppliedDynamicsForms")}
              >
                <FontAwesomeIcon icon={faFileAlt} className="tab-icon" />
                Applied Dynamic Leave Forms
                {dynamicsForms.filter(form => form.formStatus == "Pending").length > 0 && (
                  <span className="requestCount">{dynamicsForms.filter(form => form.formStatus == "Pending").length}</span>
                )}
              </button>

              <button 
                className={request === "AppliedTransferForms" ? "active" : ""}
                onClick={() => setRequest("AppliedTransferForms")}
              >
                <FontAwesomeIcon icon={faExchangeAlt} className="tab-icon" />
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
    </motion.div>
  );
};

export default Notifications;
