import { useEffect, useState } from "react";
import "../../css/NewsPage/newspage.css"
import { Axios } from "../AxiosReqestBuilder";
import NewsCards from "../Home/NewsCards.jsx";
import { useAuth } from "../../Contexts/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const News = () => {
    const { user, isLogin } = useAuth();
    const [news, setNews] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showUpdateBtn, setShowUpdateBtn] = useState(false);
    const [updateNews, setUpdateNews] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // 0 = show all

    useEffect(()=>{
        if(isLogin){   
            const getNews = async () => {
                try {
                    const response = await Axios.get("/user/news/get");
                    setNews(response.data);
                    setCurrentPage(1);
                }catch(error){
                    console.log("Error fetching news", error);
                }finally{
                    setTimeout(() => {
                        window.scrollTo({top:0, behavior:"smooth"});
                        setIsLoading(false);
                    }, 500);
                }
            }
            getNews();
        }
    },[isLogin])

    const {register, handleSubmit, formState: {errors}, reset, setValue} = useForm();

    const onSubmit = async (data) =>{
        let fileData = new FormData();
        if(data.images && data.images[0]){
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
            setShowUpdateBtn(false);
            setShowForm(false);
            setCurrentPage(1);
            toast.success(showUpdateBtn ? "News updated successfully!" : "News added successfully!");
        } catch (error) {
            console.log(showUpdateBtn ? "Error updating news" : "Error adding news", error);
        }
        reset();
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this news?")) {
            try {
                const response = await Axios.delete(`/admin/news/delete/${id}`);
                setNews(response.data);
                setCurrentPage(1);
                toast.success("News deleted successfully!");
            } catch (error) {
                console.log("Error deleting news", error);
            }
        }
    }
    
    const handleUpdate = (news) =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
        setShowUpdateBtn(true);
        setShowForm(true);
        setValue("heading", news.heading);
        setValue("body", news.body);
        setUpdateNews(news);
    }

    // derived pagination values
    const safeNews = news || [];
    const totalPages = pageSize === 0 ? 1 : Math.max(1, Math.ceil(safeNews.length / pageSize));
    if (currentPage > totalPages) setCurrentPage(totalPages);

    const displayedNews = pageSize === 0 ? safeNews : safeNews.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  
    if (isLoading) {
        return (
            <div className="contact_container">
                <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading home information...</p>
                </div>
            </div>
            );
        }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="newsPage">
        <h2>News</h2>
        { isLogin &&user?.role !== "USER" && !showForm && <button className="ashbtn bttn newsbtn" 
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
                <button type="button" className="bttn redbtn" onClick={()=>{ // prevent accidental submit
                    setShowForm(false);
                    reset();
                }}>Cancel</button>
            </div>
        </form>}

        {isLogin ? (
            <>
            {displayedNews.length > 0 ? (displayedNews.map(item => { 
                return(
                <NewsCards 
                role={user?.role}
                key={item.id}
                heading={item.heading}
                news={item}
                handleDelete={()=>handleDelete(item.id)}
                handleUpdate={() => handleUpdate(item)}
                />)
            })) : (
                <div className="card">
                    <div className="noNews">
                        <p className="card-head">No news found</p>
                    </div>
                </div>
            )}

            {/* pagination controls */}
            <div className="pagination">
                <div>
                    <label>Page size:</label>
                    <select value={pageSize} onChange={(e)=>{ setPageSize(Number(e.target.value)); setCurrentPage(1); }}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={0}>All</option>
                    </select>
                </div>

                <div>
                    <button type="button" onClick={()=>setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1}>Prev</button>
                    {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
                        <button key={p} type="button" className={p === currentPage ? 'ashbtn' : ''} onClick={()=>setCurrentPage(p)}>{p}</button>
                    ))}
                    <button type="button" onClick={()=>setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages}>Next</button>
                </div>

                <div>
                    <small>Showing {safeNews.length === 0 ? 0 : (pageSize === 0 ? 1 : ( (currentPage - 1) * pageSize + 1 ))} - {pageSize === 0 ? safeNews.length : Math.min(safeNews.length, currentPage * pageSize)} of {safeNews.length}</small>
                </div>
            </div>
            </>
        ):(
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
    </div>
    </motion.div>
  )
}

export default News