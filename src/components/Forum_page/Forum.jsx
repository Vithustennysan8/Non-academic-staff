import ForumCard from "./ForumCard";
import "../../css/Forum_page/forum.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useAuth } from "../../Contexts/AuthContext";
import { Axios } from "../AxiosReqestBuilder";
import {motion} from "framer-motion";
import { toast } from "react-toastify";

const Forum = () => {
  const { isLogin, user } = useAuth();
  const naviagte = useNavigate();
  const [forumPopup, setForumPopup] = useState(false);
  const [forums, setForums] = useState([]);
  const [editBtn, setEditBtn] = useState(false);
  const [forum, setForum] = useState({
    id: "",
    subject: "",
    body: "",
  });
  const [error, setError] = useState({
    subject: false,
    body: false,
  });

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // 0 = show all
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setTimeout(() => {
      if (!isLogin) {
        naviagte("/login");
      }

      try {
        const fetchForums = async () => {
          const response = await Axios.get("/auth/forum/get");
          const forumsData = Array.isArray(response.data) ? response.data : [];
          setForums(forumsData);
          setCurrentPage(1);
        };
        fetchForums();
      } catch (error) {
        console.log("Error fetching forums", error);
      } finally {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          setIsLoading(false);
        }, 500);
      }
    }, 0);
  }, [naviagte, token, isLogin]);

  const handleChange = (e) => {
    setForum({ ...forum, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleError()) {
      return;
    }
    setForumPopup(false);
    const { subject, body } = forum;
    setForum({ subject: "", body: "" });

    try {
      const response = await Axios.post("/auth/forum/add", { subject, body });
      setForums(response.data);
      toast.success("Forum added successfully!");
      setForums([response.data, ...forums]);
    } catch (error) {
      console.log("Error adding forum", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this forum?")) {
      try {
        const response = await Axios.delete(`/auth/forum/delete/${id}`);
        setForums(response.data);
        toast.success("Forum deleted successfully!");
      } catch (error) {
        console.log("Error deleting forum", error);
      }
    }
  };

  const handleEdit = async (forum) => {
    setEditBtn(true);
    setForumPopup(true);
    setForum(forum);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setForumPopup(false);
    setEditBtn(false);
    const { id, subject, body } = forum;
    setForum({ subject: "", body: "" });

    try {
      const response = await Axios.put(`/auth/forum/update/${id}`, {
        subject,
        body,
      });
      setForums(response.data);
      toast.success("Forum updated successfully!");
    } catch (error) {
      console.log("Error updating forum", error);
    }
  };

  const handleError = () => {
    const newError = {
      subject: false,
      body: false,
    };

    if (forum.subject.trim() === "" || forum.subject.trim() === null) {
      newError.subject = true;
    }

    if (forum.body.trim() === "" || forum.body.trim() === null) {
      newError.body = true;
    }

    setError(newError);

    return newError.subject || newError.body;
  };

  // derived pagination values
  const safeForums = Array.isArray(forums) ? forums : [];
  const totalPages = pageSize === 0 ? 1 : Math.max(1, Math.ceil(safeForums.length / pageSize));
  if (currentPage > totalPages) setCurrentPage(totalPages);

  const displayedForums = pageSize === 0 ? safeForums : (Array.isArray(safeForums) ? safeForums.slice((currentPage - 1) * pageSize, currentPage * pageSize) : []);

  if (isLoading) {
    return (
      <div className="forum-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading forum information...</p>
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
      {(
        <div className="forum-container popupBackground">
          <h2>Non-Academic Forum</h2>

          {!forumPopup && (
            <div className="ForumAddBtn">
              <button
                className="bttn ashbtn"
                onClick={() => setForumPopup(true)}
              >
                Add New Topic
              </button>
            </div>
          )}

          {forumPopup && (
            <div className="forumInputContainer">
              <form>
                <div>
                  <label htmlFor="ForumInputSubject">Subject</label>
                  <input
                    type="text"
                    placeholder="Enter the title"
                    id="forumInputSubject"
                    name="subject"
                    value={forum.subject}
                    onChange={handleChange}
                  />
                  {error.subject && (
                    <p className="error">Subject is required</p>
                  )}
                </div>
                <div>
                  <label htmlFor="ForumInputContent">content</label>
                  <textarea
                    name="body"
                    value={forum.body}
                    onChange={handleChange}
                    id="ForumInputContent"
                    rows={7}
                    placeholder="Enter your thoughts here....."
                  ></textarea>
                  {error.body && <p className="error">Body is required</p>}
                </div>

                {editBtn && (
                  <button
                    className="forumFormSubmitbtn bttn ashbtn"
                    onClick={handleUpdate}
                  >
                    Edit Forum
                  </button>
                )}
                {!editBtn && (
                  <button
                    className="forumFormSubmitbtn bttn ashbtn"
                    onClick={handleSubmit}
                  >
                    Add To Forum
                  </button>
                )}
                <button
                  className="forumFormCancelbtn bttn redbtn"
                  onClick={() => setForumPopup(false)}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}

          <div>
            {isLoading ? (
              <div className="loading-message">
                <p>Loading forums...</p>
              </div>
            ) : (
              displayedForums.length > 0 ? (displayedForums.map((forum) => {
                const date = new Date(forum.updatedAt);
                const datePart = format(date, "MMMM do, yyyy");
                const timePart = format(date, "hh:mm a");

                return (
                  <ForumCard
                    key={forum.id}
                    heading={forum.subject}
                    paragraph={forum.body}
                    date={datePart}
                    user={forum.userName}
                    time={timePart}
                    handleDelete={() => handleDelete(forum.id)}
                    handleEdit={() => handleEdit(forum)}
                    ownerId={forum.user.id}
                    currentUserId={user.id}
                    role={user.role}
                  />
                );
              })
            ) : (
              <div className="card">
                <p className="card-head">No Forums found</p>
            </div>
            ))}
          </div>

          {/* pagination controls */}
          {!isLoading && (
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
                <small>Showing {safeForums.length === 0 ? 0 : (pageSize === 0 ? 1 : ( (currentPage - 1) * pageSize + 1 ))} - {pageSize === 0 ? safeForums.length : Math.min(safeForums.length, currentPage * pageSize)} of {safeForums.length}</small>
              </div>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Forum;
