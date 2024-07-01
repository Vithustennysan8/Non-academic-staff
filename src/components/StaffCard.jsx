import "../css/staffcard.css";

const Card = ({ photo, title, body }) => {

    return (
        <div className="staff-card">
            <img src={photo}  style={{ width: "100%", borderRadius: "100px" }} />
            <h4>{title}</h4>
            <p>{body}</p>
        </div>
    )
}

export default Card;