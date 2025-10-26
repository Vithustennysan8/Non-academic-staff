import { useEffect, useState } from "react"
import '../../css/Home/news.css'
import NewsCards from "./NewsCards";
import { useForm } from "react-hook-form";
import { Axios } from ".././AxiosReqestBuilder";
import { useAuth } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const News = ({role}) => {
    const {isLogin} = useAuth();
    const [news, setNews] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showUpdateBtn, setShowUpdateBtn] = useState(false);
    const [updateNews, setUpdateNews] = useState(null);

    useEffect(()=>{
        if(isLogin){   
            const getNews = async () => {
                try {
                    const response = await Axios.get("/auth/news/get");
                    setNews(response.data);
                }catch(error){
                    console.log("Error fetching news", error);
                }
            }
            getNews();
        }
    },[])

    const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm();

    const onSubmit = async (data) =>{
        let fileData = new FormData();
        if(data.images[0]){
            fileData.append('images', data.images[0]);
        }

        Object.keys(data).forEach( key => {
            if(key !== 'images'){
                fileData.append(key, data[key]);
            }
        })

        try {
            const response = showUpdateBtn ? await Axios.put(`/admin/news/update/${updateNews.id}`, fileData) : 
            await Axios.post(`/admin/news/add`, fileData);
            setNews(response.data);
            toast.success(showUpdateBtn ? "News updated successfully" : "News added successfully");
            setShowUpdateBtn(false);
            setShowForm(false);
        } catch (error) {
            console.log(showUpdateBtn ? "Error updating news" : "Error adding news", error.message);
        }
        reset();
    }

    const handleDelete = async (id) =>{
        try {
            const response = await Axios.delete(`/admin/news/delete/${id}`);
            setNews(response.data);
            toast.success("News deleted successfully");
        } catch (error) {
            console.log("Error deleting news", error.message);
        }
    }
    
    const handleUpdate = (news) =>{
        setShowUpdateBtn(true);
        setShowForm(true);
        setValue("heading", news.heading);
        setValue("body", news.body);
        setUpdateNews(news);
    }


  return (

    <div className="newsFeed" id="news">
        <h2>Important Announcements</h2>
        { role !== "USER" && !showForm && <button className="ashbtn bttn newsbtn" 
        onClick={()=>{
            setShowForm(!showForm)
            setShowUpdateBtn(false);
        }}>Add</button>}

        { showForm &&
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="news-group">
                <label htmlFor="heading">Heading</label>
                <input type="text" name="heading" {...register("heading", {required: {
                    value: true,
                    message: "Please enter a heading",
                }})}/>
                {errors.heading && <span className="error">{errors.heading.message}</span>}
            </div>

            <div className="news-group">
                <label htmlFor="body">body</label>
                <textarea name="body" rows={8} id="body" {...register("body", {required: {
                    value:true,
                    message: "please enter a body"
                }})}></textarea>
                {errors.body && <span className="error">{errors.body.message}</span>}
            </div>
            <div>
                <label htmlFor="images">Image</label>
                <input type="file" name="images" multiple {...register("images")}/>
            </div>
            <div className="addNews">
                {!showUpdateBtn && <button type="submit" className="ashbtn bttn newsbtn">Add News</button>}
                {showUpdateBtn && <button type="submit" className="ashbtn bttn newsbtn">Update News</button>}
                <button className="bttn redbtn" onClick={()=>{
                    setShowForm(false);
                    reset();
                }}>Cancel</button>
            </div>
        </form>}

        {isLogin ? (
            news.slice(0, 2).map(news => { 
                return(
                <NewsCards 
                role={role}
                key={news.id}
                heading={news.heading}
                news={news}
                handleDelete={()=>handleDelete(news.id)}
                handleUpdate={() => handleUpdate(news)}
                />)
        })):(
            <div className="card">
                <div className="noNews">
                    <p className="card-head">{"Convacation"}</p>
                    <div className="newsDateAndTime">
                    <p className="newsDate">Date: {"23rd Aug, 2024"}</p>
                    <p className="newsTime">Time: {"8.30 am"}</p>
                    </div>
                    <p className="card-body">{"Happy to share that, Our University convacation will happen......."}</p>
                    <p className="reporter">by - {"Vice chanceller"}</p>
                </div>
            </div>
        )}      

        <Link to={"/news"} className="seeMore">See more -&gt;</Link>
        
    </div>
  )
}

export default News