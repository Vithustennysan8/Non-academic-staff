import { useContext, useEffect, useState } from "react";
import FormPreview from "../forms/FormPreview";
import { useForm } from "react-hook-form";
import "../../css/requestedForms.css";
import FormReqTap from "../Admin/FormReqTap";
import { Axios } from "../AxiosReqestBuilder";
import { UserContext } from "../../Contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../Contexts/LoginContext";

const RequestedForms = ({allLeaveFormRequests, setAllLeaveFormRequests}) => {
  const navigate = useNavigate();
  const { isLogin } = useContext(LoginContext);
  const [Forms, setForms] = useState([]);
  const [Form, setForm] = useState({});
  const [requestForm, setRequestForm] = useState({});
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(UserContext);
  const [isAllNotificationsOpen, setIsAllNotificationsOpen] = useState(true);
  const [all, setAll] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [navigate, isLogin]);

  const onSubmit = async (data) => {
    setShowForm(false);
    const { faculty, department, formType } = data;

    try {
      const response = await Axios.post(`/admin/req/${formType}`, {
        faculty,
        department,
      });
      setForms(response.data);
      setIsAllNotificationsOpen(false);
      setAll(false);
    } catch (error) {
      console.log(">>> " + error);
    }
  };

  const { register, handleSubmit, formState: {errors} } = useForm();
  const [selectedFaculty, setSelectedFaculty] = useState("");

  const faculties = [
    {
      faculty: "Faculty of Engineering",
      department:
        "Chemical and Process Engineering, Computer Engineering, Civil Engineering, Electrical and Electronic Engineering, Engineering Mathematics, Manufacturing and Industrial Engineering, Mechanical Engineering, Dean's Office",
    },
    {
      faculty: "Faculty of Science",
      department:
        "Botany, Chemistry, Environmental and Industrial Sciences, Geology, Statistics and Computer Science, Mathematics, Molecular Biology and Biotechnology, Physics, Zoology, Dean's Office",
    },
    {
      faculty: "Faculty of Arts",
      department:
        "Arabic and Islamic Civilization, Archaeology, Classical Languages, Economics and Statistics, Education, English, English Language Teaching, Fine Arts, Geography, History, Information Technology, Law, Philosophy, Psychology, Political Science, Pali and Buddhist Studies, Sinhala, Sociology, Tamil, Dean's Office",
    },
    {
      faculty: "Faculty of Medicine",
      department:
        "Anatomy, Anaesthesiology and Critical Care, Biochemistry, Community Medicine, Family Medicine, Forensic Medicine, Medical Education, Medicine, Microbiology, Obstetrics and Gynaecology, Paediatrics, Parasitology, Pathology, Pharmacology, Physiology, Psychiatry, Radiology, Surgery, Dean's Office",
    },
    {
      faculty: "Faculty of Veterinary Medicine and Animal Science",
      department:
        "Basic Veterinary Sciences, Veterinary Clinical Sciences, Farm Animal Production and Health, Veterinary Pathobiology, Veterinary Public Health and Pharmacology, Dean's Office",
    },
    {
      faculty: "Faculty of Agriculture",
      department:
        "Agricultural Biology, Agricultural Economics and Business Management, Agricultural Engineering, Agricultural Extension, Animal Science, Crop Science, Food Science and Technology, Soil Science, Dean's Office",
    },
    {
      faculty: "Faculty of Allied Health Sciences",
      department:
        "Medical Laboratory Sciences, Nursing, Pharmacy, Physiotherapy, Radiography and Radiotherapy, Basic Sciences, Dean's Office",
    },
    {
      faculty: "Faculty of Dental Sciences",
      department:
        "Basic Sciences, Community Dental Health, Comprehensive Oral Health Care, Oral Medicine and Periodontology, Oral Pathology, Prosthetic Dentistry, Restorative Dentistry, Oral and Maxillofacial Surgery, Dean's Office",
    },
    {
      faculty: "Faculty of Management",
      department:
        "Business Finance, Human Resource Management, Management Studies, Marketing Management, Operations Management",
    },
    { faculty: "Registrar's Office", department: "Administrative Section" },
    { faculty: "Administration Office", department: "Administrative Section" },
    { faculty: "IT Services", department: "Technical Section" },
    { faculty: "Library Services", department: "Library Section" },
    { faculty: "Facilities Management", department: "Maintenance Section" },
    { faculty: "Security Services", department: "Security Section" },
    { faculty: "Finance Department", department: "Finance Section" },
    { faculty: "Human Resources Department", department: "HR Section" },
    {
      faculty: "Student Affairs Office",
      department: "Student Affairs Section",
    },
  ];

  const departments = faculties.find((faculty) => faculty.faculty === selectedFaculty)?.department.split(", ") || [];

  const handleSingleForm = (id) => {
    setForm(Forms.find((form) => form.id === id));
    setShowForm(true);
  };

  const handleSingleLeaveRequestForm = (id) => {
    setRequestForm(allLeaveFormRequests.find((form) => form.id === id));
    setAll(true);
    setIsAllNotificationsOpen(false);
  };

  const handleShowingAllNotifications = async () => {
    setIsAllNotificationsOpen(true);
    setShowForm(false);

    try {
      const response = await Axios.get("admin/leaveForms/notify");
      setAllLeaveFormRequests(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="RequestedForms">
        <h1>Requested Leave Forms</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="selection-area">
            { user.job_type === "Dean" && <> <div>
              <label htmlFor="faculty">Faculty</label>
              <select
                name="faculty"
                id="faculty"
                {...register("faculty")}
                onChange={(e) => setSelectedFaculty(e.target.value)}
              >
                <option value="">select one....</option>
                {faculties.map((faculty, index) => (
                  <option key={index} value={faculty.faculty}>
                    {faculty.faculty}
                  </option>
                ))}
              </select>
              {errors.faculty && (
                <span className="error">{errors.faculty.message}</span>
              )}
            </div>

            <div>
              <label htmlFor="department">Department</label>
              <select
                id="department"
                name="department"
                {...register("department")}
              >
                <option value="">select one....</option>
                {departments.map((department, index) => (
                  <option key={index} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div> </>}

            <div>
              <label htmlFor="">Form type</label>
              <select
                name="formType"
                id=""
                {...register("formType", {
                  required: {
                    value: true,
                    message: "Form type is required",
                  },
                })}
              >
                <option value="">Select a form type</option>
                <option value="normalLeaveForm">Normal Leave</option>
                <option value="accidentLeaveForm">Accident Leave</option>
                <option value="Vacation Leave">Vacation Leave</option>
                <option value="Overseas Leave">Overseas Leave</option>
                <option value="Medical Leave">Medical Leave</option>
                <option value="Special Leave Granted to an Employee">
                  Special Leave Granted to an Employee
                </option>
                <option value="Maternity Leave">Maternity Leave</option>
                <option value="Sabbatical Leave">Sabbatical Leave</option>
                <option value="Paternal Leave">Paternal Leave</option>
              </select>
              {errors.formType && <span className="error">{errors.formType.message}</span>}
            </div>
          </div>

          <div className="search-btn">
            <input type="submit" className="bttn redbtn" value="Get the Filtered Forms" />
          </div>
          <div className="allLeaveRequest-btn">
            <input
              type="button"
              className="bttn ashbtn"
              value="All Leave Requests"
              onClick={handleShowingAllNotifications}
            />
          </div>
        </form>

        {/* Filtered Leave notifications */}
        {!showForm && !isAllNotificationsOpen && !all && (
          <ul>
            {Forms.map((form, index) => (
              <li
                key={index}
                style={{ listStyle: "none" }}
                onClick={() => handleSingleForm(form.id)}
              >
                <FormReqTap form={form} />
              </li>
            ))}
          </ul>
        )}
        {showForm && !isAllNotificationsOpen && (
          <FormPreview
            application={Form}
            approver={user}
            setForm={setForm}
          />
        )}

        {/* All leave Notifications */}
        {isAllNotificationsOpen && (
          <div className="allNotifications">
            {allLeaveFormRequests.length > 0 ? <h2>All Notifications</h2> : <p>No LeaveForms Found.......</p>}

            {allLeaveFormRequests.map((request, index) => (
              <div
                key={index}
                onClick={() => handleSingleLeaveRequestForm(request.id)}
              >
                <FormReqTap form={request} />
              </div>
            ))}
          </div>
        )}
        {!isAllNotificationsOpen && all && (
          <FormPreview
            application={requestForm}
            approver={user}
            setForm={setRequestForm}
          />
        )}
      </div>
    </>
  );
};

export default RequestedForms;
