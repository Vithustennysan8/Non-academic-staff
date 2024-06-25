import "../css/card.css"

const Card = ({title, body}) => {

  return (
    <div className="card" > 
        <p className="card-head">{title}</p>
        <p className="card-body">{body}</p>
    </div>
  )
}

export default Card;