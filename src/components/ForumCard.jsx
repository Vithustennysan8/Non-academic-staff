import "../css/forumCard.css"

const ForumCard = ({heading, user, date, time, paragraph, handleDelete, handleEdit}) => {
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
        {/* <div className="docs">
            It will contain any text or files
        </div> */}
        
        <div className="deleteForum" >
          <img onClick={handleEdit} src="https://cdn-icons-png.flaticon.com/128/3124/3124772.png" alt="deleteIcon" />
          <img onClick={handleDelete} src="https://cdn-icons-png.flaticon.com/128/8207/8207904.png" alt="deleteIcon" />
        </div>
    </div>
    </>
  )
}

export default ForumCard