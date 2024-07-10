import "../css/forumCard.css"

const ForumCard = ({heading,user,date,time,paragraph}) => {
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
        <div className="docs">
            It will contain any text or files
        </div>
    </div>
    </>
  )
}

export default ForumCard