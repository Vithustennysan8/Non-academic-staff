import "../../css/Forms/dynamicFormViewer.css"
import { useForm } from "react-hook-form";
import { Axios } from "../AxiosReqestBuilder";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../Contexts/LoginContext";

const DynamicFormVIewer = ({dynamicFormDetails}) => {
    const {isLogin} = useContext(LoginContext);
    const navigate = useNavigate();
      const {handleSubmit, register, formState: {errors}} = useForm();
      const [fileNames, setFileNames] = useState([]);
      const [approvalFlows, setApprovalFlows] = useState([]);
      const [selectedFlow, setSelectedFlow] = useState([]);

      useEffect(()=>{
        if(!isLogin){
            window.scrollTo({top:0, behavior:"smooth"})
            navigate("/login");
        }
      },[isLogin, navigate])
  
      useEffect(() => {
        if (dynamicFormDetails.fields) {
            const files = dynamicFormDetails.fields
                .filter((field) => field.type === 'file')
                .map((field) => field.label);
            setFileNames(files);
        }
    }, [dynamicFormDetails]);

    useEffect(()=>{
        const fetchFlows = async () => {
            try {
                const response = await Axios.get(`/auth/user/approvalFlow/get/${dynamicFormDetails.formType}`);
                setApprovalFlows(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchFlows();
    },[dynamicFormDetails.formType]);

      const handleFields = (field) => {
            switch (field.type) {
                case "text":
                    return  (
                        <div className="dynamicInput-text">
                            <label>{field.label}</label>
                            <input type="text" name={field.label} placeholder={field.placeholder} {...register(field.label, {required:{
                                value:field.required,
                                message: `This ${field.label} is required`
                            }})}/>
                            <p className="error">{errors[field.label] && errors[field.label].message}</p>
                    </div>)

                case "date":
                    return (
                        <div className="dynamicInput-date">
                            <label>{field.label}</label>
                            <input type="date" name={field.label} {...register(field.label, {required: {
                                value: field.required,
                                message: `This ${field.label} is required`
                            }})}/>
                            <p className="error">{errors[field.label] && errors[field.label].message}</p>
                        </div>
                    )

                case "radio":
                    return (
                        <div className="dynamicRadio">
                            <label htmlFor="">{field.label}</label>
                            <br />
                            {
                                field.options.map((option, index) => (
                                    <div key={index}>
                                        <label>
                                        <input type="radio" name={field.label} value={option} {...register(field.label, {required: {
                                            value: field.required,
                                            message: `This ${field.label} is required`
                                        }})}/>{option}
                                        </label>
                                    </div>    
                                ))
                            }
                            <p className="error">{errors[field.label] && errors[field.label].message}</p>
                        </div>
                    )
                
                case "select":
                    return (
                        <div className="dynamicSelect">
                            <label htmlFor="dynamicSelect">{field.label}</label>
                            <select required={field.required} name={field.label} {...register(field.label, {required: {
                                value: field.required,
                                message: `This ${field.label} is required`
                            }})}>
                                <option value="">Select</option>
                                {
                                    field.options.map((option, index) => (
                                        <option key={index} value={option}>{option}</option>
                                    ))
                                }
                            </select>
                            <p className="error">{errors[field.label] && errors[field.label].message}</p>
                        </div>
                    )

                case "file":
                    return (
                        <div className="dynamicInput-file">
                            <label>{field.label}</label>
                            <input type="file" name={field.label} {...register(field.label, {required: {
                                value: field.required,
                                message: `This ${field.label} is required`
                            }})}/>
                            <p className="error">{errors[field.label] && errors[field.label].message}</p>
                        </div>
                    )

                case "checkbox":
                    return (
                        <div className="dynamicCheckbox">
                            <label>{field.label}</label>
                            <br />
                            {
                                field.options.map((option, index) => (
                                    <div key={index}>
                                        <input type="checkbox" name={`${field.label}[]`} value={option} {...register(field.label, {required :{
                                            value: field.required,
                                            message: `This ${field.label} is required`
                                        }})}/>
                                        <label>{option}</label>
                                    </div>
                                ))
                            }
                            <p className="error">{errors[field.label] && errors[field.label].message}</p>
                        </div>
                    )
                
            default:
                break;
        }
        }
    
    const   onSubmit = async (data) => {
            if(selectedFlow == ''){
                alert("Please select a flow");
                return;
            }

            const formData = new FormData();
            Object.keys(data).filter(type => !fileNames.includes(type))
            .map(file => {
                formData.append(file, data[file]);
            })

            fileNames.forEach((fileName) => {
                const file = data[fileName];
                if (file) {
                    formData.append("file", file[0]);
                }
        });
    
        const encodedFormName = encodeURIComponent(dynamicFormDetails.formType);
        const encodedFlowName = encodeURIComponent(selectedFlow);
        try {
            const response = await Axios.post(`auth/user/dynamicFormDetail/add/${encodedFormName}/${encodedFlowName}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    },
            });
            console.log(response.data);
            alert("Form submitted successfully");
            window.scrollTo({top:0, behavior:"smooth"});
            navigate("/forms");
        } catch (error) {
            alert(error.response.data.message);
            console.log(error);
        }
    }

  return (
    <>
        <div className="dynamicFormViewer">

            <div className="flowSelector-div">
                <div className="selector">
                    <select onChange={(e)=>setSelectedFlow(e.target.value)}>
                        <option value="">select Flow</option>
                        {approvalFlows?.map((approvalFlow, index) => (
                            <option key={index} value={approvalFlow.uniqueName} >{approvalFlow.uniqueName}</option>
                        ))}
                    </select>
                </div>
                <div className="display">
                    {approvalFlows.filter(flow => flow.uniqueName === selectedFlow).map(flows => flows.flow?.map((flow, index) => (
                        <span key={index}>{" -> "+ flow.roleName}</span>
                    )))}
                </div>
            </div>

            <div className="dynamicFormViewer-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="title">
                        <h3>{dynamicFormDetails.formType}</h3>
                    </div>

                    {dynamicFormDetails.fields?.map((field) => (
                        <div key={field.sequence}>
                                {handleFields(field)}
                            </div>
                        )
                    )}

                    <div className="dynamicButton">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default DynamicFormVIewer