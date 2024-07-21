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
            <ContactCard position={'Vice Chancellor'} name={'Prof.MD. Lamawansa'} number={'081-2388151'}/>
            <ContactCard position={'Deputy Vice Chancellor'} name={'Prof.WMT. Madhujith'} number={'081-2389140'}/>
            <ContactCard position={'Registrar'} name={'Ms.MGJ. Dharmasiri'} number={'081-2387395'}/>
            <ContactCard position={'Senior Assistant Registrar'} name={'_'} number={'718009811'}/>
          </div>
          <div className="contact-info"></div>
        </div>
      </div>
      }
    </>
  );
};

export default Contact;
