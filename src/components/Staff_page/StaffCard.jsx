import "../../css/Staffs_page/staffcard.css"


const Card = ({user, photo, title, body, setSelectedUser }) => {
    
    return (
        <div className="staff-card" onClick={()=>setSelectedUser(user)}> 
            <img src={photo}/>
            <h4>{title}</h4>
            <p>{body}</p>
        </div>
    )
}

export default Card;