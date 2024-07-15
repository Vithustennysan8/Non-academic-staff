import Header from "./Header";
import Footer from "./Footer";
import ForumCard from "./ForumCard";
import "../css/forum.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Forum = () => {
    const naviagte = useNavigate();
    const [forumPopup, setForumPopup] = useState(false);
    
    useEffect(()=>{
        if(localStorage.getItem("token") == null){
          naviagte("/login");
        }
    },[naviagte])


    const showForumInput = ()=>{
        setForumPopup(true);
    }
    
    const handleForumSubmit = (e)=>{
        e.preventDefault();
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
                    <input type="text" placeholder="Enter the title" id="forumInputSubject" />
                </div>
                <div>
                    <label htmlFor="ForumInputContent">content</label>
                    <textarea name="" id="ForumInputContent" rows={7} placeholder="Enter your thoughts here....."></textarea>
                </div>
                <div>
                    <label htmlFor="ForumInputFile">Add any files</label>
                    <input type="file" id="ForumInputFile" />
                </div>
                <button onClick={handleForumSubmit}>Add To Forum</button>
            </form>
        </div>
        }

        <ForumCard heading={"Strike against union"} user={"Vithustennysan E.T.L."} date={"2024/12/04"} time={"9.32 am"} paragraph={'Lorem ipsum dolor sit amet consectetur adipisicing elit. At similique voluptas in, sequi repellat eaque vel quaerat a doloremque vitae placeat ipsa! Fugit odio optio voluptatum corrupti suscipit atque labore nisi odit earum cumque, exercitationem maxime nesciunt doloribus ex est repellat qui hic nulla! Eos tempora eum quibusdam, ducimus accusantium dolor atque numquam nihil? Delectus et voluptatibus possimus tenetur excepturi ut soluta nisi at ullam molestiae sunt ipsam sit perspiciatis quaerat, eos pariatur. Laudantium, ad.'
        }/>

        <ForumCard heading={"Strike against union"} user={"Vithustennysan E.T.L."} date={"2024/12/04"} time={"9.32 am"} paragraph={'Lorem ipsum dolor sit amet consectetur adipisicing elit. At similique voluptas in, sequi repellat eaque vel quaerat a doloremque vitae placeat ipsa! Fugit odio optio voluptatum corrupti suscipit atque labore nisi odit earum cumque, exercitationem maxime nesciunt'
        }/>

        <ForumCard heading={"Strike against union"} user={"Vithustennysan E.T.L."} date={"2024/12/04"} time={"9.32 am"} paragraph={'Lorem ipsum dolor sit amet consectetur adipisicing elit. At similique voluptas in, sequi repellat eaque vel quaerat a doloremque vitae placeat ipsa! Fugit odio optio voluptatum corrupti suscipit atque labore nisi '
        }/>

    </div>
    <Footer/>
    </>
  )
}

export default Forum