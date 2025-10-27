import "../../css/Forum_page/forumCard.css"
import editIcon from "../../assets/edit.png"
import deleteIcon from "../../assets/delete.png"


const ForumCard = ({heading, user, date, time, paragraph, handleDelete, handleEdit, ownerId, currentUserId, role}) => {
  return (
    <>
    <div className="forumCard">
        <h3>{heading}</h3>
        <p className="forumUser">{user}</p>
        <div className="dateAndTime">
            <p>{date}</p>
            <p>{time}</p>
        </div>
        <p className="formCardContent">{paragraph}</p>
        
        <div className="deleteForum" >
          {(ownerId === currentUserId) && <img onClick={handleEdit} src={editIcon} alt="EditIcon" />}
          {(ownerId === currentUserId || role == "ADMIN" || role == "SUPER_ADMIN") && <img onClick={handleDelete} src={deleteIcon} alt="deleteIcon" />}
        </div>
    </div>
    </>
  )
}

export default ForumCard