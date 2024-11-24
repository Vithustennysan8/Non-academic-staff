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

const Notifications = () => {
  const { user } = useContext(UserContext);
  const { isLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [request, setRequest] = useState("");
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [transferRequests, setTransferRequests] = useState([]);
  const [registerRequests, setRegisterRequests] = useState([]);
  const [appliedLeaveForms, setAppliedLeaveForms] = useState([]);
  const [appliedTransferForms, setAppliedTransferForms] = useState([]);

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
          const response = await Axios.get("admin/transferForms/notify");
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
      }
      fetchLeaveFormsApplied();
      fetchTransferFormsApplied();
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
              { (user.job_type === "Head of the Department" || user.job_type === "Dean") &&
                <button onClick={() => setRequest("RegisterRequests")}>
                  Register Requests
                  {registerRequests.length > 0 && (
                    <span className="requestCount">
                      {registerRequests.length}
                    </span>
                  )}
                  </button>}

                <button onClick={() => setRequest("LeaveRequests")}>
                  Leave Requests
                  {leaveRequests.length > 0 && (
                    <span className="requestCount">{leaveRequests.length}</span>
                  )}
                </button>

                  {user.job_type !== "Chief Medical Officer" &&
                <button onClick={() => setRequest("TransferRequests")}>
                  Transfer Requests
                  {transferRequests.length > 0 && (
                    <span className="requestCount">
                      {transferRequests.length}
                    </span>
                  )}
                </button>
                }
              </>
            )}

            { user.role === "USER" && <>
            
              <button onClick={() => setRequest("AppliedLeaveForms")}>
                Applied Leave Forms
                {appliedLeaveForms.length > 0 && (
                  <span className="requestCount">{appliedLeaveForms.length}</span>
                )}
              </button>

              <button onClick={() => setRequest("AppliedTransferForms")}>
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
            {request === "AppliedLeaveForms" && (
              <AppliedLeaveForms
                appliedLeaveForms={appliedLeaveForms}
              />
            )}
            {request === "AppliedTransferForms" && <AppliedTransferForms appliedTransferForms={appliedTransferForms}/>}
          </div>
        </div>
      )}
    </>
  );
};

export default Notifications;
