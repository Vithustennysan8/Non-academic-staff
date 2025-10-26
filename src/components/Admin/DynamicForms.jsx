import { useEffect, useState } from "react";
import "../../css/Admin/dynamicForms.css";
import { useAuth } from "../../Contexts/AuthContext";
import { Axios } from "../AxiosReqestBuilder";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const DynamicForms = () => {
  const { user } = useAuth();
  const [dynamicForms, setDynamicForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchDynamicFormList = async () => {
      try {
        setIsLoading(true);
        const response = await Axios.get("/admin/dynamicForm/getAll");
        console.log(response.data);
        setDynamicForms(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    fetchDynamicFormList();
  }, []);

  const handleDelete = async (id) => {
    const response = await Axios.delete(
      `/admin/dynamicForm/delete/${id}`
    );
    setDynamicForms(response.data);
    toast.success("Form deleted successfully");
  };

  if(isLoading){
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }
  return (
    <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0, y: -20 }} 
    transition={{ duration: 0.6 }}
  >
    <div className="dynamicForm">
      <h1>Dynamic Forms</h1>
      <div className="formsContainer">
        <h3>
          {user.faculty} - {user.department}
        </h3>
        <div className="formList">
          { dynamicForms.length > 0 ? (dynamicForms.map((form, index) => {
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
          })) : (
            <div className="card">
                <p className="card-head">No Forms found</p>
            </div>
          )}
        </div>
      </div>
    </div>
    </motion.div>
  );
};

export default DynamicForms;
