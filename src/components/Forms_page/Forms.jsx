import { useState } from "react";
import "../../css/Forms_page/forms.css";
import FormCard from "./FormCard";
import img1 from "../../assets/images/normalIMG.jpg"
import medical from "../../assets/images/medicalIMG.jpg"
import maternity from "../../assets/images/maternityIMG.jpg"
import accident from "../../assets/images/accidentIMG.jpg"
import paternal from "../../assets/images/paternalIMG.jpg"
import LoadingAnimation from "../Common/LoadingAnimation";
import transfer from "../../assets/images/transferIMG.jpg"

const Forms = () => {
  const [isloading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false)
  }, 600);

  return (
    <>
    {isloading? <LoadingAnimation/> :
      <div className="form-content">
        <div className="form-heading">Leave or Transfer Request</div>
        <div className="form-attributes">
          <FormCard
            title={"Leave Form"}
            content={"Apply Leave Form"}
            img={
              "https://cdn.iconscout.com/icon/premium/png-256-thumb/leaving-1649219-1399243.png"
            }
            url={"/LeaveForms"}
            />
          <FormCard
            title={"Transfer Form"}
            content={"Apply Transfer Form"}
            img={"https://static.thenounproject.com/png/2409660-200.png"}
            url={"/transferForm"}
            />
        </div>

        <div className="form-details-container">
          <h3>Flow of the forms</h3>

          <div className="form-details">
            <div className="form-detail">
              <img src={img1} alt="normalFormFlowPicture" />
            </div>
            <div className="form-detail">
              {/* <p>Accident Leave Form</p> */}
              <img src={accident} alt="accidentFormFlowPicture" />
            </div>
            <div className="form-detail">
              {/* <p>Paternal Leave Form</p> */}
              <img src={paternal} alt="paternalFormFlowPicture" />
            </div>
            <div className="form-detail">
              {/* <p>Medical Leave Form</p> */}
              <img src={medical} alt="medicalFormFlowPicture" />
            </div>
            <div className="form-detail">
              {/* <p>Maternity Leave Form</p> */}
              <img src={maternity} alt="maternityFormFlowPicture" />
            </div>
            <div className="form-detail">
              {/* <p>Maternity Leave Form</p> */}
              <img src={transfer} alt="transferFormFlowPicture" />
            </div>
          </div>
        </div>
      </div>
    }
    </>
  );
};

export default Forms;
