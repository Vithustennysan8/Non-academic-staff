import '../../css/Contact_page/contactCard.css';

const ContactCard = ({ link, img, position, name, number, email }) => {
  return (
    <div className='contactCard'>
      <div className="contact-img">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <img src={img} alt={`${name} - ${position}`} />
        </a>
      </div>
      <div className='contact-details'>
        <h3 className='CC-name'>{name}</h3>
        <p className='CC-position'>{position}</p>
        <div className='contact-methods'>
          <a href={`mailto:${email}`} className='CC-email'>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            {email}
          </a>
          <a href={`tel:${number}`} className='CC-phone'>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            {number}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactCard