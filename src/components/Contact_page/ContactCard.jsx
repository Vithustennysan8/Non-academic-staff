import '../../css/Contact_page/contactCard.css'


const ContactCard = ({link, img, position, name, number, email}) => {
  return (
    <div className='contactCard'>
        <div className="contact-img">
          <a href={link}><img src={img} alt="contact person image" /></a>
        </div>
        <div className='contact-details'>
            <p className='CC-name'>{name}</p>
            <p className='CC-position'>{position}</p>
            <p className='CC-email'><a href={`mailto:${email}`}><img src="https://cdn-icons-png.flaticon.com/128/732/732200.png" alt="" />{email}</a></p>
            <p className='CC-phone'><img src="https://cdn-icons-png.flaticon.com/128/724/724664.png" alt="" />{number}</p>
        </div>
    </div>
  )
}

export default ContactCard