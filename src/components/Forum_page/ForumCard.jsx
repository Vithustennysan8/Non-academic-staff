import "../../css/Forum_page/forumCard.css"


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
          {(ownerId === currentUserId) && <img onClick={handleEdit} src="https://cdn-icons-png.flaticon.com/128/3124/3124772.png" alt="deleteIcon" />}
          {(ownerId === currentUserId || role == "ADMIN" || role == "SUPER_ADMIN") && <img onClick={handleDelete} src="https://cdn-icons-png.flaticon.com/128/8207/8207904.png" alt="deleteIcon" />}
        </div>
    </div>
    </>
  )
}

export default ForumCard