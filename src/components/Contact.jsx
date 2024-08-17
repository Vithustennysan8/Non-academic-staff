import { useState } from "react";
import "../css/contact.css";
import ContactCard from "./ContactCard";
import LoadingAnimation from "./LoadingAnimation";

const Contact = () => {
  const [isloading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false)
  }, 600);

  return (
    <>
    {isloading? <LoadingAnimation/> : 
      <div className="contact_container">
        <h2>Contact us</h2>
        <div className="contact_title">
          <div className="contact-info">
            <ContactCard link={"https://www.pdn.ac.lk/chancellor/"} img={"https://site.pdn.ac.lk/images/About/Organization/chancellor.jpg"} position={'Chancellor'} name={'Prof.GH. Periris'} number={''} email={""}/>
            <ContactCard link={"https://www.pdn.ac.lk/vice-chancellor/"} img={"https://site.pdn.ac.lk/images/About/DeputyViceChancellor.jpg"} position={'Vice Chancellor'} name={'Prof.Terrance Madhujith'} number={'081-2392300'} email={"vc@pdn.ac.lk"}/>
            <ContactCard link={"https://www.pdn.ac.lk/deputy-vice-chancellor-2/"} img={"https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"} position={'Deputy Vice Chancellor'} name={'_'} number={'081-2389140 / 081-2392304'} email={"dvc@pdn.ac.lk"}/>
            <ContactCard link={"https://www.pdn.ac.lk/registrar/"} img={"https://inro.pdn.ac.lk/assets/images/bom/Mr.%20EMGMB%20Ekanayake.jpg"} position={'Registrar'} name={'Mr. EMGMB. Ekanayake'} number={'081-2387395 / 081-2392302'} email={"registrar@pdn.ac.lk / registrar@gs.pdn.ac.lk"}/>
            {/* <ContactCard link={"https://www.pdn.ac.lk/bursar/"} img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCCWTlUCptWEhcM9JUbpeCRTgTHKRa4WeSiA&s"} position={'Bursar'} name={'Mr. AMNB. Arampath'} number={'081-2392400 / 081-2388104'} email={"bursar@pdn.ac.lk"}/> */}
          </div>
        <div className="contact-info">
          <h3>More Staffs......</h3>
        </div>
        </div>
      </div>
      }
    </>
  );
};

export default Contact;
