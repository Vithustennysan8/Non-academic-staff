import { format } from "date-fns";
import "../../css/card.css"
import editIcon from "../../assets/edit.png"
import deleteIcon from "../../assets/delete.png"

const Card = ({role, news, handleDelete, handleUpdate}) => {
  // Safety checks to prevent errors
  if (!news) {
    return <div className="card">Loading...</div>;
  }

  const date = new Date(news.updatedAt);
  const datePart = format(date, 'MMMM do, yyyy');
  const timePart = format(date, 'hh:mm a');
  const photo = news.fileData ? `data:${news.fileType};base64,${news.fileData}` : null;

return (
    <div className="card" > 
        <p className="card-head">{news.heading}</p>

        <div className="newsDateAndTime">
          <p className="newsDate">Date: {datePart}</p>
          <p className="newsTime">Time: {timePart}</p>
        </div>

        <div className="news-content">
          <div className="newsDetails">
            <p className="card-body">{news.body}</p>
            <div>
              {role === "ADMIN" && <a href="#news"><img src={editIcon} alt="update-icon" onClick={handleUpdate}/></a>}
              {role === "ADMIN" && <img src={deleteIcon} alt="delete-icon" onClick={handleDelete}/>}
            </div>
          </div>
          <div className="newsPhotos">
            {photo && <img src={photo} alt="News photos" />}
          </div>
        </div>

        <p className="reporter">by - {news.user?.first_name || 'Unknown'}</p>
    </div>
  )
}

export default Card;