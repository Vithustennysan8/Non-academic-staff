import { useContext, useState } from "react";
import "../../css/Forms_page/forms.css";
import FormCard from "./FormCard";
import img1 from "../../assets/images/normalIMG.jpg"
import medical from "../../assets/images/medicalIMG.jpg"
import maternity from "../../assets/images/maternityIMG.jpg"
import accident from "../../assets/images/accidentIMG.jpg"
import paternal from "../../assets/images/paternalIMG.jpg"
import LoadingAnimation from "../Common/LoadingAnimation";
import transfer from "../../assets/images/transferIMG.jpg"
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { LoginContext } from "../../Contexts/LoginContext";

const Forms = () => {
  const [isloading, setIsLoading] = useState(true);
  const {user} = useContext(UserContext);
  const {isLogin} = useContext(LoginContext);

  setTimeout(() => {
    setIsLoading(false);
  }, 600);

  return (
    <>
    {isloading? <LoadingAnimation/> :
      <div className="form-content">
        <div className="form-heading">Leave or Transfer Request</div>

        {user.role !== "USER" && isLogin &&
        <>
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
            <div>
              <i className="fa fa-building"></i>
              <Link to={"/manageDepartment"}>Manage Departments</Link>
            </div>
          </div>
          <div className="EditApprovalFlowContainer">
            <div>
              <i className="fa fa-align-left"></i>
              <Link to={"/manageFaculty"}>Manage Faculty</Link><br />
            </div>
            <div>
              <i className="fa fa-building"></i>
              <Link to={"/managePosition"}>Manage Positions</Link>
            </div>
          </div>
        </>
        }

        <div className="form-attributes">
          <FormCard
            title={"Leave Form"}
            content={"Apply Leave"}
            img={
              "https://cdn.iconscout.com/icon/premium/png-256-thumb/leaving-1649219-1399243.png"
            }
            url={"/LeaveForms"}
            />
          <FormCard
            title={"Transfer Form"}
            content={"Apply Transfer"}
            img={"https://static.thenounproject.com/png/2409660-200.png"}
            url={"/transferForm"}
            />
        </div>
{/* 

        <div className="form-details-container">
          <h3>Flow of the forms</h3>
          <div className="form-details">
            <div className="form-detail">
              <img src={img1} alt="normalFormFlowPicture" />
            </div>
            <div className="form-detail">
              <img src={accident} alt="accidentFormFlowPicture" />
            </div>
            <div className="form-detail">
              <img src={paternal} alt="paternalFormFlowPicture" />
            </div>
            <div className="form-detail">
              <img src={medical} alt="medicalFormFlowPicture" />
            </div>
            <div className="form-detail">
              <img src={maternity} alt="maternityFormFlowPicture" />
            </div>
            <div className="form-detail">
              <img src={transfer} alt="transferFormFlowPicture" />
            </div>
          </div>
        </div> */}
      </div>
    }
    </>
  );
};

export default Forms;
