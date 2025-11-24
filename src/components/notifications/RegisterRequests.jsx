import { useState } from "react"
import "../../css/Notifications/registerRequests.css"
import "../../css/Notifications/notifications-content.css"
import { Axios } from "../AxiosReqestBuilder"
import { useAuth } from "../../Contexts/AuthContext"
import accept from "../../assets/accept.png"
import reject from "../../assets/cancel.png"
import view from "../../assets/search.png"
import LoadingAnimation from "../Common/LoadingAnimation"
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const RegisterRequests = ({requests, setRequests}) => {
  const {user} = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleVerify = async (token) => {
    setIsLoading(true);
    try{
      const response = await Axios.put(`admin/verify/${token}`);
      setRequests(response.data);
      setIsLoading(false);
      toast.success("Verified successfully");
      window.location.reload();
    }catch(error){
      console.log("Error verifying user", error.message);
    }
  }

  const handleDelete = async (id) => {
    try{
      const response = (user.role === "SUPER_ADMIN") ? await Axios.delete(`superadmin/delete/${id}`) : await Axios.delete(`admin/deleteUser/${id}`);
      setRequests(response.data);
      toast.success("Deleted successfully");
      window.location.reload();
    }catch(error){
      console.log("Error deleting user", error.message);
    }
  }

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  }

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = requests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  return (
    <div className="registerRequests">
      {isLoading && <LoadingAnimation/>}
      
      <div className="content-header">
        <h2>Register Requests</h2>
        <div className="count-badge">
          <FontAwesomeIcon icon={faUserPlus} />
          {requests.length} Forms
        </div>
      </div>

      { requests.length <= 0 ? 
        <div className="empty-state">
          <FontAwesomeIcon icon={faUserPlus} size="3x" style={{marginBottom: '20px', opacity: 0.5}}/>
          <p>No register requests found...</p>
        </div>
       :
      <>
        <div className="request"> 
          {
            currentItems.map((request)=>(
              <div key={request.id} className="singleRequestTap">
                <p><span className="highlight">Name:</span> {request.user.first_name}</p>
                <p><span className="highlight">Email:</span> {request.user.email}</p>
                <p><span className="highlight">Employee No:</span> {request.user.emp_id}</p>
                <p><span className="highlight">Job Type:</span> {request.user?.jobType || request.user?.job_type}</p>
                <p><span className="highlight">Requested to Register:</span> {request.user.createdAt}</p>
                <div className="buttons">
                  <button className="view-more" onClick={() => setSelectedUser(request)}> <img src={view} alt="view icon" /></button>
                  <button className="verify" onClick={() => handleVerify(request.token)} ><img src={accept} alt="accept icon" /></button>
                  <button className="reject" onClick={() => handleDelete(request.user.id)} ><img src={reject} alt="reject icon" /></button>
                </div>
              </div>
            ))
          }
        </div>

        {/* Pagination Controls */}
        {(
          <div className="pagination-container">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
              Previous
            </button>

            <div className="pagination-info">
              Page {currentPage} of {totalPages}
            </div>

            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <FontAwesomeIcon icon={faChevronRight} />
            </button>

            <div className="items-per-page">
              <label htmlFor="itemsPerPage" className="itemsPerPage">Items per page:</label>
              <select 
                id="itemsPerPage"
                value={itemsPerPage} 
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="items-per-page-select"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        )}
      </>
      }

    {selectedUser && 

                  <div className="modern-popup-overlay">
                    <div className="modern-popup-container">
                      <div className="modern-popup-header">
                        <div className="header-content">
                          <div className="employee-avatar">
                            <span className="avatar-text">
                              {selectedUser.user.first_name?.charAt(0)}{selectedUser.user.last_name?.charAt(0)}
                            </span>
                          </div>
                          <div className="header-info">
                            <h2 className="employee-name">
                              {selectedUser.user.first_name} {selectedUser.user.last_name}
                            </h2>
                            <p className="employee-role">{selectedUser.user.jobType}</p>
                            <p className="employee-id">ID: {selectedUser.user.emp_id}</p>
                          </div>
                        </div>
                        <button
                          className="modern-close-btn"
                          onClick={() => setSelectedUser(null)}
                          aria-label="Close popup"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>

                      <div className="modern-info-content">
                        <div className="info-category">
                          <h3 className="category-title">
                            <span className="category-icon">👤</span>
                            Personal Information
                          </h3>
                          <div className="info-cards">
                            <div className="info-card">
                              <div className="card-icon">📧</div>
                              <div className="card-content">
                                <span className="card-label">Email</span>
                                <span className="card-value">{selectedUser.user.email}</span>
                              </div>
                            </div>
                            <div className="info-card">
                              <div className="card-icon">📱</div>
                              <div className="card-content">
                                <span className="card-label">Mobile</span>
                                <span className="card-value">{selectedUser.user.phone_no}</span>
                              </div>
                            </div>
                            <div className="info-card">
                              <div className="card-icon">🎂</div>
                              <div className="card-content">
                                <span className="card-label">Date of Birth</span>
                                <span className="card-value">{selectedUser.user.date_of_birth?.substring(0, 10)}</span>
                              </div>
                            </div>
                            <div className="info-card">
                              <div className="card-icon">⚧</div>
                              <div className="card-content">
                                <span className="card-label">Gender</span>
                                <span className="card-value">{selectedUser.user.gender}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="info-category">
                          <h3 className="category-title">
                            <span className="category-icon">🏢</span>
                            Work Information
                          </h3>
                          <div className="info-cards">
                            <div className="info-card">
                              <div className="card-icon">🎓</div>
                              <div className="card-content">
                                <span className="card-label">Faculty</span>
                                <span className="card-value">{selectedUser.user.faculty}</span>
                              </div>
                            </div>
                            <div className="info-card">
                              <div className="card-icon">🏛️</div>
                              <div className="card-content">
                                <span className="card-label">Department</span>
                                <span className="card-value">{selectedUser.user.department}</span>
                              </div>
                            </div>
                            <div className="info-card">
                              <div className="card-icon">💼</div>
                              <div className="card-content">
                                <span className="card-label">Job Type</span>
                                <span className="card-value">{selectedUser.user.jobType}</span>
                              </div>
                            </div>
                            <div className="info-card">
                              <div className="card-icon">🆔</div>
                              <div className="card-content">
                                <span className="card-label">Identity Card</span>
                                <span className="card-value">{selectedUser.user.ic_no}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="info-category">
                          <h3 className="category-title">
                            <span className="category-icon">📍</span>
                            Address Information
                          </h3>
                          <div className="info-cards">
                            <div className="info-card full-width">
                              <div className="card-icon">🏠</div>
                              <div className="card-content">
                                <span className="card-label">Address</span>
                                <span className="card-value">{selectedUser.user.address}</span>
                              </div>
                            </div>
                            <div className="info-card">
                              <div className="card-icon">🏙️</div>
                              <div className="card-content">
                                <span className="card-label">City</span>
                                <span className="card-value">{selectedUser.user.city}</span>
                              </div>
                            </div>
                            <div className="info-card">
                              <div className="card-icon">📮</div>
                              <div className="card-content">
                                <span className="card-label">Postal Code</span>
                                <span className="card-value">{selectedUser.user.postal_code}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        }

      </div>
    )
    
}

export default RegisterRequests
