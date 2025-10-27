import { useState, useEffect } from "react";
import "../../css/Contact_page/contact.css";
import ContactCard from "./ContactCard";
import { motion } from "framer-motion";
import VC from "../../assets/images/About/ViceChancellor.jpg";
import DVC from "../../assets/images/About/DeputyViceChancellor.jpg";

const Contact = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Contact data organized in a clean structure
  const contactData = [
    {
      id: 1,
      link: "https://www.pdn.ac.lk/vice-chancellor/",
      img: VC,
      position: "Vice Chancellor",
      name: "Prof. Terrance Madhujith",
      number: "081-2392300",
      email: "vc@pdn.ac.lk"
    },
    {
      id: 2,
      link: "https://www.pdn.ac.lk/deputy-vice-chancellor-2/",
      img: DVC,
      position: "Deputy Vice Chancellor",
      name: "Prof. Ranjith Pallegama",
      number: "081-2389140 / 081-2392304",
      email: "dvc@pdn.ac.lk"
    },
    {
      id: 3,
      link: "https://www.pdn.ac.lk/registrar/",
      img: "https://inro.pdn.ac.lk/assets/images/bom/Mr.%20EMGMB%20Ekanayake.jpg",
      position: "Registrar",
      name: "Mr. EMGMB. Ekanayake",
      number: "081-2387395 / 081-2392302",
      email: "registrar@pdn.ac.lk"
    }
  ];

  const aboutContent = `Our non-academic staff ensure smooth operations at the University by supporting administration, maintenance, IT, and student services. Their work is vital to our university's success.
  Their roles encompass a wide range of responsibilities, including admissions, career counseling, health and wellness, financial management, and more.
  Committed to excellence, our non-academic staff work tirelessly behind the scenes to enhance the educational experience and maintain the high standards of our institution.`;

  if (isLoading) {
    return (
      <div className="contact_container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading contact information...</p>
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
      <div className="contact_container">
        {/* About Section */}
        <section className="about-section">
          <h2>About Us</h2>
          <div className="about-content">
            <p>{aboutContent}</p>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="contact-section">
          <p className="contact-intro">
            Get in touch with our key administrative personnel for assistance and support.
          </p>
          
          <div className="contact-grid">
            {contactData.map((contact) => (
              <ContactCard
                key={contact.id}
                link={contact.link}
                img={contact.img}
                position={contact.position}
                name={contact.name}
                number={contact.number}
                email={contact.email}
              />
            ))}
          </div>
        </section>

        {/* Additional Information */}
        <section className="additional-info">
          <div className="info-card">
            <h3>General Information</h3>
            <div className="info-content">
              <p><strong>University Address:</strong> University of Peradeniya, Peradeniya, Sri Lanka</p>
              <p><strong>Website:</strong> <a href="https://www.pdn.ac.lk" target="_blank" rel="noopener noreferrer">www.pdn.ac.lk</a></p>
              <p><strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 4:30 PM</p>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Contact;
