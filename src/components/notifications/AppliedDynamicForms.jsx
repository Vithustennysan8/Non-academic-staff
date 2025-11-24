import { useEffect, useState } from "react"
import "../../css/Notifications/appliedDynamicForms.css"
import "../../css/Notifications/notifications-content.css"
import FormReqTap from "./FormReqTap.jsx";
import { Axios } from "../AxiosReqestBuilder.jsx";
import { toast } from "react-toastify";
import { useAuth } from "../../Contexts/AuthContext.jsx";
import deleteLogo from "../../assets/delete.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faFilter, faChevronLeft, faChevronRight, faBackspace, faTrash } from "@fortawesome/free-solid-svg-icons";

const AppliedDynamicForms = ({dynamicForms}) => {
    const [showSingleForm, setShowSingleForm] = useState(false);
    const [selectedForm, setSelectedForm] = useState([]);
    const [filterMonth, setFilterMonth] = useState();
    const [filterYear, setFilterYear] = useState('');
    const [filter, setFilter] = useState("Pending");
    const [filterForms, setFilterForms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    
    useEffect(()=>{
        setFilterForms(dynamicForms.filter((form)=> form.formStatus === "Pending"));
        setCurrentPage(1); // Reset to first page when data changes
    },[dynamicForms])


    const handleSingleForm = (form) => {
        setShowSingleForm(true);
        setSelectedForm(form)
    }

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    }

    const handleFilterChange = () => {
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        setShowSingleForm(false); // Reset the form preview when changing the filter
        let filteredForms = dynamicForms;
    
        if(filterYear !== '' && filterYear?.length !== 4){
          toast.warning("Please select a valid year");
          return;
        }
    
        if(filterYear){
          filteredForms = filteredForms.filter((form)=> form.formCreatedAt.substring(0,4) === filterYear);
        }
        if(filterMonth){
          filteredForms = filteredForms.filter((form)=> monthNames[form.formCreatedAt.substring(5,7)-1] === filterMonth);
        }
        if(filter !== "All"){
          filteredForms = filteredForms.filter((form)=> form.formStatus === filter);
        }
        setFilterForms(filteredForms);
        setCurrentPage(1); // Reset to first page after filtering
      };
    
    const handleGetPdf = async (id) => {
      try {
        const response = await Axios.get(`/user/DynamicFormUser/getPdf/${id}`, {
          responseType: "blob", // Important: Treat response as binary
        });
    
        // Create a URL for the blob data
        const fileURL = window.URL.createObjectURL(response.data);
        
        // Open in a new tab
        window.open(fileURL);
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    };

    const handleDelete = async (formId) => {
      if(!window.confirm("Do you want to delete this form?")) return;
      try {
          const response = await Axios.delete(`/user/DynamicFormUser/${formId}`);
          console.log(response.data);
          toast.success("Form deleted successfully");
          window.location.reload();
      }catch(error){
          console.log("Error deleting form", error.message);
      }
    };

    // Pagination calculation
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filterForms.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filterForms.length / itemsPerPage);

  return (
    <div className="appliedDynamicForms">
        <div className="content-header">
          <h2>Applied Dynamic Forms</h2>
          <div className="count-badge">
            <FontAwesomeIcon icon={faFileAlt} />
            {filterForms.length} Forms
          </div>
        </div>

        <div className="filter-container">
            <div className="filter-group">
              <select className="modern-select" value={filter} onChange={e=>setFilter(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="All">All</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>

              <input className="modern-input" type="number" value={filterYear} onChange={e=>setFilterYear(e.target.value)} placeholder="Year"/>
              <select className="modern-select" name="month" value={filterMonth} onChange={(e)=>setFilterMonth(e.target.value)}>
                  <option value="">Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
            </div>
            <button className="filter-btn" onClick={handleFilterChange}>
              <FontAwesomeIcon icon={faFilter} style={{marginRight: '8px'}}/>
              Filter
            </button>
          </div>

          {filterForms.length < 1 ? 
            <div className="empty-state">
              <FontAwesomeIcon icon={faFileAlt} size="3x" style={{marginBottom: '20px', opacity: 0.5}}/>
              <p>No forms match the selected filter!</p>
            </div>
           :
            (
            showSingleForm === true ? 
            <div className="singleForm">
                <button className="closeBtn" onClick={() => setShowSingleForm(false)}><FontAwesomeIcon icon={faBackspace} style={{padding: '4px 8px', color: 'blue', cursor: 'pointer'}} size="lg" /></button>
                <h4 className="formHeading">{selectedForm.form}</h4>
                <button className="deleteBtn" onClick={() => handleDelete(selectedForm.formId)}><FontAwesomeIcon icon={faTrash} style={{padding: '4px 8px', color: 'red', cursor: 'pointer'}} size="lg" /> </button>

                <div className="formDetails">
                {
                    selectedForm.formDetails.map((field, index) => {
                        const [key, value] = Object.entries(field)[0];
                        return (
                            <div key={index} className="wrapper">
                                <p>{key} :</p>
                                <p>{value}</p>
                            </div>
                        )
                    })
                }
                </div>
                {/* display the pdf */}
                <div className="wrapper">
                  <p>Document :</p>
                  <p onClick={() => handleGetPdf(selectedForm.formId)} className="pdf">click here</p>
                </div>

                <div className="devider wrapper">
                  <p>Status :</p>
                  <p className={`${selectedForm.formStatus === "Rejected" && 'status-rejected'} ${selectedForm.formStatus === "Accepted" && 'status-approved'} ${selectedForm.formStatus === "Pending" && 'status-pending'}`}>{selectedForm.formStatus}</p>
                </div>
                {
                selectedForm.approverDetails.map((approver)=>{
                  return(
                    <div key={approver.approverOrder} >
                      <div className="wrapper">
                        <p>{approver.approver} :</p>
                        <p>{approver.approverStatus}</p>
                      </div>
                      { approver.approvalDescription &&
                        <div key={approver.approverOrder} className="wrapper">
                          <p>description</p>
                          <p>: {approver.approvalDescription}</p>
                        </div>
                      }
                    </div>
                  )
                })
              }
            </div> :
            <>
              <div className="cards-grid">
                  { currentItems.map((form, index) => (
                      <div key={index}>
                        <FormReqTap form={form} handleSingleForm={() => handleSingleForm(form) }/>
                      </div>
                  ))}
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
        )}
    </div>
  )
}

export default AppliedDynamicForms