import { useEffect, useState } from "react"
import '../css/news.css'
import NewsCards from "./NewsCards";
import { useForm } from "react-hook-form";
import { Axios } from "./AxiosReqestBuilder";
import { format } from "date-fns";

const News = ({role}) => {
    const [news, setNews] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(()=>{
        const getNews = async () => {
            try {
              const response = await Axios.get("/auth/news/get");
              setNews(response.data);
            }catch(error){
              console.log("message ", error);
            }
          }
        getNews();
    },[])

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const onSubmit = async (data) =>{
        try {
            const response = await Axios.post("/admin/news/add", data);
            setNews(response.data);
            setShowForm(false);
        } catch (error) {
            console.log(error);
        }
        reset();
    }

    const handleDelete = async (id) =>{
        try {
            const response = await Axios.delete(`/admin/news/delete/${id}`);
            setNews(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    
  return (

    <div className="newsFeed">
        <h2>Important Announcements</h2>
        { role === "ADMIN" && !showForm && <button className="newsBtn" onClick={()=>setShowForm(!showForm)}>Add</button>}

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
                <textarea name="body" id="body" {...register("body", {required: {
                    value:true,
                    message: "please enter a body"
                }})}></textarea>
                {errors.body && <span className="error">{errors.body.message}</span>}
            </div>
            <div className="addNews">
                <button type="submit" className="newsBtn">Add News</button>
                <button className="newsBtn cancelNews" onClick={()=>setShowForm(false)}>Cancel</button>
            </div>
        </form>}


        {news.map(news => {
            const date = new Date(news.updatedAt);
            const datePart = format(date, 'MMMM do, yyyy');
            const timePart = format(date, 'hh:mm a');
            
            return(
                <NewsCards 
                    role={role}
                    key={news.id}
                    heading={news.heading}
                    body={news.body}
                    date={datePart}
                    time={timePart}
                    user={news.user}
                    handleDelete={()=>handleDelete(news.id)}
                />)
        })}

        </div>
  )
}

export default News