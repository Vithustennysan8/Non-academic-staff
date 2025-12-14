import { useState } from "react";
import "../../css/Forms_page/forms.css";
import FormCard from "./FormCard";
import { Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import {motion} from "framer-motion";
import leaveLogo from "../../assets/images/FormPage/leave.png";
import transferLogo from "../../assets/images/FormPage/transfer.png";

const Forms = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {user, isLogin} = useAuth();

  setTimeout(() => {
    window.scrollTo({top:0, behavior:"smooth"});
    setIsLoading(false);
  }, 500);

  if (isLoading) {
    return (
      <div className="staffs">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading forms information...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -20 }} 
    transition={{ duration: 0.6 }}
  >
    {
      <div className="form-content">
        <div className="form-heading">Leave or Transfer Request</div>

        {user.role !== "USER" && isLogin &&
        <div className="form-approval-flow">
          <h2>Admin Actions</h2>
          <div className="EditApprovalFlowContainer">
            <div>
              <i className="fa fa-pen-to-square"></i>
              <Link to={"/approvalFlowManager"}>Edit the approval flow</Link><br />
            </div>
            <div>
              <i className="fa fa-folder-plus"></i>
              <Link to={"/createForm"}>Create dynamic form</Link>
            </div>
          </div>
          <div className="EditApprovalFlowContainer">
            <div>
              <i className="fa fa-align-left"></i>
              <Link to={"/dynamicForm"}>Dynamic Forms</Link><br />
            </div>

            {user.role === "SUPER_ADMIN" &&
            <div>
              <i className="fa fa-building"></i>
              <Link to={"/manageDepartment"}>Manage Departments</Link>
            </div>
            }
          </div>
          <div className="EditApprovalFlowContainer">
            {user.role === "SUPER_ADMIN" && <>
            <div>
              <i className="fa fa-house"></i>
              <Link to={"/manageFaculty"}>Manage Faculty/Center</Link><br />
            </div>
            <div>
              <i className="fa fa-person"></i>
              <Link to={"/managePosition"}>Manage Positions</Link>
            </div>
            </>}
          </div>
        </div>
        }

        <div className="form-attributes">
          <FormCard
            title={"Leave Form"}
            content={"Apply Leave"}
            img={leaveLogo}
            url={"/LeaveForms"}
            />
          <FormCard
            title={"Transfer Form"}
            content={"Apply Transfer"}
            img={transferLogo}
            url={"/transferForm"}
            />
        </div>

      </div>
    }
    </motion.div>
  );
};

export default Forms;
