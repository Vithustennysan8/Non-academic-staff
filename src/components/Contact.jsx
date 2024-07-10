import Header from "./Header";
import Footer from "./Footer";
import "../css/contact.css";
import ContactCard from "./ContactCard";

const Contact = () => {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
};

export default Contact;
