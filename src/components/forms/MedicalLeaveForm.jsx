import "../../css/Forms/medicalLeaveForm.css"
import { useContext, useEffect } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { useForm } from "react-hook-form";
import { Axios } from "../AxiosReqestBuilder";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../Contexts/LoginContext";

const MedicalLeaveForm = () => {
    const {isLogin} = useContext(LoginContext);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if(!isLogin){
          window.scrollTo({top:0, behavior:"smooth"});
          navigate("/login");
        }
    },[navigate, isLogin])

    const {register, handleSubmit, formState : {errors}} = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('designation', data.designation);
        formData.append('requestPeriodStart', data.requestPeriodStart);
        formData.append('requestPeriodEnd', data.requestPeriodEnd);
        formData.append('file', data.medical[0]);

        try {
            const response = await Axios.post("auth/medicalLeaveForm/add", formData);
            console.log(response.data);
            alert("Form Submitted successfuly");
            window.scrollTo({top:0, behavior:"smooth" });
            navigate("/forms");
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='MedicalLeaveForm'>
            <h2>Medical Leave Form</h2>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="input-group">
                    <label htmlFor="name">Name of the applicant: </label>
                    <p>{user.first_name}</p>
                </div>

                <div className="input-group">
                    <label htmlFor="upfNo">UPF No: </label>
                    <p>{user.emp_id}</p>
                </div>

                <div className="input-group">
                    <label htmlFor="designation">Designation: </label>
                    <input type="text" name='designation' {...register("designation", {required:{
                        value: true,
                        message: "Designation is required"
                    }})}/>
                    {errors.designation && <p>{errors.designation.message}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="department">Division/Department/Unit/Center: </label>
                    <p>{user.department}</p>
                </div>

                <div className="input-group">
                    <label htmlFor="faculty">Faculty/unit: </label>
                    <p>{user.faculty}</p>
                </div>

                <div className="input-group">
                    <label htmlFor="requestPeriodStart">Request Period Start: </label>
                    <input type="date" name="requestPeriodStart" {...register("requestPeriodStart", {required:{
                        value: true,
                        message: "Request Period is required"
                    }})} />
                    {errors.requestPeriodStart && <p>{errors.requestPeriodStart.message}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="requestPeriodEnd">Request Period End: </label>
                    <input type="date" name="requestPeriodEnd" {...register("requestPeriodEnd", {required:{
                        value: true,
                        message: "Request Period is required"
                    }})} />
                    {errors.requestPeriodEnd && <p>{errors.requestPeriodEnd.message}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="medical">Medical Certificate: </label>
                    <input type="file" name="medical" {...register("medical")}/>
                </div>
                    
                <div className="submit-btn">
                    <input type="submit" className='bttn redbtn' value={"Submit"}/>
                </div>
            </form>
        </div>
  )
}

export default MedicalLeaveForm