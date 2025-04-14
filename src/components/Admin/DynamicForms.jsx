import { useContext, useEffect, useState } from "react";
import "../../css/Admin/dynamicForms.css";
import { UserContext } from "../../Contexts/UserContext";
import { Axios } from "../AxiosReqestBuilder";
import Swal from "sweetalert2";

const DynamicForms = () => {
  const { user } = useContext(UserContext);
  const [dynamicForms, setDynamicForms] = useState([]);

  useEffect(() => {
    const fetchDynamicFormList = async () => {
      try {
        const response = await Axios.get("/admin/dynamicForm/getAll");
        console.log(response.data);
        setDynamicForms(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDynamicFormList();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await Axios.delete(
        `/auth/user/dynamicForm/delete/${id}`
      );
      setDynamicForms(response.data);
      Swal.fire({
        title: "Modified successfully",
        icon: "success",
      })
    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        icon: "error",
      })
      console.log(error);
    }
  };

  return (
    <div className="dynamicForm">
      <h1>Dynamic Forms</h1>
      <div className="formsContainer">
        <h3>
          {user.faculty} - {user.department}
        </h3>
        <div className="formList">
          {dynamicForms.map((form, index) => {
            return (
              <div key={index}>
                <p>{form.formType}</p>
                <button
                  className={`bttn ${
                    form.available === true ? "redbtn" : "ashbtn"
                  }`}
                  onClick={() => handleDelete(form.id)}
                >
                  {form.available ? "Disable" : "Enable"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DynamicForms;
