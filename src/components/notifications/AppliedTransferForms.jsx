import { useContext, useEffect, useState } from "react";
import "../../css/Notifications/appliedTransferForms.css"
import { useAuth } from "../../Contexts/AuthContext";
import FormPreview from "../forms/FormPreview";
import FormReqTap from "./FormReqTap";
import { toast } from "react-toastify";

const AppliedTransferForms = ({appliedTransferForms}) => {
  const { user } = useAuth();
  const [form, setForm] = useState(null);
  const [filter, setFilter] = useState("Pending");
  const [filterYear, setFilterYear] = useState('');
  const [filterMonth, setFilterMonth] = useState();
  const [filterForms, setFilterForms] = useState([]);

  useEffect(()=>{
    const filteredForms = appliedTransferForms.filter((form)=> form.status === "Pending")
    console.log(filteredForms)
    setFilterForms(filteredForms);
  },[appliedTransferForms])
  

  // Handle form selection for preview
  const handleSingleForm = (id, formType) => {
    const selectedForm = appliedTransferForms.find(
      (form) => form.id === id && form.formType === formType
    );
    setForm(selectedForm);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    setForm(null); // Reset the form preview when changing the filter
    let filteredForms = appliedTransferForms;

    if(filterYear !== '' && filterYear?.length !== 4){
      toast.warning("Please select a valid year");
      return;
    }

    if(filterYear){
      filteredForms = filteredForms.filter((form)=> form.createdAt.substring(0,4) === filterYear);
    }
    if(filterMonth){
      filteredForms = filteredForms.filter((form)=> monthNames[form.createdAt.substring(5,7)-1] === filterMonth);
    }
    if(filter !== "All"){
      filteredForms = filteredForms.filter((form)=> form.status === filter);
    }
    setFilterForms(filteredForms);
  };

  return (
    <div className="appliedTransferForms">
      <h1>Applied Transfer Forms</h1>

      {appliedTransferForms.length === 0 ? (
        <p className="empty">Forms not found...</p>
      ) : (
        <>
          <div className="leaveFilterTaps">
            <div className="taps">
                <select value={filter} onChange={e=>setFilter(e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="All">All</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>

                <input type="number" value={filterYear} onChange={e=>setFilterYear(e.target.value)} placeholder="Year"/>
                <select name="month" value={filterMonth} onChange={(e)=>setFilterMonth(e.target.value)}>
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
              <button className="bttn ashbtn" onClick={handleFilterChange}>Filter</button>
          </div>

          <div className="ownLeaveForms">
            <h3 className="formFilterType">{filter} Forms</h3>

            <div className="formCount">
            <span className="file-icon" title="Forms">
              <svg width="18" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#0051ddff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2v6h6" stroke="#005effff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 13h8M8 17h8" stroke="#0052e1ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            {filterForms.length}
          </div>
          
            {filterForms.length < 1? <p className="empty">No forms match the selected filter!</p> :
              form ? (
                <FormPreview application={form} approver={user} setForm={setForm}/>
              ) : (
                <ul>
                {filterForms?.map((form, id) => (
                    <li key={id} style={{ listStyle: "none" }}>
                      <FormReqTap form={form} handleSingleForm={()=>handleSingleForm(form.id, form.formType)}/>
                      </li>
                    ))}
                    </ul>
                  )
              }
          </div>
        </>
      )}
    </div>
  );
}

export default AppliedTransferForms