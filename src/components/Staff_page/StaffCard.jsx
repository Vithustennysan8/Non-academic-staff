import "../../css/Staffs_page/staffcard.css"


const Card = ({user, photo, title, body, jobType, setSelectedUser, selectedUser }) => {
    
    return (
        <div className={`staff-card ${user?.id === selectedUser?.id ? "identify":""}`} onClick={()=>setSelectedUser(user)}> 
            <img src={photo}/>
            <h4>{title}</h4>
            <p>{body}</p>
            <p className="jobType">{jobType}</p>
        </div>
    )
}

export default Card;