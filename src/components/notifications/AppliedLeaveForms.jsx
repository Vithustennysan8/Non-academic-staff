import { useContext, useMemo, useState } from "react";
import "../../css/Notifications/appliedLeaveForms.css";
import FormPreview from "../forms/FormPreview";
import { UserContext } from "../../Contexts/UserContext";
import FormReqTap from "./FormReqTap";

const AppliedLeaveForms = ({ appliedLeaveForms }) => {
  const { user } = useContext(UserContext);
  const [form, setForm] = useState(null);
  const [filter, setFilter] = useState("Pending");

  // Memoize filtered forms based on the selected filter
  const filteredForms = useMemo(() => {
    if (filter === "Accepted") {
      return appliedLeaveForms.filter((form) => form.status === "Accepted");
    } else if (filter === "Rejected") {
      return appliedLeaveForms.filter((form) => form.status === "Rejected");
    }else if(filter === "Pending"){
      return appliedLeaveForms.filter((form) => form.status === "Pending");
    }else{
      return appliedLeaveForms;
    }
  }, [appliedLeaveForms, filter]);

  // Handle form selection for preview
  const handleSingleForm = (id, formType) => {
    const selectedForm = appliedLeaveForms.find(
      (form) => form.id === id && form.formType === formType
    );
    setForm(selectedForm);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setForm(null); // Reset the form preview when changing the filter
    setFilter(e.target.value);
  };

  return (
    <div className="appliedLeaveForms">
      <h1>Applied Leave Forms</h1>
      {appliedLeaveForms.length === 0 ? (
        <p className="empty">Forms not found...</p>
      ) : (
        <>
          <div className="leaveFilterTaps">
          <select onClick={e=> handleFilterChange(e)}>
              <option value="Pending">Pending</option>
              <option value="All">All</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="ownLeaveForms">
            <h3 className="formFilterType">{filter} Forms</h3>
            {form ? (
              <FormPreview
                application={form}
                approver={user}
                setForm={setForm}
              />
            ) : (
              <ul>
                {filteredForms?.map((form, id) => (
                  <li
                    key={id}
                    style={{ listStyle: "none" }}
                  >
                    <FormReqTap form={form} handleSingleForm={()=>handleSingleForm(form.id, form.formType)}/>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AppliedLeaveForms;
