import { useContext, useEffect } from "react";
import "../../css/Forms/maternityLeaveForm.css"
import { useForm } from "react-hook-form";
import { UserContext } from "../../Contexts/UserContext";
import { Axios } from "../AxiosReqestBuilder";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../Contexts/LoginContext";

const MaternityLeaveForm = () => {
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
        formData.append('leaveAt', data.leaveAt);
        formData.append('leaveDays', data.leaveDays);
        formData.append('childBirthDate', data.childBirthDate);
        formData.append('file', data.medical[0]);

        try {
            const response = await Axios.post("auth/maternityLeaveForm/add", formData);
            console.log(response.data);
            alert("Form Submitted successfuly");
            navigate("/forms");
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='MaternityLeaveForm'>
            <h2>Maternity Leave Form</h2>

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
                    <label htmlFor="leaveAt">Requested Leave Date: </label>
                    <input type="date" name="leaveAt" id="leaveAt"  {...register("leaveAt", {required:{
                        value: true,
                        message: "Leave Date is required"
                    }})}/>
                    {errors.leaveAt && <p>{errors.leaveAt.message}</p>}
                </div>

                <div className="input-group">
                <label htmlFor="leaveDays">Leave days count: </label>
                <input type="number" name="leaveDays" id="leaveDays" {...register("leaveDays", {required:{
                    value: true,
                    message: "Please enter a number"
                }})} />
                {errors.leaveDays && <span className="error">{errors.leaveDays.message}</span>}
                </div>

                <div className="input-group">
                    <label htmlFor="childBirthDate">Child Birth Date: </label>
                    <input type="date" name="childBirthDate" {...register("childBirthDate", {required:{
                        value: true,
                        message: "Child Birth Date is required"
                    }})} />
                    {errors.childBirthDate && <p>{errors.childBirthDate.message}</p>}
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

export default MaternityLeaveForm