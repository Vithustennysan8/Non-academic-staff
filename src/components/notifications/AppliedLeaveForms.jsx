import { useContext, useMemo, useState } from "react";
import "../../css/Notifications/appliedLeaveForms.css";
import FormPreview from "../forms/FormPreview";
import { UserContext } from "../../Contexts/UserContext";
import FormReqTap from "./FormReqTap";

const AppliedLeaveForms = ({ appliedLeaveForms }) => {
  const { user } = useContext(UserContext);
  const [form, setForm] = useState(null);
  const [filter, setFilter] = useState("All");

  // Memoize filtered forms based on the selected filter
  const filteredForms = useMemo(() => {
    if (filter === "Accepted") {
      return appliedLeaveForms.filter((form) => form.status === "Accepted");
    } else if (filter === "Rejected") {
      return appliedLeaveForms.filter((form) => form.status === "Rjected");
    }
    return appliedLeaveForms;
  }, [appliedLeaveForms, filter]);

  // Handle form selection for preview
  const handleSingleForm = (id, formType) => {
    const selectedForm = appliedLeaveForms.find(
      (form) => form.id === id && form.formType === formType
    );
    setForm(selectedForm);
  };

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setForm(null); // Reset the form preview when changing the filter
    setFilter(newFilter);
  };

  return (
    <div className="appliedLeaveForms">
      <h1>Applied Leave Forms</h1>
      {appliedLeaveForms.length === 0 ? (
        <p className="empty">Forms not found...</p>
      ) : (
        <>
          <div className="leaveFilterTaps">
            <button
              className="bttn ashbtn"
              onClick={() => handleFilterChange("All")}
            >
              Applied Leave Forms
            </button>
            <button
              className="bttn ashbtn"
              onClick={() => handleFilterChange("Accepted")}
            >
              Accepted Forms
            </button>
            <button
              className="bttn redbtn"
              onClick={() => handleFilterChange("Rejected")}
            >
              Rejected Forms
            </button>
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
                {filteredForms.map((form) => (
                  <li
                    key={form.id}
                    style={{ listStyle: "none" }}
                    onClick={() => handleSingleForm(form.id, form.formType)}
                  >
                    <FormReqTap form={form} />
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
