import "../css/staffcard.css";


const Card = ({ photo, title, body }) => {
    
    return (
        <div className="staff-card">
            <img src={photo}/>
            <h4>{title}</h4>
            <p>{body}</p>
        </div>
    )
}

export default Card;