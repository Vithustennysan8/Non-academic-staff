import '../css/contactCard.css'

const ContactCard = ({position, name, number}) => {
  return (
    <div className='contactCard'>
        <h3>{position}</h3>
        <div className='contactNameAndNo'>
            <p>{name}</p>
            <p className='ContactNo'>{number}</p>
        </div>
    </div>
  )
}

export default ContactCard