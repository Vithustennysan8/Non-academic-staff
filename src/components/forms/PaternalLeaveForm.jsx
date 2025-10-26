import { useContext, useEffect } from 'react'
import "../../css/Forms/paternalLeaveForm.css"
import { useAuth } from '../../Contexts/AuthContext'
import { useForm } from 'react-hook-form';
import { Axios } from '../AxiosReqestBuilder';
import { useNavigate } from 'react-router-dom';
import { handleError } from '../../utils/errorHandler';
import { toast } from 'react-toastify';

const PaternalLeaveForm = () => {
    const {isLogin, user} = useAuth();
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
        formData.append('childBirthDate', data.childBirthDate);
        formData.append('leaveDays', data.leaveDays);
        formData.append('requestedDate', data.requestDate);
        formData.append('file', data.birthCertificate[0]);
        
        try {
            const response = await Axios.post("auth/paternalLeaveForm/add", formData);
            console.log(response.data);
            toast.success('Form submitted successfully!');
            window.scrollTo({top:0, behavior:"smooth"});
            navigate("/forms");
        } catch (error) {
            handleError({ code: error.code || "UNKNOWN_ERROR", message: error.message || "Failed to submit form" });
        }
    }

  return (
    <>
        <div className='PaternalLeaveForm'>
            <h2>Paternal Leave Form</h2>

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
                    <label htmlFor="faculty">Faculty/unit: </label>
                    <p>{user.faculty}</p>
                </div>

                <div className="input-group">
                    <label htmlFor="department">Division/Department/Unit/Center: </label>
                    <p>{user.department}</p>
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
                    <label htmlFor="birthCertificate">Birth Certificate: </label>
                    <input type="file" name="birthCertificate" {...register("birthCertificate")}/>
                </div>

                <div className="input-group">
                    <label htmlFor="requestDate">Request Date: </label>
                    <input type="date" name="requestDate" {...register("requestDate", {required:{
                        value: true,
                        message: "Request Date is required"
                    }})} />
                    {errors.requestDate && <p>{errors.requestDate.message}</p>}
                    
                </div>
                    
                <div className="submit-btn">
                    <input type="submit" className='bttn redbtn' value={"Submit"}/>
                </div>
            </form>
        </div>
    </>
  )
}

export default PaternalLeaveForm