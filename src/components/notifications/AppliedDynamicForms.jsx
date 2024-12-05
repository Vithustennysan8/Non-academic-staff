import { useEffect, useState } from "react"
import "../../css/Notifications/appliedDynamicForms.css"
import { Axios } from "../AxiosReqestBuilder";
import FormReqTap from "./FormReqTap.jsx";

const AppliedDynamicForms = ({dynamicForms}) => {
    const [showSingleForm, setShowSingleForm] = useState(false);
    const [selectedForm, setSelectedForm] = useState([]);
    const [filterMonth, setFilterMonth] = useState();
    const [filterYear, setFilterYear] = useState('');
    const [filter, setFilter] = useState("Pending");
    const [filterForms, setFilterForms] = useState([]);

    
    useEffect(()=>{
        setFilterForms(dynamicForms.filter((form)=> form.formStatus === "Pending"));
    },[dynamicForms])


    const handleSingleForm = (form) => {
        setShowSingleForm(true);
        setSelectedForm(form)
    }

    const handleFilterChange = () => {
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        setShowSingleForm(false); // Reset the form preview when changing the filter
        let filteredForms = dynamicForms;
    
        if(filterYear !== '' && filterYear?.length !== 4){
          alert("Please select a valid year");
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
      };

  return (
    <div className="appliedDynamicForms">
        <h2>Applied Dynamic Forms</h2>

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

          <h3 className="formFilterType">{filter} Forms</h3>
          {filterForms.length < 1 ? <p className="empty">No forms match the selected filter!</p> :
            (
            showSingleForm === true ? 
            <div className="singleForm">
                <h4 className="formHeading">{selectedForm.form}</h4>
                {
                    selectedForm.formDetails.map((field, index) => {
                        const [key, value] = Object.entries(field)[0];
                        return (
                            <div key={index}>
                                <p>{key}</p>
                                <p>: {value}</p>
                            </div>
                        )
                    })
                }
                
            </div> :
            <div className="appliedDynamicForms__container">
                { filterForms.map((form, index) => (
                    <FormReqTap key={index} form={form} handleSingleForm={() => handleSingleForm(form) }/>
                ))}
            </div>
        )}
    </div>
  )
}

export default AppliedDynamicForms