import "../css/card.css"

const Card = ({role, heading, body, user, date, time, handleDelete}) => {
  
return (
    <div className="card" > 
        <p className="card-head">{heading}</p>
        <div className="newsDateAndTime">
          <p className="newsDate">Date: {date}</p>
          <p className="newsTime">Time: {time}</p>
        </div>
        <p className="card-body">{body}</p>
        <p className="reporter">by - {user.first_name}</p>
        {role === "ADMIN" && <img src="https://cdn-icons-png.flaticon.com/128/8207/8207904.png" alt="delete-icon" onClick={handleDelete}/>}
    </div>
  )
}

export default Card;