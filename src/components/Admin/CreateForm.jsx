import { useContext, useEffect, useState } from "react";
import "../../css/Admin/createForm.css"
import CheckBox from "../CustomElements/CheckBox";
import InputDate from "../CustomElements/InputDate";
import InputText from "../CustomElements/InputText";
import Radio from "../CustomElements/Radio";
import Select from "../CustomElements/Select";
import Button from "../CustomElements/Button";
import Heading from "../CustomElements/Heading";
import File from "../CustomElements/File";
import { LoginContext } from "../../Contexts/LoginContext";
import { Link, useNavigate } from "react-router-dom";
import { Axios } from "../AxiosReqestBuilder";

const Toolbox = ({setShowToolbox, handleAddInput}) => {
    const [option, setOption] = useState('');
    const [filedAttributes, setFiledAttributes] = useState({
        type:"",
        label:"",
        value:'',
        placeholder:"",
        required:false,
        options:[]
    });

    const handleInput = (e) => {
        setFiledAttributes({...filedAttributes, [e.target.name]:e.target.value});
    }

    const handleOption = () => {
        setFiledAttributes({...filedAttributes, options:[...filedAttributes.options, option]});
        setOption('');
    }

    return(
        <div className="toolbox">
            <div className="toolbox-container">
                <div className="toolbox_item">
                    <select name="type" onChange={(e)=>handleInput(e)}>
                        <option value="">Select Type</option>
                        <option value="heading">heading</option>
                        <option value="text">text-input</option>
                        <option value="date">date-input</option>
                        <option value="checkbox">checkbox-input</option>
                        <option value="select">select-input</option>
                        <option value="radio">radio-input</option>
                        <option value="file">file-input</option>
                        <option value="button">button</option>
                    </select>
                </div>
                { filedAttributes.type !== "button" && filedAttributes.type !== "heading" &&
                    <div className="toolbox_item">
                        <input type="text" placeholder="label" name="label" value={filedAttributes.label} onChange={(e)=>handleInput(e)}/>
                    </div>
                }

                { filedAttributes.type === "text" &&
                    <div className="toolbox_item">
                    <input type="text" placeholder="placeholder" name="placeholder" value={filedAttributes.placeholder} onChange={(e)=>handleInput(e)}/>
                </div>}

                { (filedAttributes.type === "button" || filedAttributes.type === "heading") &&
                    <div className="toolbox_item">
                    <input type="text" placeholder="value" name="value" value={filedAttributes.value} onChange={(e)=>handleInput(e)}/>
                </div>}

                { (filedAttributes.type === "checkbox" || filedAttributes.type === "radio" || filedAttributes.type === "select") && 
                <div className="toolbox_item">
                    <div className="optionsDiv">
                        <input type="text" placeholder="option" value={option} 
                            onChange={(e)=>{
                                setOption(e.target.value);
                            }}/>
                        <button onClick={handleOption}><i className="fa fa-check"></i></button>
                    </div>
                    <ul>
                        {filedAttributes.options.map((option,index) => (
                            <li key={index}>{option}</li>
                        ))}
                    </ul>
                </div>}

                <div className="toolbox_item">
                    <select name="required" onChange={(e)=>handleInput(e)}>
                        <option value="">Select Required</option>
                        <option value="true">yes</option>
                        <option value="false">no</option>
                    </select>
                </div>
                <div className="buttons">
                    <button className="bttn redbtn" onClick={() => handleAddInput(filedAttributes)}>add</button>
                    <button className="bttn ashbtn" onClick={()=>setShowToolbox(false)}>cancel</button>
                </div>
            </div>
        </div>
    )
}


const CreateForm = () => {
    const {isLogin} = useContext(LoginContext);
    const navigate = useNavigate();
    const [FormName, setFormName] = useState('');
    const [showToolbox, setShowToolbox] = useState(false);
    const [elements, setElements] = useState([]);
    const [jsonvalues, setJsonValues] = useState([]);

    useEffect(()=>{
        if(!isLogin){
            window.scrollTo({top:0, behavior:"smooth"});
            navigate('/login');
            return;
        }
    },[isLogin, navigate]);

    const findField = (values) => {
        switch (values.type) {
            case "text":
                return <InputText label={values.label} placeholder={values.placeholder}/>
            case "date":
                return <InputDate label={values.label} />
            case "checkbox":
                return <CheckBox label={values.label} options={values.options}/>
            case "radio":
                return <Radio label={values.label} options={values.options}/>
            case "button":
                return <Button value={values.value}/>
            case "FormName":
                return <FormName value={values.value} />
            case "select":
                return <Select label={values.label} options={values.options}/>
            case "file":
                return <File label={values.label}/>
            default:
                break;
        }
    }

    const handleAddInput = (values) => {
        setJsonValues([...jsonvalues, values]);
        setShowToolbox(false);
        setElements([...elements, findField(values)]);
    }

    const handleDelete = (index) => {
        const updatedElements = elements.filter((_, i) => i !== index);
        setElements(updatedElements);
    }

    const handleUpload = async (e) => {
        const encoded = encodeURIComponent(FormName)
        e.preventDefault();
        if(!FormName){
            alert("Please add a FormName first");
            return;
        }

        try {
            const response = await Axios.post(`/admin/dynamicForm/create/${encoded}`, jsonvalues)
            console.log(response.data);
            alert("form created succesfully");
            console.log(jsonvalues);
            setJsonValues([]);
            setElements([]);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <div className="createForm">
            {showToolbox && <Toolbox setShowToolbox={setShowToolbox} handleAddInput={handleAddInput}/>}
            <h1>Create Form</h1>

            <form>
                <button className="bttn addButton" onClick={(e)=>{
                    e.preventDefault();
                    setShowToolbox(!showToolbox);
                }}>Add Element</button>

                <div className="customHeading">
                    <h3>{FormName}</h3>
                    {!FormName && <label htmlFor="customInput">FormName <span style={{color:"red"}}>(must)</span></label>}
                    <input type="text" id="customInput" placeholder={"enter the formname is must!"} value={FormName} onChange={(e)=>setFormName(e.target.value)}/>
                </div>

                {/* Add form fiels to the form */}
                {elements.map((element, index) => (
                    <div key={index} className="closeFieldDiv">
                        <i className="fa fa-close closeField"  onClick={()=>handleDelete(index)}></i>
                        {element}
                    </div>
                ))}

                <Button value={"Submit"}/>
                <button className="bttn uploadbtn" onClick={(e) => handleUpload(e)}>Upload Form</button>
            </form>
        </div>
    </>
  )
}

export default CreateForm