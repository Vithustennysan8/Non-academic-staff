import "../css/card.css"

const Card = ({title, body, reporter}) => {

  return (
    <div className="card" > 
        <p className="card-head">{title}</p>
        <div className="newsDateAndTime">
          <p className="newsDate">Date: 12/12/2020</p>
          <p className="newsTime">Time: 12:00</p>
        </div>
        <p className="card-body">{body}</p>
        <p className="reporter">by - {reporter}</p>
    </div>
  )
}

export default Card;