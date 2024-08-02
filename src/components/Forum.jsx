import ForumCard from "./ForumCard";
import "../css/forum.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import LoadingAnimation from "./LoadingAnimation";

const Forum = () => {
    const naviagte = useNavigate();
    const [forumPopup, setForumPopup] = useState(false);
    const [isloading, setIsLoading] = useState(true);
    const [forums, setForums] = useState([]);
    const [editBtn, setEditBtn] = useState(false);
    const [forum, setForum] = useState({
        id:'',
        subject:'',
        body:''
    });


    const token = localStorage.getItem("token")
    
    useEffect(()=>{

        setTimeout(() => {
            
            if(token == null){
                naviagte("/login");
            }

        try {
            const fetchForums = async ()=>{
                
                const response = await axios.get("http://localhost:8080/api/auth/forum/get");
                setForums(response.data);
                setIsLoading(false);
            };
            fetchForums();
        } catch (error) {
            console.log("fetchError " + error)
        }

        }, 600);
    },[naviagte,token])


    // const {register, handleSubmit, formState : {errors}} = useForm();
    const handleChange = (e) => {
        setForum({...forum, [e.target.name]:e.target.value})
    }

    const handleSubmit = async () => {
        setForumPopup(false);
        const {subject, body} = forum
        setForum({subject:'',body:''})

        try {
            const response = await axios.post("http://localhost:8080/api/auth/forum/add",{subject,body},
                {
                    headers:{
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            console.log(response.data);
            setForums([response.data,...forums]);
        } catch (error) {
            console.log("useFormError "+error)
        }
    }

    const handleDelete = async (id) => {
        
        try {
            const response = await axios.delete(`http://localhost:8080/api/auth/forum/delete/${id}`,
            {
                headers:{
                    "Authorization": `Bearer ${token}`
                    }
                })
            setForums(response.data);
            console.log("deleteSuccess");
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = async (forum) => {
        setEditBtn(true)
        setForumPopup(true);
        setForum(forum);
    }

    const handleUpdate = async () => {
        setForumPopup(false);
        setEditBtn(false)
        const {id,subject, body} = forum
        setForum({subject:'',body:''})

        try {
            const response = await axios.put(`http://localhost:8080/api/auth/forum/update/${id}`, {subject,body})
            setForums(response.data);
        } catch (error) {
            console.log("useFormError "+error)
        }
    }


  return (
    <>
    {isloading? <LoadingAnimation/> :
    <div className="forum-container popupBackground">
        <h2>Non-Academic Forum</h2>

        { !forumPopup &&<div className="ForumAddBtn">
            <button onClick={()=>setForumPopup(true)}>Add New Topic</button>
        </div>}
        
        { forumPopup && <div  className='forumInputContainer'>
            
            <form  >
                <div>
                    <label htmlFor="ForumInputSubject">Subject</label>
                    <input type="text" placeholder="Enter the title" id="forumInputSubject" name="subject" value={forum.subject} onChange={handleChange}  />
                    {/* <input type="text" placeholder="Enter the title" id="forumInputSubject" name="subject" {...register("subject",{required:{
                        value:true,
                        message:"Please enter the subject"
                    }})}/> */}
                    {/* {errors.subject && <p className="error">{errors.subject.message}</p>} */}
                </div>
                <div>
                    <label htmlFor="ForumInputContent">content</label>
                    <textarea name="body" value={forum.body} onChange={handleChange} id="ForumInputContent" rows={7} placeholder="Enter your thoughts here....."></textarea>
                    {/* <textarea name="body" {...register("body",{required:{
                        value:true,
                        message:"Please enter your thoughts here"
                    }})} id="ForumInputContent" rows={7} placeholder="Enter your thoughts here....."></textarea> */}
                    {/* {errors.body && <p className="error">{errors.body.message}</p>} */}
                </div>
 
                { editBtn && <button className="forumFormSubmitbtn" onClick={handleUpdate}>Edit Forum</button>}
                { !editBtn && <button className="forumFormSubmitbtn"  onClick={handleSubmit}>Add To Forum</button>}
                <button className="forumFormCancelbtn" onClick={()=>setForumPopup(false)}>Cancel</button>
            </form>
        </div>
        }

        <div>
            {forums.map((forum)=>{
                const date = new Date(forum.updatedAt);
                const datePart = format(date, 'MMMM do, yyyy');
                const timePart = format(date, 'hh:mm a');
                
                return(
                    <ForumCard
                    key={forum.id}
                    heading={forum.subject}
                    paragraph={forum.body}
                    date={datePart}
                    user={forum.user}
                    time={timePart}
                    handleDelete={()=>handleDelete(forum.id)}
                    handleEdit={()=>handleEdit(forum)}
                    />)
                })}
        </div>

    </div>
    }
    </>
  )
}

export default Forum