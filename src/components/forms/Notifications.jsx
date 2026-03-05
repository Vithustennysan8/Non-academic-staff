import { useContext, useEffect, useState } from "react";
import "../../css/Forms/notifications.css";
import LeaveRequests from "../notifications/LeaveRequests";
import TransferRequests from "../notifications/TransferRequests";
import RegisterRequests from "../notifications/RegisterRequests";
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
import { FormsContext } from "../../Contexts/FormsContext.jsx";


const Notifications = () => {
  const { user, isLogin } = useAuth();
  const navigate = useNavigate();
  const [request, setRequest] = useState("");

  const { appliedDynamicForms, dynamicFormRequests, appliedNormalLeaveForms, 
          normalLeaveFormRequests, registerRequests, appliedTransferForms, 
          transferFormRequests } = useContext(FormsContext);


  useEffect(() => {
    setTimeout(() => {
      if (!isLogin) {
        navigate("/login");
      }
      if (user.role === "USER") {
        setRequest("AppliedLeaveForms");
      }

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
                  {registerRequests.length > 0 && (
                    <span className="requestCount">
                      {registerRequests.length}
                    </span>
                  )}
                  </button>

                  <button 
                    className={request === "LeaveRequests" || request === "" ? "active" : ""}
                    onClick={() => setRequest("LeaveRequests")}
                  >
                  <FontAwesomeIcon icon={faClipboardList} className="tab-icon" />
                  Normal Leave Requests
                  {normalLeaveFormRequests.length > 0 && (
                    <span className="requestCount">{normalLeaveFormRequests.length}</span>
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
                  {transferFormRequests.length > 0 && (
                    <span className="requestCount">
                      {transferFormRequests.length}
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
                {appliedNormalLeaveForms.length > 0 && (
                  <span className="requestCount">{appliedNormalLeaveForms.length}</span>
                )}
              </button>

              <button 
                className={request === "AppliedDynamicsForms" ? "active" : ""}
                onClick={() => setRequest("AppliedDynamicsForms")}
              >
                <FontAwesomeIcon icon={faFileAlt} className="tab-icon" />
                Applied Dynamic Leave Forms
                {appliedDynamicForms.filter(form => form.formStatus == "Pending").length > 0 && (
                  <span className="requestCount">{appliedDynamicForms.filter(form => form.formStatus == "Pending").length}</span>
                )}
              </button>

              <button 
                className={request === "AppliedTransferForms" ? "active" : ""}
                onClick={() => setRequest("AppliedTransferForms")}
              >
                <FontAwesomeIcon icon={faExchangeAlt} className="tab-icon" />
                Applied Transfer Forms
                {appliedTransferForms.length > 0 && (
                  <span className="requestCount">
                    {appliedTransferForms.length}
                  </span>
                )}
              </button>

            </> }
          </div>

          <div className="requests">
            {(request === "" || request === "LeaveRequests") && (
              <LeaveRequests/>
            )}
            {request === "RegisterRequests" && (
              <RegisterRequests/>
            )}
            {request === "TransferRequests" && <TransferRequests/>}
            {request === "AppliedLeaveForms" && (<AppliedLeaveForms/>)}
            {request === "AppliedTransferForms" && <AppliedTransferForms/>}
            {request === "AppliedDynamicsForms" && <AppliedDynamicForms/>}
            {request === "DynamicFormsRequests" && <DynamicFormRequests/>}

          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Notifications;
