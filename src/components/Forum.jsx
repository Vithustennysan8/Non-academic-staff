import Header from "./Header";
import Footer from "./Footer";
import ForumCard from "./ForumCard";
import "../css/forum.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const Forum = () => {
    const naviagte = useNavigate();
    const [forumPopup, setForumPopup] = useState(false);
    const [forums, setForums] = useState([]);
    const [addForum, setAddForum] = useState({
        user:'',
        subject:'',
        body:'',
        createdAt:''
    });

    const token = localStorage.getItem("token")
    
    useEffect(()=>{
        if(token == null){
          naviagte("/login");
        }

        try {
            const fetchForums = async ()=>{

                const response = await axios.get("http://localhost:8080/auth/forum/get");
                setForums(response.data);
            };
            fetchForums();
        } catch (error) {
            console.log("fetchError " + error)
        }

    },[naviagte,token])


    const showForumInput = ()=>{
        setForumPopup(true);
    }

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setAddForum({...addForum, [name]:value}); 
    }
    
    const handleForumSubmit = async (e)=>{
        e.preventDefault();
        
        if(addForum.subject == '' || addForum.body == ''){
            alert("Please fill all the fields");
            return;
        }
        setForumPopup(false);

        try {

            const response = await axios.post("http://localhost:8080/auth/forum/add",addForum,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                        }
                }
            )
            console.log(response.data);
            setForums([response.data,...forums]);
            setAddForum({user:'',subject:'',body:'',createdAt:''});

        } catch (error) {
            console.log("forumError "+ error);
        }
    }

    const handleForumCancel = ()=>{
        setForumPopup(false);
    }


  return (
    <>
    <Header/>
    <div className="forum-container popupBackground">
        <h2>Non-Academic Forum</h2>

        { !forumPopup &&<div className="ForumAddBtn">
            <button onClick={showForumInput}>Add New Topic</button>
        </div>}
        
        { forumPopup && <div  className='forumInputContainer'>
            
            <form action="" >
                <div>
                    <label htmlFor="ForumInputSubject">Subject</label>
                    <input type="text" placeholder="Enter the title" id="forumInputSubject" name="subject" value={addForum.subject} onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="ForumInputContent">content</label>
                    <textarea name="body" value={addForum.body} onChange={handleChange} id="ForumInputContent" rows={7} placeholder="Enter your thoughts here....."></textarea>
                </div>
                <div>
                    <label htmlFor="ForumInputFile">Add any files</label>
                    <input type="file" id="ForumInputFile" />
                </div>
                <button className="forumFormSubmitbtn" onClick={handleForumSubmit}>Add To Forum</button>
                <button className="forumFormCancelbtn" onClick={handleForumCancel}>Cancel</button>
            </form>
        </div>
        }

        <div>
            {forums.map((forum)=>{
                const date = new Date(forum.createdAt);
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
                />)
            })}
        </div>

    </div>
    <Footer/>
    </>
  )
}

export default Forum