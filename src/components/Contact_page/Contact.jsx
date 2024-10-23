import { useState } from "react";
import "../../css/Contact_page/contact.css"
import ContactCard from "./ContactCard";
import LoadingAnimation from "../Common/LoadingAnimation";

const Contact = () => {
  const [isloading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 600);

  return (
    <>
      {isloading ? (
        <LoadingAnimation />
      ) : (
        <div className="contact_container">
          <div className="about-container">
            <h2>About us</h2>
            <div className="about-content">
            The non-academic staff at the University of Peradeniya play a vital role in ensuring the smooth 
            functioning of the institution. They manage a wide range of administrative, technical, and 
            operational tasks that support both academic activities and the overall campus environment. 
            Administrative staff handle important functions like admissions, student records, and office 
            management, while technical and support staff assist in laboratories, workshops, and IT services.
              The maintenance team is responsible for the upkeep of the university's infrastructure, ensuring 
              that facilities are safe and well-maintained. Library staff provide critical support in managing
              the university’s academic resources, assisting students and faculty in accessing materials. 
              Additionally, security personnel ensure safety on campus, while health services staff, including 
              nurses and administrative personnel, provide healthcare to students and staff. Transport and 
              logistics staff oversee the university's transportation needs, and those working in student 
              services assist with counseling, housing, and extracurricular activities. The contribution of 
              non-academic staff is essential to the university's success, allowing academic staff to focus 
              on teaching and research in a well-organized and supportive environment.
            </div>
          </div>
          
          <h2>Contact us</h2>
          <div className="contact_title">
            <div className="contact-info">
              <ContactCard
                link={"https://www.pdn.ac.lk/vice-chancellor/"}
                img={
                  "https://site.pdn.ac.lk/images/About/DeputyViceChancellor.jpg"
                }
                position={"Vice Chancellor"}
                name={"Prof.Terrance Madhujith"}
                number={"081-2392300"}
                email={"vc@pdn.ac.lk"}
              />
              <ContactCard
                link={"https://www.pdn.ac.lk/deputy-vice-chancellor-2/"}
                img={
                  "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                }
                position={"Deputy Vice Chancellor"}
                name={"_"}
                number={"081-2389140 / 081-2392304"}
                email={"dvc@pdn.ac.lk"}
              />
              <ContactCard
                link={"https://www.pdn.ac.lk/registrar/"}
                img={
                  "https://inro.pdn.ac.lk/assets/images/bom/Mr.%20EMGMB%20Ekanayake.jpg"
                }
                position={"Registrar"}
                name={"Mr. EMGMB. Ekanayake"}
                number={"081-2387395 / 081-2392302"}
                email={"registrar@pdn.ac.lk / registrar@gs.pdn.ac.lk"}
              />
            </div>
            {/* <div className="contact-info">
              <h3>More Staffs......</h3>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
