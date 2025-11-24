import { useEffect, useState } from "react";
import "../../css/Notifications/notifications-content.css";
import FormPreview from "../forms/FormPreview";
import { useAuth } from "../../Contexts/AuthContext";
import FormReqTap from "./FormReqTap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileSignature, faFilter, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const AppliedLeaveForms = ({ appliedLeaveForms }) => {
  const { user } = useAuth();
  const [form, setForm] = useState(null);
  const [filter, setFilter] = useState("Pending");
  const [filterYear, setFilterYear] = useState('');
  const [filterMonth, setFilterMonth] = useState();
  const [filterForms, setFilterForms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);

  useEffect(()=>{
    setFilterForms(appliedLeaveForms.filter((form)=> form.status === "Pending"));
    setCurrentPage(1); // Reset to first page when data changes
  },[appliedLeaveForms])

  // Handle form selection for preview
  const handleSingleForm = (id, formType) => {
    const selectedForm = appliedLeaveForms.find(
      (form) => form.id === id && form.formType === formType
    );
    setForm(selectedForm);
    setShowForm(true);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
  }

  // Handle filter change
  const handleFilterChange = () => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    setForm(null); // Reset the form preview when changing the filter
    let filteredForms = appliedLeaveForms;

    if(filterYear !== '' && filterYear?.length !== 4){
      toast.warning("Please select a valid year");
      return;
    }

    if(filterYear){
      filteredForms = filteredForms.filter((form)=> form.leaveAt.substring(0,4) === filterYear);
    }
    if(filterMonth){
      filteredForms = filteredForms.filter((form)=> monthNames[form.leaveAt.substring(5,7)-1] === filterMonth);
    }
    if(filter !== "All"){
      filteredForms = filteredForms.filter((form)=> form.status === filter);
    }
    setFilterForms(filteredForms);
    setCurrentPage(1); // Reset to first page after filtering
  };

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterForms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filterForms.length / itemsPerPage);

  return (
    <div className="appliedLeaveForms">
      <div className="content-header">
        <h2>Applied Leave Forms</h2>
        <div className="count-badge">
          <FontAwesomeIcon icon={faFileSignature} />
          {filterForms.length} Forms
        </div>
      </div>

      {appliedLeaveForms.length === 0 ? (
        <div className="empty-state">
          <FontAwesomeIcon icon={faFileSignature} size="3x" style={{marginBottom: '20px', opacity: 0.5}}/>
          <p>Forms not found...</p>
        </div>
      ) : (
        <>
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

          <div className="ownLeaveForms">
            {filterForms.length < 1 ? 
              <div className="empty-state">
                <FontAwesomeIcon icon={faFileSignature} size="3x" style={{marginBottom: '20px', opacity: 0.5}}/>
                <p>No forms match the selected filter!</p>
              </div>
             :
              showForm ? (
                <FormPreview application={form} approver={user} setShowForm={setShowForm}/>
              ) : (
                <>
                  <div className="cards-grid">
                    {currentItems?.map((form, id) => (
                      <div key={id}>
                        <FormReqTap form={form} handleSingleForm={()=>handleSingleForm(form.id, form.formType)}/>
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
              )
            }
          </div>
        </>
      )}
    </div>
  );
};

export default AppliedLeaveForms;
